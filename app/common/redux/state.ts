import {Character} from "../../entities/character";
import {Class} from "../../entities/classes";
import {Alignment} from "../../entities/alignments";
import {Abilities} from "../../entities/abilities";
import {Item} from "../../entities/item";
import {Amount} from "../../entities/currency";
import {Personality} from "../../entities/personality";
import {AbilitiesFactory} from "../../entities/abilities";
import {convertToAmount} from "../../entities/currency";

export interface State {
    character: Character;

    abilities: Abilities;

    personality: Personality;

    inventory: {
        items: Item[];
        wallet: Amount;
    };
}