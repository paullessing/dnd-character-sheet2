import { Store } from 'redux';
import {Action} from "../actions/action";
import {State} from "../entities/state";
import {AbilityData} from "../entities/abilities";
import {SkillData} from "../entities/skills";
import {IPersonality} from "../entities/personality";
import {IItem} from "../entities/item";
import {IAmount} from "../entities/currency";
import {ICharacter} from "../entities/character";
import {Character} from "../entities/character";
import {Personality} from "../entities/personality";
import {Abilities} from "../entities/abilities";
import {getAbilities} from "../entities/abilities";
import {Item} from "../entities/item";
import {Amount} from "../entities/currency";
import {loadSkills} from "../entities/skills";
import {LOAD} from "../actions/actions";

export const STATE_KEY = 'dnd-character-sheet.state';

interface ActionTransformer {
    (action: Action): Action
}

interface SerializedState {
    character: ICharacter;
    stats: {
        xp: number;
        level: number;
        proficiencyBonus: number;
        abilities: AbilityData[];
        skills: SkillData[];
    };
    personality: IPersonality;
    inventory: {
        items: IItem[];
        wallet: IAmount;
    };
}

function serialize(state: State): string {
    let serializedState: SerializedState = {
        character: state.character.getData(),
        stats: {
            xp: state.stats.xp,
            level: state.stats.level,
            proficiencyBonus: state.stats.proficiencyBonus,
            abilities: state.stats.abilities.getData(),
            skills: state.stats.skills.getData()
        },
        personality: state.personality,
        inventory: {
            items: state.inventory.items ? state.inventory.items.map(item => item.getData()) : [],
            wallet: state.inventory.wallet || {}
        }
    };

    return JSON.stringify(serializedState);
}

function deserialize(dataString: string): State {
    try {
        let data: SerializedState = JSON.parse(dataString);
        let state: State = {
            character: new Character(data.character),
            personality: new Personality(data.personality),
            stats: {
                xp: data.stats.xp,
                level: data.stats.level,
                proficiencyBonus: data.stats.proficiencyBonus,
                abilities: null,
                skills: null
            },
            inventory: {
                items: (data.inventory.items || []).map(item => new Item(item)),
                wallet: new Amount(data.inventory.wallet)
            }
        };
        let abilities = getAbilities(data.stats.abilities, state.stats.proficiencyBonus);
        let skills = loadSkills(abilities, data.stats.skills, state.stats.proficiencyBonus);

        Object.assign(state.stats, { abilities, skills });

        return state;
    } catch (error) {
        console.log('Could not deserialize data');
        throw error;
    }
}

export function storeStateAfterUpdate(store: Store) {
    return (next: ActionTransformer) => (action: Action) => {
        let nextAction: Action = next(action);
        if (nextAction.type !== LOAD) {
            let state = store.getState();
            localStorage.setItem(STATE_KEY, serialize(state));
        }
        return nextAction;
    }
}

export function loadState(): State {
    let data = localStorage.getItem(STATE_KEY);
    if (!data) {
        return undefined;
    }
    else {
        let state = deserialize(data);
        return state;
    }
}