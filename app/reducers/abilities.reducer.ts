import {Action} from "../common/redux/action";
import {AbilitiesFactory} from "../entities/abilities";
import {AbilityData} from "../entities/abilities";
import {State} from "../common/redux/state";
import {Character} from "../entities/character";
import {Abilities} from "../entities/abilities";

const abilitiesFactory = new AbilitiesFactory();
const aData: AbilityData = { name: 'Strength', value: 17, isProficientSavingThrow: true };
const emptyAbilities = abilitiesFactory.getAbilities([aData], 2);

export function basicAbilities(state = emptyAbilities, action: Action) {
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
        newState = Object.assign({}, newState, addXp(newState.character, newState.abilities, action.payload));
    }
    // Do actions here
    return newState;
}

function addXp(character: Character, abilities: Abilities, xp: number): { character: Character, abilities: Abilities } {
    let newCharacter = character.addXp(xp);

    let newAbilities = abilities;
    let oldProficiency = character.proficiencyBonus;
    if (oldProficiency !== newCharacter.proficiencyBonus) {
        newAbilities = newAbilities.changeProficiency(newCharacter.proficiencyBonus);
    }

    return {
        character: newCharacter,
        abilities: newAbilities
    };
}
