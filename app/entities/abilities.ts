import {Injectable} from "angular2/core";
import {AbilitiesDiff} from "../services/abilities/abilitiesActions.service";

export interface AbilityDefinition {
    name: string;
    skills: string[];
}

export const Names = {
    Strength: 'Strength',
    Dexterity: 'Dexterity',
    Constitution: 'Constitution',
    Intelligence: 'Intelligence',
    Wisdom: 'Wisdom',
    Charisma: 'Charisma',
    values: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'],
}

export const AbilityDefinitions: AbilityDefinition[] = [
    {
        name: 'Strength',
        skills: ['Athletics']
    },
    {
        name: 'Dexterity',
        skills: ['Acrobatics', 'Sleight of Hand', 'Stealth']
    },
    {
        name: 'Constitution',
        skills: []
    },
    {
        name: 'Intelligence',
        skills: ['Arcana', 'History', 'Investigation', 'Nature', 'Religion']
    },
    {
        name: 'Wisdom',
        skills: ['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival']
    },
    {
        name: 'Charisma',
        skills: ['Deception', 'Intimidation', 'Performance', 'Persuasion']
    }
];

export interface AbilityData {
    name: string;
    value: number;

    isProficientSavingThrow: boolean;
}

export class Ability {
    public name: string;
    public value: number;
    public modifier: number;
    public savingThrows: {
        isProficient: boolean;
        modifier: number;
    };

    constructor(
        name: string,
        value: number,
        isProficientSavingThrow: boolean,
        proficiencyBonus: number
    ) {
        this.name = name;
        this.value = ensureRange(value);
        this.modifier = getAbilityModifier(this.value);
        this.savingThrows = {
            isProficient: isProficientSavingThrow,
            modifier: this.modifier + (isProficientSavingThrow ? proficiencyBonus : 0)
        };

        Object.freeze(this.savingThrows);
        Object.freeze(this);
    }

    public getData(): AbilityData {
        return {
            name: this.name,
            value: this.value,
            isProficientSavingThrow: this.savingThrows.isProficient
        };
    }
}

export class Abilities extends Array<Ability> {
    public byName: { [name: string]: Ability };
    constructor(...abilities: Ability[]) {
        super();
        this.push(...abilities);
        //console.log("Abilities constructor args", abilities);
        this.byName = {};
        abilities.forEach(ability => this.byName[ability.name] = ability);
        Object.freeze(this.byName);
        Object.freeze(this);

        //console.log("Created new abilities", this);
    }

    public changeProficiency(newBonus: number) {
        return getAbilities(this, newBonus);
    }

    public update(diff: AbilitiesDiff, proficiencyBonus: number) {
        let newData: AbilityData[] = this.getData()
                .map((abilityData: AbilityData) => {
                    return diff[abilityData.name] ? _.extend({}, abilityData, diff[abilityData.name]) : abilityData;
                });
        return getAbilities(newData, proficiencyBonus);
    }

    public getData(): AbilityData[] {
        return this.map(ability => ability.getData());
    }
}

export function getAbilities(data: AbilityData[] | Abilities, proficiencyBonus: number): Abilities {
    if (data instanceof Abilities) {
        data = (data as Abilities).map(ability => ability.getData());
    }
    const normalisedData: AbilityData[] = (data || []) as AbilityData[];
    let abilities: { [name: string]: AbilityData } = {};
    normalisedData.forEach(ability => {
        abilities[ability.name] = ability;
    });

    let create = (name: string): Ability => new Ability(
        name,
        abilities[name] && abilities[name].value || 10,
        !!(abilities[name] && abilities[name].isProficientSavingThrow),
        proficiencyBonus
    );

    return new Abilities(
        create(Names.Strength),
        create(Names.Dexterity),
        create(Names.Constitution),
        create(Names.Intelligence),
        create(Names.Wisdom),
        create(Names.Charisma)
    );
}

export class AbilitiesFactory {
    public getAbilities(data: AbilityData[] | Abilities, proficiencyBonus: number): Abilities {
        return getAbilities(data, proficiencyBonus);
    }
}

function ensureRange(score: number): number {
    return Math.max(0, Math.min(20, score));
}

export function getAbilityModifier(score: number): number {
    return -5 + Math.floor(score / 2);
}
