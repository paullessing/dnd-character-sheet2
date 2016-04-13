import {Action, ThunkAction, GetState, Dispatch} from "./../entities/redux";
import {
    ADD_TO_WALLET,
    REMOVE_FROM_WALLET,
    CREATE_ITEM,
    UPDATE_ITEM,
    REMOVE_ITEM,
    BUY_ITEM,
    ADD_ITEM, SELL_ITEM
} from "./actions";
import {IAmount, Amount} from "../entities/currency";
import {IItem} from "../entities/item";
import {ItemTemplate} from "../entities/itemDefinitions";
import {ItemNotAffordableError} from "../entities/errors";

export function remove(itemId: number, count: number, reason?: string): ThunkAction {
    return (dispatch: Dispatch, getState: GetState) => {
        let existingItem = getState().current.inventory.items.byId[itemId];
        if (!existingItem || existingItem.quantity === 0) {
            throw new Error(`Cannot remove ${count} of item ID ${itemId} since it does not exist in the inventory`);
        }
        if (existingItem.quantity < count) {
            throw new Error(`Cannot remove ${count} of item ID ${itemId} since it only has ${existingItem.quantity}`);
        }
        dispatch({
            type: REMOVE_ITEM,
            payload: {
                itemId,
                count,
                reason
            },
            meta: {
                name: existingItem.name
            }
        });
    };
}

export function sell(itemId: number, count: number, price: Amount): ThunkAction {
    return (dispatch: Dispatch, getState: GetState) => {
        let existingItem = getState().current.inventory.items.byId[itemId];
        if (!existingItem || existingItem.quantity === 0) {
            throw new Error(`Cannot sell ${count} of item ID ${itemId} since it does not exist in the inventory`);
        }
        if (existingItem.quantity < count) {
            throw new Error(`Cannot sell ${count} of item ID ${itemId} since it only has ${existingItem.quantity}`);
        }
        dispatch({
            type: SELL_ITEM,
            payload: {
                itemId,
                count,
                price: price.toString()
            },
            meta: {
                name: existingItem.name
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
        if (!getState().current.inventory.items.containsId(data.id)) {
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
        let existingItem = getState().current.inventory.items.byId[itemId];
        if (!existingItem || existingItem.quantity === 0) {
            throw new Error(`Cannot add to item with ID ${itemId} as it does not exist in the inventory`);
        }
        dispatch({
            type: ADD_ITEM,
            payload: {
                itemId,
                count,
                reason
            },
            meta: {
                name: existingItem.name
            }
        });
    };
}

export function buy(item: IItem, reason: string): ThunkAction {
    return (dispatch: Dispatch, getState: GetState) => {
        let wallet = getState().current.inventory.wallet;
        let cost = new Amount(item.cost).times(item.quantity);
        if (wallet.lessThan(cost)) {
            throw new ItemNotAffordableError(cost, wallet);
        }
        dispatch({
            type: BUY_ITEM,
            payload: {
                item,
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
        let wallet = getState().current.inventory.wallet;
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
