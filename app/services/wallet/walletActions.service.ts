import {Injectable} from "angular2/core";

import {IAmount} from "../../entities/currency";
import {Dispatcher, Event} from "../../common/dispatcher";

export class WalletEventType {
    static ADD = 'wallet.add';
    static REMOVE = 'wallet.remove';
}

export interface ChangeAmountDetails {
    amount: IAmount;
    reason: string;
}

@Injectable()
export class WalletActions {

    constructor(
        private _dispatcher: Dispatcher
    ) {}

    public add(amountToAdd: IAmount, reason?: string) {
        var event: Event<ChangeAmountDetails> = {
            type: WalletEventType.ADD,
            data: {
                amount: amountToAdd,
                reason: reason
            }
        };
        this._dispatcher.dispatch(event);
    }

    public remove(amountToRemove: IAmount, reason?: string) {
        var event: Event<ChangeAmountDetails> = {
            type: WalletEventType.REMOVE,
            data: {
                amount: amountToRemove,
                reason: reason
            }
        };
        this._dispatcher.dispatch(event);
    }
}