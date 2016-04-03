import { combineReducers } from 'redux';
import {State} from "../entities/state";
import {Action} from "../entities/redux";

import {character} from "./character.reducer";
import {personality} from "./personality.reducer";
import {inventory} from "./inventory.reducer";
import {stats} from "./stats.reducer";
import {LOAD} from "../actions/actions";
import {loadState} from "../common/storage.middleware";

type StateReducer = ((state: State, action: Action) => State);

const loadReducer: StateReducer = (state: State, action: Action) => {
    // This should not inspect the localStorage, instead it should be pure
    // But since localStorage is synchronous anyway it doesn't really matter
    // TODO refactor to be async, even if that's pointless
    if (action.type === LOAD) {
        state = loadState();
    }
    return combinedReducer(state, action);
};

const combinedReducer = combineReducers({
    character,
    stats,
    personality,
    inventory
});

export const rootReducer: StateReducer = loadReducer;