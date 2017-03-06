import {Abilities} from "./abilities";
import {Alignment} from "./alignments";
import {Character} from "./character";
import {Class} from "./classes";
import {Amount} from "./currency";
import {Item, Inventory} from "./item";
import {Personality} from "./personality";
import {Skills} from "./skills";
import {Action} from "./redux";

export interface HistoryState {
    current: State;
    currentId: number;
    maxId: number;
    history: HistoryGroup[];
}

export interface HistoryGroup {
    id: number;
    name?: string;
    description?: string;
    dateCreated: Date;
    startStateSerialized: string;
    actions: HistoricalAction[];
    isDeleted?: boolean;
}

export interface HistoricalAction {
    id: number;
    action: Action;
    dateTime: Date;
    isDeleted?: boolean;
};

export interface State {
    character: Character;

    stats: Stats;
    combat: CombatStats;

    personality: Personality;

    inventory: {
        items: Inventory;
        wallet: Amount;
        maxItemId: number;
    };
}

export interface Stats {
    xp: number;
    level: number;
    proficiencyBonus: number;
    abilities: Abilities;
    skills: Skills;
    proficiencies: string;
}

export interface CombatStats {
    speed: number;
    initiative: number;
    maxHitpoints: number;
    temporaryMaxHitpoints: number;
    hitpoints: number;
    temporaryHitpoints: number;
    armourClass: number;
    deathSaves: number;
    deathFails: number;
}
