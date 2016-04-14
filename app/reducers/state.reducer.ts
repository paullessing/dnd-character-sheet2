import {combineReducers} from 'redux';

import {StateReducer} from "../entities/redux";
import {character} from "./character.reducer";
import {stats} from "./stats.reducer";
import {personality} from "./personality.reducer";
import {inventory} from "./inventory.reducer";
import {combat} from "./combat.reducer";

export const state: StateReducer = combineReducers({
    character,
    stats,
    combat,
    personality,
    inventory
});
