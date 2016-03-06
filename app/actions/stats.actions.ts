import {Action} from "./action";
import {ADD_XP} from "./actions";
import {SkillData} from "../entities/skills";
import {UPDATE_ABILITIES} from "./actions";
import {UpdatePayload} from "../reducers/stats.reducer";

export interface AbilityDiff {
    value: number;
    isProficientSavingThrow: boolean;
}

export interface AbilitiesDiff {
    [name: string]: AbilityDiff
}

export function updateStats(abilities: AbilitiesDiff, skills: SkillData[]) {
    const payload: UpdatePayload = {
        abilities,
        skills
    };
    return {
        type: UPDATE_ABILITIES,
        payload: {
            data: payload
        }
    };
}

export function addXp(amount: number, reason?: string): Action {
    return {
        type: ADD_XP,
        payload: {
            amount,
            reason
        }
    }
}