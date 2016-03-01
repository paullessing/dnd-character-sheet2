import {Action} from "../common/redux/action";
import {Amount} from "../entities/currency";

export function inventory(state = {
    items: [],
    wallet: new Amount({})
}, action: Action) {
    return state;
}