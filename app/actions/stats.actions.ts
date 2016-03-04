import {Action} from "./action";
import {ADD_XP} from "./actions";

export function addXp(amount: number, reason?: string): Action {
    return {
        type: ADD_XP,
        payload: {
            amount,
            reason
        }
    }
}