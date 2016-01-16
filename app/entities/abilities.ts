import {Injectable} from "angular2/core";

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
    public isProficientSavingThrow: boolean;

    constructor(
        name: string,
        value: number,
        isProficientSavingThrow: boolean
    ) {
        this.name = name;
        this.value = ensureRange(value);
        this.modifier = getAbilityModifier(this.value);
        this.isProficientSavingThrow = isProficientSavingThrow;

        Object.freeze(this);
    }
}

export class Abilities extends Array<Ability> {
    constructor(
        public strength: Ability,
        public dexterity: Ability,
        public constitution: Ability,
        public intelligence: Ability,
        public wisdom: Ability,
        public charisma: Ability
    ) {
        super();
        this.push(
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma
        );
        Object.freeze(this);
    }
}

export class AbilitiesFactory {
    public getAbilities(data: AbilityData[]): Abilities {
        data = data || [];
        let abilities: { [name: string]: AbilityData } = {};
        data.forEach(ability => {
            abilities[ability.name] = ability;
        });

        let create = (name: string): Ability => new Ability(
            name,
            abilities[name] && abilities[name].value || 10,
            !!(abilities[name] && abilities[name].isProficientSavingThrow)
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
}

function ensureRange(score: number): number {
    return Math.max(0, Math.min(20, score));
}

export function getAbilityModifier(score: number): number {
    return -5 + Math.floor(score / 2);
}
