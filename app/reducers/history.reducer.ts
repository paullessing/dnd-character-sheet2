import {State} from "../entities/state";
import {Action} from "../entities/redux";
import {StateReducer} from "../entities/redux";

export function history(rootReducer: StateReducer): (state: State, action: Action) => State {
    return rootReducer;
}
