import {Injectable} from "angular2/core";
import {AbilitiesDiff} from "../actions/stats.actions";

export const AbilityNames = {
    Strength: 'Strength',
    Dexterity: 'Dexterity',
    Constitution: 'Constitution',
    Intelligence: 'Intelligence',
    Wisdom: 'Wisdom',
    Charisma: 'Charisma',
    values: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'],
}

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
        this.byName = {};
        abilities.forEach(ability => this.byName[ability.name] = ability);
        Object.freeze(this.byName);
        Object.freeze(this);
    }

    public changeProficiency(newBonus: number) {
        return getAbilities(this, newBonus);
    }

    // TODO object shouldn't depend on AbilitiesDiff
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
        create(AbilityNames.Strength),
        create(AbilityNames.Dexterity),
        create(AbilityNames.Constitution),
        create(AbilityNames.Intelligence),
        create(AbilityNames.Wisdom),
        create(AbilityNames.Charisma)
    );
}

function ensureRange(score: number): number {
    return Math.max(0, Math.min(20, score));
}

export function getAbilityModifier(score: number): number {
    return -5 + Math.floor(score / 2);
}
