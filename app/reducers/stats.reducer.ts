import {Action} from "../entities/redux";
import {ADD_XP, UPDATE_ABILITIES} from "../actions/actions";

import {getAbilities, AbilityData, Abilities} from "../entities/abilities";
import {Stats} from "../entities/state";
import {Character} from "../entities/character";
import {InitialSkills, Skills, SkillData, loadSkills} from "../entities/skills";
import {AbilitiesDiff, UpdatePayload} from "../actions/stats.actions";

const defaultProficiency = getProficiencyBonus(1);
const emptyAbilities = getAbilities([], defaultProficiency);

const defaultState = Object.freeze({
    xp: 0,
    level: 1,
    proficiencyBonus: defaultProficiency,
    abilities: emptyAbilities,
    skills: loadSkills(emptyAbilities, [], defaultProficiency)
});

export function stats(state: Stats = defaultState, action: Action) {
    switch (action.type) {
        case ADD_XP:
            return addXp(state, action.payload.amount);
        case UPDATE_ABILITIES:
            return updateStats(state, action.payload.data);
    }
    return state;
}

function addXp(stats: Stats, xpToAdd: number): Stats {
    const xp = stats.xp + xpToAdd;
    const level = getLevel(xp);
    const proficiencyBonus = getProficiencyBonus(level);

    if (proficiencyBonus === stats.proficiencyBonus) {
        return Object.assign({}, stats, {
            xp, level, proficiencyBonus
        });
    } else {
        const abilities = stats.abilities.changeProficiency(proficiencyBonus);
        const skills = stats.skills.changeProficiency(abilities, proficiencyBonus);
        return {
            xp,
            level,
            proficiencyBonus,
            abilities,
            skills
        };
    }
}

function updateStats(state: Stats, data: UpdatePayload): Stats {
    const abilities = state.abilities.update(data.abilities, state.proficiencyBonus);
    const skills = state.skills.update(abilities, data.skills, state.proficiencyBonus);
    return Object.assign({}, state, { abilities, skills });
}

function getProficiencyBonus(level: number): number {
    return Math.floor((level - 1) / 4) + 2;
}

var xpToLevel = [
    0, 300, 900, 2700, 6500,
    14000, 23000, 34000, 48000, 64000,
    85000, 100000, 120000, 140000, 165000,
    195000, 225000, 265000, 305000, 355000
];

function getLevel(xp: number) {
    for (var level = xpToLevel.length - 1; level >= 0; level--) {
        if (xp >= xpToLevel[level]) {
            return level + 1;
        }
    }
    return 1; // Cannot be less than level 1
}

export function getXpRequiredForLevelUp(xp) {
    var level = getLevel(xp);
    if (level >= xpToLevel.length) {
        return 0;
    } else {
        return xpToLevel[level] - xp;
    }
}