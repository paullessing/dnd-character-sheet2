import {combineReducers} from 'redux';

import {Action, Reducer} from "../entities/redux";
import {Amount} from "../entities/currency";
import {Item, IItem, Inventory} from "../entities/item";
import {ItemTemplate} from "../entities/itemDefinitions";
import {
    ADD_ITEM, REMOVE_ITEM, REMOVE_FROM_WALLET, ADD_TO_WALLET, BUY_ITEM, CREATE_ITEM,
    SELL_ITEM
} from "../actions/actions";

interface InventoryState {
    items: Inventory,
    maxItemId: number,
    wallet: Amount
}

const items: Reducer<Inventory> = (state: Inventory, action: Action) => {
    switch (action.type) {
        case ADD_ITEM:
            return state.add(action.payload.itemId, action.payload.count);
        case REMOVE_ITEM:
            return state.remove(action.payload.itemId, action.payload.count);
        default:
            return state;
    }
};

const wallet: Reducer<Amount> = (state: Amount, action: Action) => {
    switch (action.type) {
        case ADD_TO_WALLET:
            return state.plus(action.payload.amount);
        case REMOVE_FROM_WALLET:
            return state.minus(action.payload.amount);
        default:
            return state;
    }
};

const reducePurchases: Reducer<InventoryState> = (state: InventoryState, action: Action) => {
    switch (action.type) {
        case CREATE_ITEM:
            return createItem(state, action);
        case BUY_ITEM:
            return buyItem(state, action);
        case SELL_ITEM:
            return sellItem(state, action);
        default:
            return state;
    }
};

function createItem(state: InventoryState, action: Action) {
    let newState = Object.assign({}, state);
    newState.items = state.items.push(action.payload.item, getNewMaxId(newState));
    return newState;
}

function sellItem(state: InventoryState, action: Action) {
    let newState = Object.assign({}, state);
    newState.items = newState.items.remove(action.payload.itemId, action.payload.count);
    newState.wallet = newState.wallet.plus(new Amount(action.payload.price));
    return newState;
}

const buyItem: Reducer<InventoryState> = (state: InventoryState, action: Action) => {
    const data: IItem = action.payload.item;
    const totalCost = new Amount(data.cost).times(data.quantity);
    if (state.wallet.lessThan(totalCost)) {
        throw new Error(`Cannot buy item "${data.name}": it costs ${totalCost} and user only has ${state.wallet}`);
    }
    let existingItem = state.items.find((item: Item) => {
        return item.name === data.name &&
            !item.modifications &&
            item.cost.totalValue === new Amount(data.cost).totalValue &&
            item.description === data.description &&
            item.weight === data.weight
    });

    let newState = Object.assign({}, state);

    if (existingItem) {
        newState.items = state.items.add(existingItem.id, data.quantity);
    } else {
        let itemData: IItem = {
            name: data.name,
            description: data.description,
            cost: data.cost,
            weight: data.weight,
            modifiers: data.modifiers,
            quantity: data.quantity,
            modifications: data.modifications
        };
        newState.items = state.items.push(itemData, getNewMaxId(newState));
    }
    newState.wallet = state.wallet.minus(new Amount(data.cost).times(data.quantity));
    return newState;
};

function getNewMaxId(state: InventoryState) {
    return () => ++state.maxItemId;
}

const inventory: Reducer<InventoryState> = (state: InventoryState = {
    items: new Inventory(),
    maxItemId: 0,
    wallet: new Amount({})
}, action: Action) => {
    let newState = {
        items: items(state.items, action),
        wallet: wallet(state.wallet, action),
        maxItemId: state.maxItemId
    };
    newState = reducePurchases(newState, action);

    return newState;
};

export { inventory };