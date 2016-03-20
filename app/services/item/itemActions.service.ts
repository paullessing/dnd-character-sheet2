import {Injectable} from "angular2/core";

import {IItem, Item} from "../../entities/item";
import {Dispatcher, Event} from "../../common/dispatcher";
import {ItemTemplate} from "../../entities/itemDefinitions";

export class ItemEventType {
    static CREATE = 'item.create';
    static UPDATE = 'item.update';
    static BUY = 'item.buy';
    static ADD = 'item.add';
}

export interface AddItemDetails {
    id: number;
    count: number;
    reason: string;
}

export interface BuyItemDetails {
    item: ItemTemplate;
    count: number;
    reason: string;
    modifications?: string;
}

@Injectable()
export class ItemActions {

    constructor(
        private _dispatcher: Dispatcher
    ) {}

    public create(data: IItem) {
        var event: Event<IItem> = {
            type: ItemEventType.CREATE,
            data: data
        };
        this._dispatcher.dispatch(event);
    }

    public update(data: IItem) {
        var event: Event<IItem> = {
            type: ItemEventType.UPDATE,
            data: data
        };
        this._dispatcher.dispatch(event);
    }

    public add(id: number, count: number, reason: string) {
        var event: Event<AddItemDetails> = {
            type: ItemEventType.ADD,
            data: {
                id: id,
                count: count,
                reason: reason
            }
        };
        this._dispatcher.dispatch(event);
    }

    public buy(item: ItemTemplate, count: number, reason: string, modifications?: string) {
        var event: Event<BuyItemDetails> = {
            type: ItemEventType.BUY,
            data: {
                item: item,
                count: count,
                reason: reason,
                modifications: modifications
            }
        };
        this._dispatcher.dispatch(event);
    }
}