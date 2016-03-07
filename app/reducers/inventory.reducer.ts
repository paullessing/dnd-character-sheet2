import {Action} from "../actions/action";
import {Amount} from "../entities/currency";
import {REMOVE_ITEM} from "../actions/actions";
import {Inventory} from "../entities/item";

interface InventoryState {
    items: Inventory,
    wallet: Amount
}

const defaultState: InventoryState = {
    items: new Inventory(),
    wallet: new Amount({})
};

export function inventory(state: InventoryState = defaultState, action: Action) {
    switch (action.type) {
        case REMOVE_ITEM:
            return {
                wallet: state.wallet,
                items: state.items.remove(action.payload.itemId, action.payload.count)
            };
        default:
            return state;
    }
}