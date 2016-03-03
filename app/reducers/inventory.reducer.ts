import {Action} from "../actions/action";
import {Amount} from "../entities/currency";

export function inventory(state = {
    items: [],
    wallet: new Amount({})
}, action: Action) {
    return state;
}