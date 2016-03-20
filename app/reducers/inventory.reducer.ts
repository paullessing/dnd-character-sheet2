import {combineReducers} from 'redux';

import {Action} from "../actions/action";
import {Amount} from "../entities/currency";
import {Inventory} from "../entities/item";
import {REMOVE_ITEM, REMOVE_FROM_WALLET, ADD_TO_WALLET} from "../actions/actions";

interface InventoryState {
    items: Inventory,
    wallet: Amount
}

function items(state: Inventory = new Inventory(), action: Action): Inventory {
    switch (action.type) {
        case REMOVE_ITEM:
            return state.remove(action.payload.itemId, action.payload.count);
        default:
            return state;
    }
}

function wallet(state: Amount = new Amount({}), action: Action): Amount {
    switch (action.type) {
        case ADD_TO_WALLET:
            return state.plus(action.payload.amount);
        case REMOVE_FROM_WALLET:
            return state.minus(action.payload.amount);
        default:
            return state;
    }
}

const simpleActions = combineReducers({ items, wallet });

export function inventory(state: InventoryState, action: Action) {
    let newState = simpleActions(state, action);
    // TODO complex actions
    return newState;
}