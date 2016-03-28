import {Abilities} from "./abilities";
import {Alignment} from "./alignments";
import {Character} from "./character";
import {Class} from "./classes";
import {Amount} from "./currency";
import {Item, Inventory} from "./item";
import {Personality} from "./personality";
import {Skills} from "./skills";

export interface State {
    character: Character;

    stats: Stats;

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
}