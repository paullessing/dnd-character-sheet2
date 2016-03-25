import {Character} from "./character";
import {Class} from "./classes";
import {Alignment} from "./alignments";
import {Abilities} from "./abilities";
import {Skills} from "./skills";
import {Item} from "./item";
import {Amount} from "./currency";
import {Personality} from "./personality";
import {AbilitiesFactory} from "./abilities";
import {Inventory} from "./item";

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