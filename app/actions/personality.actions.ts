import {IPersonality} from "../entities/personality";
import {Action} from "./../entities/redux";
import {UPDATE_PERSONALITY} from "./actions";

export function update(personality: IPersonality): Action {
    return {
        type: UPDATE_PERSONALITY,
        payload: personality
    }
}
