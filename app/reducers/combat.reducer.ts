import {Reducer, Action} from "../entities/redux";
import {CombatStats} from "../entities/state";
import {UPDATE_ABILITIES, GAIN_HITPOINTS, LOSE_HITPOINTS} from "../actions/actions";
import {AbilitiesDiff} from "../actions/stats.actions";
import {AbilityNames, getAbilityModifier} from "../entities/abilities";

const DEFAULT_STATS: CombatStats = {
	speed: 0,
	initiative: 10,
	maxHitpoints: 0,
	temporaryMaxHitpoints: 0,
	hitpoints: 0,
	temporaryHitpoints: 0,
	armourClass: 10,
	deathSaves: 0,
	deathFails: 0
};

export const combat: Reducer<CombatStats> = (state: CombatStats = DEFAULT_STATS, action: Action) => {
	switch(action.type) {
		case UPDATE_ABILITIES:
			let diff: AbilitiesDiff = action.payload.data.abilities;
			if (diff[AbilityNames.Dexterity]) {
				return Object.assign({}, state, { initiative: getAbilityModifier(diff[AbilityNames.Dexterity].value) });
			} else {
				return state;
			}
		case GAIN_HITPOINTS:
			return gainHitpoints(state, action.payload.hitpoints, action.payload.temporaryHitpoints);
		case LOSE_HITPOINTS:
			return loseHitpoints(state, action.payload.amount);
		default:
			return state;
	}
};

function gainHitpoints(state: CombatStats, hitpoints: number, temporaryHitpoints: number = 0): CombatStats {
	let newHitpoints = Math.min(state.hitpoints + hitpoints, state.temporaryMaxHitpoints || state.maxHitpoints);
	let newTemporaryHitpoints = (state.temporaryHitpoints || 0) + temporaryHitpoints;
	return Object.assign({}, state, { hitpoints: newHitpoints, temporaryHitpoints: newTemporaryHitpoints });
}

function loseHitpoints(state: CombatStats, amount: number): CombatStats {
	let remainingAmount = amount;
	if (remainingAmount <= 0) {
		return state;
	}
	let newState = Object.assign({}, state);
	if (state.temporaryHitpoints) {
		let tempHpLost = Math.min(state.temporaryHitpoints, remainingAmount);
		newState.temporaryHitpoints = state.temporaryHitpoints - tempHpLost;
		remainingAmount -= tempHpLost;
	}
	if (remainingAmount <= 0) {
		return newState;
	}
	let hpLost = Math.min(state.hitpoints, remainingAmount);
	newState.hitpoints = state.hitpoints - hpLost;
	remainingAmount -= hpLost;
	if (remainingAmount >= (state.temporaryMaxHitpoints || state.maxHitpoints)) {
		// Instant death, see PHB p.197
		newState.deathFails = Math.max(3, newState.deathFails);
	}
	return newState;
}
