import { combineReducers } from 'redux';
import {State} from "../entities/state";
import {Action} from "../actions/action";

import {character} from "./character.reducer";
import {personality} from "./personality.reducer";
import {inventory} from "./inventory.reducer";
import {stats} from "./stats.reducer";

export const rootReducer: ((state: State, action: Action) => State) = combineReducers({
    character,
    stats,
    personality,
    inventory
});