import { combineReducers } from 'redux';
import {Character} from "../entities/character";
import {Action} from "../common/redux/action";
import {AbilitiesFactory} from "../entities/abilities";
import {Personality} from "../entities/personality";
import {Amount} from "../entities/currency";
import {State} from "../common/redux/state";
import {Abilities} from "../entities/abilities";
import {AbilityData} from "../entities/abilities";

function character(state = new Character({}), action: Action) {
    return state;
}

function personality(state = new Personality({}), action: Action) {
    return state;
}

function inventory(state = {
    items: [],
    wallet: new Amount({})
}, action: Action) {
    return Object.freeze(state);
}

const abilitiesFactory = new AbilitiesFactory();
const aData: AbilityData = { name: 'Strength', value: 17, isProficientSavingThrow: true };
const emptyAbilities = abilitiesFactory.getAbilities([aData], 2);

const basicReducer: ((state: State, action: Action) => State) = combineReducers({
    character,
    abilities: (state = emptyAbilities, action: Action) => state,
    personality,
    inventory
});

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

function abilities(state: State, action: Action) {
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

export const rootReducer = (state: State, action: Action) => {
    let newState = state;
    newState = basicReducer(newState, action);
    newState = abilities(newState, action);
    return Object.freeze(newState);
};