import {Action, IAction, ThunkAction, GetState, Dispatch} from "../entities/redux";
import {} from "./actions";
import {GAIN_HITPOINTS} from "./actions";
import {LOSE_HITPOINTS} from "./actions";

export function gainHitpoints(hitpoints: number, temporaryHitpoints?: number): Action {
	return {
		type: GAIN_HITPOINTS,
		payload: {
			hitpoints,
			temporaryHitpoints
		}
	};
}

export function loseHitpoints(amount: number): Action {
	return {
		type: LOSE_HITPOINTS,
		payload: {
			amount
		}
	}
}
