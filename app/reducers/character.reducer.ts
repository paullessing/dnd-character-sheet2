import {Character} from "../entities/character";
import {Action} from "../common/redux/action";

export function character(state = new Character({}), action: Action) {
    return state;
}
