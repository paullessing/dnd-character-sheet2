import {AbilityNames as AbilityName} from "./abilities";

export interface SkillDefinition {
    name: string;
    abilityName: string;
}

export const SKILL_DEFINITIONS: SkillDefinition[] = [
    {
        name: 'Acrobatics',
        abilityName: AbilityName.Dexterity
    },
    {
        name: 'Animal Handling',
        abilityName: AbilityName.Wisdom
    },
    {
        name: 'Arcana',
        abilityName: AbilityName.Intelligence
    },
    {
        name: 'Athletics',
        abilityName: AbilityName.Strength
    },
    {
        name: 'Deception',
        abilityName: AbilityName.Charisma
    },
    {
        name: 'History',
        abilityName: AbilityName.Intelligence
    },
    {
        name: 'Insight',
        abilityName: AbilityName.Wisdom
    },
    {
        name: 'Intimidation',
        abilityName: AbilityName.Charisma
    },
    {
        name: 'Investigation',
        abilityName: AbilityName.Intelligence
    },
    {
        name: 'Medicine',
        abilityName: AbilityName.Wisdom
    },
    {
        name: 'Nature',
        abilityName: AbilityName.Intelligence
    },
    {
        name: 'Perception',
        abilityName: AbilityName.Wisdom
    },
    {
        name: 'Performance',
        abilityName: AbilityName.Charisma
    },
    {
        name: 'Persuasion',
        abilityName: AbilityName.Charisma
    },
    {
        name: 'Religion',
        abilityName: AbilityName.Intelligence
    },
    {
        name: 'Sleight of Hand',
        abilityName: AbilityName.Dexterity
    },
    {
        name: 'Stealth',
        abilityName: AbilityName.Dexterity
    },
    {
        name: 'Survival',
        abilityName: AbilityName.Wisdom
    }
];