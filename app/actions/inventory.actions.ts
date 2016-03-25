import {Action, ThunkAction, GetState, Dispatch} from "./action";
import {REMOVE_ITEM, ADD_TO_WALLET, REMOVE_FROM_WALLET, CREATE_ITEM, UPDATE_ITEM, BUY_ITEM} from "./actions";
import {IAmount, Amount} from "../entities/currency";
import {IItem} from "../entities/item";
import {ItemTemplate} from "../entities/itemDefinitions";

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

export function create(data: IItem): Action {
    // TODO maybe check if this item already exists?
    return {
        type: CREATE_ITEM,
        payload: {
            item: data
        }
    };
}

export function update(data: IItem): ThunkAction {
    return (dispatch: Dispatch, getState: GetState) => {
        if (!getState().inventory.items.containsId(data.id)) {
            throw new Error(`Cannot update item with ID ${data.id} as it does not exist in the inventory`);
        }
        dispatch({
            type: UPDATE_ITEM,
            payload: data
        });
    };
}

export function add(itemId: number, count: number, reason: string): ThunkAction {
    return (dispatch: Dispatch, getState: GetState) => {
        if (!getState().inventory.items.containsId(itemId)) {
            throw new Error(`Cannot update item with ID ${itemId} as it does not exist in the inventory`);
        }
        dispatch({
            type: UPDATE_ITEM,
            payload: {
                itemId,
                count,
                reason
            }
        });
    };
}

export function buy(item: ItemTemplate, count: number, reason: string, modifications?: string): ThunkAction {
    return (dispatch: Dispatch, getState: GetState) => {
        if (getState().inventory.wallet.lessThan(new Amount(item.cost).times(count))) {
            throw new Error('Item is more than user can afford!');
        }
        dispatch({
            type: BUY_ITEM,
            payload: {
                item,
                count,
                reason,
                modifications
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