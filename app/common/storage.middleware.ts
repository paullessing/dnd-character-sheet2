import {Store} from 'redux';
import {LOAD} from "../actions/actions";
import {Action} from "../entities/redux";
import {HistoryState, HistoryGroup, HistoricalAction, State} from "../entities/state";
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

interface SerializedHistoryState {
    current: string;
    currentId: number;
    maxId: number;
    history: SerializedHistoryGroup[];
}

interface SerializedHistoryGroup {
    id: number;
    name: string;
    description: string;
    dateCreated: number;
    startStateSerialized: string;
    isDeleted: boolean;
    actions: {
        id: number;
        action: Action;
        dateTime: number;
        isDeleted: boolean;
    }[];
}

interface SerializedState {
    character: ICharacter;
    stats: {
        xp: number;
        level: number;
        proficiencyBonus: number;
        abilities: AbilityData[];
        skills: SkillData[];
        proficiencies: string;
    };
    combat: {
        speed: number;
        initiative: number;
        maxHitpoints: number;
        temporaryMaxHitpoints: number;
        hitpoints: number;
        temporaryHitpoints: number;
        armourClass: number;
        deathSaves: number;
        deathFails: number;
    };
    personality: IPersonality;
    inventory: {
        items: IItem[];
        wallet: IAmount;
        maxItemId: number;
    };
}

function serialize(state: HistoryState): string {
    let serializedState: SerializedHistoryState = {
        current: serializeState(state.current),
        currentId: state.currentId,
        maxId: state.maxId,
        history: state.history.map((group: HistoryGroup): SerializedHistoryGroup => ({
            id: group.id,
            name: group.name || null,
            description: group.description || null,
            dateCreated: group.dateCreated.getTime(),
            startStateSerialized: group.startStateSerialized,
            isDeleted: group.isDeleted,
            actions: group.actions.map((action: HistoricalAction) => ({
                id: action.id,
                action: action.action,
                dateTime: action.dateTime.getTime(),
                isDeleted: action.isDeleted
            }))
        }))
    };
    return JSON.stringify(serializedState);
}

function deserialize(dataString: string): HistoryState {
    try {
        let data: SerializedHistoryState = JSON.parse(dataString);
        return {
            current: deserializeState(data.current),
            currentId: data.currentId,
            maxId: data.maxId,
            history: data.history.map((group: SerializedHistoryGroup): HistoryGroup => ({
                id: group.id,
                name: group.name,
                description: group.description,
                dateCreated: new Date(group.dateCreated),
                startStateSerialized: group.startStateSerialized,
                isDeleted: group.isDeleted,
                actions: group.actions.map(action => ({
                    id: action.id,
                    action: action.action,
                    dateTime: new Date(action.dateTime),
                    isDeleted: action.isDeleted
                }))
            }))
        };
    } catch (error) {
        console.log('Could not deserialize data', dataString);
        throw error;
    }
}

export function serializeState(state: State): string {
    let serializedState: SerializedState = {
        character: state.character.getData(),
        stats: {
            xp:               state.stats.xp,
            level:            state.stats.level,
            proficiencyBonus: state.stats.proficiencyBonus,
            abilities:        state.stats.abilities.getData(),
            skills:           state.stats.skills.getData(),
            proficiencies:    state.stats.proficiencies
        },
        combat: {
            speed:                 state.combat.speed,
            initiative:            state.combat.initiative,
            maxHitpoints:          state.combat.maxHitpoints,
            temporaryMaxHitpoints: state.combat.temporaryMaxHitpoints,
            hitpoints:             state.combat.hitpoints,
            temporaryHitpoints:    state.combat.temporaryHitpoints,
            armourClass:           state.combat.armourClass,
            deathSaves:            state.combat.deathSaves,
            deathFails:            state.combat.deathFails,
        },
        personality: state.personality,
        inventory: {
            items:     state.inventory.items.getData(),
            wallet:    state.inventory.wallet.getData() || {},
            maxItemId: state.inventory.maxItemId || Math.max(0, Math.max.apply(Math, state.inventory.items.items.map(item => item.id)))
        }
    };
    return JSON.stringify(serializedState);
}

export function deserializeState(dataString: string): State {
    try {
        let data: SerializedState = JSON.parse(dataString);
        let state: State = {
            character:   data.character   && new Character(data.character),
            personality: data.personality && new Personality(data.personality),
            stats: data.stats && {
                xp:               data.stats.xp,
                level:            data.stats.level,
                proficiencyBonus: data.stats.proficiencyBonus,
                abilities:        undefined,
                skills:           undefined,
                proficiencies:    data.stats.proficiencies || ''
            },
            combat: data.combat && {
                speed:                 data.combat.speed,
                initiative:            data.combat.initiative,
                maxHitpoints:          data.combat.maxHitpoints,
                temporaryMaxHitpoints: data.combat.temporaryMaxHitpoints,
                hitpoints:             data.combat.hitpoints,
                temporaryHitpoints:    data.combat.temporaryHitpoints,
                armourClass:           data.combat.armourClass,
                deathSaves:            data.combat.deathSaves,
                deathFails:            data.combat.deathFails,
            },
            inventory: data.inventory && {
                items:     new Inventory(...(data.inventory.items.map((item: IItem) => new Item(item)))),
                wallet:    new Amount(data.inventory.wallet),
                maxItemId: data.inventory.maxItemId
            }
        };
		if (data.stats) {
			let abilities = getAbilities(data.stats.abilities, state.stats.proficiencyBonus);
			let skills = loadSkills(abilities, data.stats.skills, state.stats.proficiencyBonus);

			Object.assign(state.stats, { abilities, skills });
		}

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
            let state: HistoryState = store.getState();
            console.info('Storing', state);
            localStorage.setItem(STATE_KEY, serialize(state));
        }
        return nextAction;
    }
}

export function loadState(): HistoryState {
    let data = localStorage.getItem(STATE_KEY);
    if (!data) {
        return undefined;
    }
    else {
        let state = deserialize(data);
		console.log(state);
		return state;
    }
}
