import { combineReducers } from 'redux';
import {State} from "../common/redux/state";
import {Action} from "../common/redux/action";

import {character} from "./character.reducer";
import {personality} from "./personality.reducer";
import {inventory} from "./inventory.reducer";
import {basicAbilities as abilities, xpAbilities as complexAbilities} from "./abilities.reducer";

export const basicReducer: ((state: State, action: Action) => State) = combineReducers({
    character,
    abilities,
    personality,
    inventory
});

export const rootReducer = (state: State, action: Action) => {
    let newState = state;
    newState = basicReducer(newState, action);
    newState = complexAbilities(newState, action);
    return Object.freeze(newState);
};