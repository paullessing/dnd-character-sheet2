import {Action, ThunkAction, GetState, Dispatch} from "./action";
import {REMOVE_ITEM, ADD_TO_WALLET, REMOVE_FROM_WALLET} from "./actions";
import {IAmount, Amount} from "../entities/currency";

export function remove(itemId: number, count: number, reason?: string): ThunkAction {
    return (dispatch: Dispatch, getState: GetState) => {
        const currentCount = getState().inventory.items.getCount(itemId);
        if (currentCount < count) {
            throw new Error(`Cannot remove ${count} of item ID ${itemId} since it only has ${currentCount}`);
        }
        dispatch({
            type: REMOVE_ITEM,
            payload: {
                itemId,
                count,
                reason
            }
        });
    };
}

export function addToWallet(amountToAdd: IAmount, reason?: string): Action {
    return {
        type: ADD_TO_WALLET,
        payload: {
            amount: amountToAdd,
            reason
        }
    };
}

export function removeFromWallet(amountToRemove: IAmount, reason?: string): ThunkAction {
    return (dispatch: Dispatch, getState: GetState) => {
        let amount = new Amount(amountToRemove);
        let wallet = getState().inventory.wallet;
        if (wallet.totalValue < amount.totalValue) {
            throw new Error(`Cannot remove ${amount.toString()} from wallet as it is only ${wallet.toString()}`);
        } else {
            dispatch({
                type: REMOVE_FROM_WALLET,
                payload: {
                    amount: amountToRemove,
                    reason
                }
            });
        }
    };
}