import {IPersonality} from "../entities/personality";
import {Action} from "action";
import {UPDATE_PERSONALITY} from "./actions";

export function update(personality: IPersonality): Action {
    return {
        type: UPDATE_PERSONALITY,
        payload: personality
    }
}
