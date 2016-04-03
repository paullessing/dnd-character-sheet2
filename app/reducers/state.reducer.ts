import {combineReducers} from 'redux';

import {StateReducer} from "../entities/redux";
import {character} from "./character.reducer";
import {stats} from "./stats.reducer";
import {personality} from "./personality.reducer";
import {inventory} from "./inventory.reducer";

export const state: StateReducer = combineReducers({
    character,
    stats,
    personality,
    inventory
});