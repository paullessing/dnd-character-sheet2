import { Store } from 'redux';
import {LOAD} from "../actions/actions";
import {Action} from "../actions/action";
import {State} from "../entities/state";
import {Abilities, getAbilities, AbilityData} from "../entities/abilities";
import {loadSkills, SkillData} from "../entities/skills";
import {IItem, Item, Inventory} from "../entities/item";
import {IAmount, Amount} from "../entities/currency";
import {IPersonality, Personality} from "../entities/personality";
import {ICharacter, Character} from "../entities/character";

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
        maxItemId: number;
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
            items: state.inventory.items.getData(),
            wallet: state.inventory.wallet || {},
            maxItemId: state.inventory.maxItemId || Math.max(0, Math.max.apply(Math, state.inventory.items.items.map(item => item.id)))
        }
    };
    return JSON.stringify(serializedState);
}

function deserialize(dataString: string): State {
    try {
        let data: SerializedState = JSON.parse(dataString);
        let items = data.inventory.items.map(((item: IItem) => new Item(item)));
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
                items: new Inventory(...items),
                wallet: new Amount(data.inventory.wallet),
                maxItemId: data.inventory.maxItemId
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