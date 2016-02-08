import {Injectable} from "angular2/core";
import {Subscriber, Observable, Subject, BehaviorSubject} from "rxjs/Rx";

import {Dispatcher, Event} from "../../common/dispatcher";
import {StorageService} from "../storage/storage.service";
import {Item, IItem} from "../../entities/item";
import {ItemEventType, AddItemDetails, BuyItemDetails} from "./itemActions.service";

import * as _ from 'underscore';

export const STORAGE_KEY = 'items';

@Injectable()
export class ItemRepository {
    private _items: Item[];
    private _subject: Subject<Item[]>;
    private _maxId: number = 0;

    constructor(
        private _dispatcher: Dispatcher,
        private _storageService: StorageService
    ) {
        this._dispatcher.subscribe(ItemEventType.CREATE, (details: IItem) => this.onCreate(details));
        this._dispatcher.subscribe(ItemEventType.UPDATE, (details: IItem) => this.onUpdate(details));
        this._dispatcher.subscribe(ItemEventType.ADD, (details: AddItemDetails) => this.onAdd(details));
        this._dispatcher.subscribe(ItemEventType.BUY, (details: BuyItemDetails) => this.onBuy(details));

        this._items = this.load();
        this._subject = new BehaviorSubject(this._items);
        this._maxId = this._items.length ? Math.max.apply(Math, this._items.map(item => item.id)) : 0;
        console.log("Loading promise has resolved with items:", this._items);
    }

    private _notify() {
        this._subject.next(this._items);
    }

    private load(): Item[] {
        let items: IItem[] = this._storageService.get(STORAGE_KEY) as IItem[] || [];
        return items.map(item => new Item(item));
    }

    public get items(): Observable<Item[]> {
        return this._subject;
    }

    private onCreate(data: IItem): void {
        const newId = ++this._maxId;
        data.id = newId;
        let item = new Item(data);
        this._items = this._items.concat(item);

        this.persistUpdate();
        this._notify();
    }

    private onUpdate(data: IItem): void {
        let newItem = new Item(data);
        this._items = this._items.map((item: Item) => (item.id === newItem.id ? newItem : item));

        this.persistUpdate();
        this._notify();
    }

    private onAdd(data: AddItemDetails): void {
        const oldItem = this._items.find((item: Item) => data.id === item.id);
        if (!oldItem) {
            return;
        }
        const newQuantity = oldItem.quantity + data.count;
        if (newQuantity <= 0) {
            this._items = this._items.filter((item: Item) => item.id !== data.id);
        } else {
            this._items = this._items.map((item: Item) => {
                if (item.id === data.id) {
                    return new Item(_.extend({}, oldItem.getData(), {
                        quantity: newQuantity
                    }))
                } else {
                    return item;
                }
            });
        }

        this.persistUpdate();
        this._notify();
    }

    private onBuy(data: BuyItemDetails): void {
        const template = data.item;
        let existingItem = this._items.find((item: Item) => {
            return item.name === template.name &&
                    !item.modifications &&
                    item.cost === template.cost &&
                    item.description === template.description &&
                    item.weight === template.weight
        });

        if (existingItem) {
            this._items = this._items.map((item: Item) => {
                if (item === existingItem) {
                    return new Item(_.extend({}, item.getData(), { quantity: item.quantity + data.count }));
                } else {
                    return item;
                }
            });
        } else {
            let itemData: IItem = {
                id: ++this._maxId,
                name: template.name,
                description: template.description,
                cost: template.cost,
                weight: template.weight,
                modifiers: template.modifiers,
                quantity: data.count,
                modifications: data.modifications
            };
            let item = new Item(itemData);
            this._items = this._items.concat(item);
        }

        this.persistUpdate();
        this._notify();
    }

    private persistUpdate(): void {
        let data = this._items.map((item: Item) => item.getData());
        console.log('Persisting', data);
        this._storageService.set(STORAGE_KEY, data);
    }

    /**
     * Returns the current items.
     * @returns {Item[]}
     */
    public get currentItems(): Item[] {
        return this._items;
    }
}