import {Action} from "../entities/redux";
import {UNDO, REDO} from "./actions";

export function undo(): Action {
    return {
        type: UNDO
    };
}

export function redo(): Action {
    return {
        type: REDO
    };
}