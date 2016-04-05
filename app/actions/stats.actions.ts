import {Action} from "./../entities/redux";
import {ADD_XP, UPDATE_ABILITIES} from "./actions";

import {SkillData} from "../entities/skills";

export interface AbilityDiff {
    value: number;
    isProficientSavingThrow: boolean;
}

export interface AbilitiesDiff {
    [name: string]: AbilityDiff
}

export interface UpdatePayload {
    abilities: AbilitiesDiff;
    skills: SkillData[];
}

export function updateStats(abilities: AbilitiesDiff, skills: SkillData[]): Action {
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