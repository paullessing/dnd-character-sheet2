import {Injectable} from "angular2/core";
import {Subscriber, Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import * as _ from 'underscore';

import {Dispatcher, Event} from "../../common/dispatcher";
import {StorageService} from "../storage/storage.service";
import {ItemEventType, BuyItemDetails} from "../item/itemActions.service";
import {WalletEventType, ChangeAmountDetails} from "./walletActions.service";
import {Amount, IAmount} from "../../entities/currency";

export const STORAGE_KEY = 'wallet';

@Injectable()
export class WalletRepository {
    private _wallet: Amount;
    private _subject: Subject<Amount>;

    constructor(
        private _dispatcher: Dispatcher,
        private _storageService: StorageService
    ) {
        this._dispatcher.subscribe(ItemEventType.BUY,      (details: BuyItemDetails)      => this.onBuy(details));
        this._dispatcher.subscribe(WalletEventType.ADD,    (details: ChangeAmountDetails) => this.onAdd(details));
        this._dispatcher.subscribe(WalletEventType.REMOVE, (details: ChangeAmountDetails) => this.onRemove(details));

        this._wallet = this.load();
        this._subject = new BehaviorSubject(this._wallet);
        console.log("Loading promise has resolved with wallet:", this._wallet);
    }

    private _notify() {
        this._subject.next(this._wallet);
    }

    private load(): Amount {
        let amount: Amount = new Amount(_.extend({
                copper: 0,
                silver: 0,
                electrum: 0,
                gold: 0,
                platinum: 0
            }, this._storageService.get(STORAGE_KEY) as IAmount));
        return amount;
    }

    public get wallet(): Observable<Amount> {
        return this._subject;
    }

    public get currentWallet(): Amount {
        return this._wallet;
    }

    private onBuy(data: BuyItemDetails): void {
        let cost = data.item.cost * data.count;
        this._wallet = this._wallet.minus(cost);

        this.persistUpdate();
        this._notify();
    }

    private onAdd(data: ChangeAmountDetails): void {
        this._wallet = this._wallet.plus(data.amount);

        this.persistUpdate();
        this._notify();
    }

    private onRemove(data: ChangeAmountDetails): void {
        this._wallet = this._wallet.minus(data.amount);

        this.persistUpdate();
        this._notify();
    }

    private persistUpdate(): void {
        this._storageService.set(STORAGE_KEY, this._wallet.getData());
    }
}