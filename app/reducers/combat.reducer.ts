import {Reducer, Action} from "../entities/redux";
import {CombatStats} from "../entities/state";
import {UPDATE_ABILITIES} from "../actions/actions";
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
		default:
			return state;
	}
};
