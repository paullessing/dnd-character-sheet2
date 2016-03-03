import {Character} from "character";
import {Class} from "classes";
import {Alignment} from "alignments";
import {Abilities} from "abilities";
import {Skills} from "./skills";
import {Item} from "item";
import {Amount} from "currency";
import {Personality} from "personality";
import {AbilitiesFactory} from "abilities";
import {convertToAmount} from "currency";

export interface State {
    character: Character;

    abilities: Abilities;
    skills: Skills;

    personality: Personality;

    inventory: {
        items: Item[];
        wallet: Amount;
    };
}