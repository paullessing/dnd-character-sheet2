import {Character} from "../entities/character";
import {Action} from "../entities/redux";
import {UPDATE_CHARACTER} from "../actions/actions";

export function character(state = new Character({}), action: Action) {
    if (action.type === UPDATE_CHARACTER) {
        state = new Character(action.payload);
    }

    return state;
}
