import { combineReducers } from 'redux';
import {State} from "../entities/state";
import {Action} from "../actions/action";

import {character} from "./character.reducer";
import {personality} from "./personality.reducer";
import {inventory} from "./inventory.reducer";
import {
    basicAbilities as abilities,
    basicSkills as skills,
    xpAbilities as complexAbilities
} from "./abilities.reducer";

export const basicReducer: ((state: State, action: Action) => State) = combineReducers({
    character,
    abilities,
    skills,
    personality,
    inventory
});

export const rootReducer = (state: State, action: Action) => {
    let newState = state;
    newState = basicReducer(newState, action);
    newState = complexAbilities(newState, action);
    return Object.freeze(newState);
};