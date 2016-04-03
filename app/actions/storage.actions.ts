import {Action} from "./../entities/redux";
import {LOAD} from "./actions";

export function load(): Action {
    return {
        type: LOAD
    };
}