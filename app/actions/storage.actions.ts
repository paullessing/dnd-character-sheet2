import {Action} from "./action";
import {LOAD} from "./actions";

export function load(): Action {
    return {
        type: LOAD
    };
}