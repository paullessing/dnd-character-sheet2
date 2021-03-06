import {Action} from "../entities/redux";
import {UNDO, REDO, HISTORY_ADD_GROUP} from "./actions";
import {HISTORY_RENAME_GROUP} from "./actions";

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

export function addGroup(): Action {
    return {
        type: HISTORY_ADD_GROUP
    };
}

export function changeGroup(id: number, name: string, description: string): Action {
    return {
        type: HISTORY_RENAME_GROUP,
        payload: {
            id,
            name,
            description
        }
    };
}