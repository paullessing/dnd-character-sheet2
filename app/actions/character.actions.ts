import {ICharacter} from "../entities/character";
import {Action} from "./../entities/redux";
import {UPDATE_CHARACTER} from "./actions";

export function update(character: ICharacter): Action {
    return {
        type: UPDATE_CHARACTER,
        payload: character
    };
}
