import {Action} from "../actions/action";
import {AbilitiesFactory} from "../entities/abilities";
import {AbilityData} from "../entities/abilities";
import {State} from "../entities/state";
import {Character} from "../entities/character";
import {Abilities} from "../entities/abilities";
import {InitialSkills} from "../entities/skills";
import {Skills} from "../entities/skills";

const abilitiesFactory = new AbilitiesFactory();
const aData: AbilityData = { name: 'Strength', value: 17, isProficientSavingThrow: true };
const emptyAbilities = abilitiesFactory.getAbilities([aData], 2);

export function basicAbilities(state = emptyAbilities, action: Action) {
    return state;
}

export function basicSkills(state = InitialSkills, action: Action) {
    return state;
}

export function xpAbilities(state: State, action: Action) {
    let newState = state;
    if (!newState.abilities) {
        newState = Object.assign({}, newState, {
            abilities: abilitiesFactory.getAbilities([], newState.character.proficiencyBonus)
        });
    }
    if (action.type === 'ADD_XP') {
        newState = Object.assign({}, newState, addXp(newState.character, newState.abilities, newState.skills, action.payload));
    }
    // Do actions here
    return newState;
}

function addXp(character: Character, abilities: Abilities, skills: Skills, xp: number): { character: Character, abilities: Abilities, skills: Skills } {
    let newCharacter = character.addXp(xp);

    let newAbilities = abilities;
    let newSkills = skills;
    let oldProficiency = character.proficiencyBonus;
    if (oldProficiency !== newCharacter.proficiencyBonus) {
        newAbilities = newAbilities.changeProficiency(newCharacter.proficiencyBonus);
        newSkills = newSkills.changeProficiency(newAbilities, newCharacter.proficiencyBonus);
    }

    return {
        character: newCharacter,
        abilities: newAbilities,
        skills: newSkills
    };
}

function updateAbilities(abilities: Abilities, skills: Skills, proficiencyBonus: number): { abilities: Abilities, skills: Skills } {



    return null;
}
