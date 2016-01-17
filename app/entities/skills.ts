import {Names as AbilityName, Abilities} from "./abilities";

export class Proficiency {
    static NONE = 'None';
    static JACK_OF_ALL_TRADES = 'Jack of all Trades';
    static YES = 'Yes';
    static EXPERTISE = 'Expertise';
}

export class Skill {
    constructor(
        public name: string,
        public proficiency: string,
        public modifier: number,
        public abilityName: string
    ) {
        Object.freeze(this);
    }
}

export class Skills extends Array<Skill> {
    public byName: { [name: string]: Skill };

    constructor(skills: Skill[]) {
        super();
        this.push(...skills);
        this.byName = {};
        skills.forEach(skill => this[skill.name] = skill);
        Object.freeze(this.byName);
        Object.freeze(this);
    }

    public toAbilitiesMap(): { [name: string]: Skill[] } {
        let map: { [name: string]: Skill[] } = {};
        this.forEach(skill => {
            let list = map[skill.abilityName] || (map[skill.abilityName] = []);
            list.push(skill);
        });
        return map;
    }
}


export function convertToMap(skills: Skill[]): { [name: string]: Skill[] } {
    let map: { [name: string]: Skill[] } = {};
    skills.forEach(skill => {
        let list = map[skill.abilityName] || (map[skill.abilityName] = []);
        list.push(skill);
    });
    return map;
}

export interface SkillData {
    name: string;
    proficiency: string;
}

interface Definition {
    name: string;
    abilityName: string;
}

export function loadSkills(abilities: Abilities, skillData: SkillData[] | Skills): Skills {
    console.log("LoadSkills", abilities, skillData);
    let skillMap: { [name: string]: SkillData } = {};
    skillData.forEach(skill => skillMap[skill.name] = skill);

    let skills: Skill[] = Definitions.map((definition: Definition) => {
        let data = skillMap[definition.name];
        const proficiency = data ? data.proficiency : Proficiency.NONE;
        return new Skill(definition.name, proficiency, abilities.byName[definition.abilityName].modifier, definition.abilityName);
    });

    return new Skills(skills);
}

const Definitions: Definition[] = [
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
