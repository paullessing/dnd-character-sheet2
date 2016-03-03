import {Abilities} from "./abilities";
import {SkillDefinition, SKILL_DEFINITIONS} from "./skillDefinitions";

export class Proficiency {
    static NONE = 'None';
    static JACK_OF_ALL_TRADES = 'Jack of all Trades';
    static YES = 'Yes';
    static EXPERTISE = 'Expertise';
    static values = [Proficiency.NONE, Proficiency.JACK_OF_ALL_TRADES, Proficiency.YES, Proficiency.EXPERTISE];
}

export interface SkillData {
    name: string;
    proficiency: string;
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

    public getData(): SkillData {
        return {
            name: this.name,
            proficiency: this.proficiency
        };
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

    public toAbilitiesMap(): { [abilityName: string]: Skill[] } {
        let map: { [name: string]: Skill[] } = {};
        this.forEach(skill => {
            let list = map[skill.abilityName] || (map[skill.abilityName] = []);
            list.push(skill);
        });
        return map;
    }

    public changeProficiency(abilities: Abilities, newBonus: number) {
        return loadSkills(abilities, this.map(skill => skill.getData()), newBonus);
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

export function loadSkills(abilities: Abilities, skillData: SkillData[], proficiencyBonus: number): Skills {
    //console.log("LoadSkills", abilities, skillData);
    let skillMap: { [name: string]: SkillData } = {};
    skillData.forEach(skill => skillMap[skill.name] = skill);

    let skills: Skill[] = SKILL_DEFINITIONS.map((definition: SkillDefinition) => {
        let data = skillMap[definition.name];
        const proficiency = data ? data.proficiency : Proficiency.NONE;
        let modifier = abilities.byName[definition.abilityName].modifier;
        if (proficiency === Proficiency.JACK_OF_ALL_TRADES) {
            modifier += Math.floor(proficiencyBonus / 2);
        } else if (proficiency === Proficiency.YES) {
            modifier += proficiencyBonus;
        } else if (proficiency === Proficiency.EXPERTISE) {
            modifier += proficiencyBonus * 2;
        }

        return new Skill(definition.name, proficiency, modifier, definition.abilityName);
    });

    return new Skills(skills);
}

function generateInitialSkills() {
    let initialSkills: SkillData[] = SKILL_DEFINITIONS.map(definition => {
        let data: SkillData = {
            name: definition.name,
            proficiency: Proficiency.NONE
        };
        return Object.freeze(data);
    });
    return Object.freeze(initialSkills);
}

export const InitialSkills: SkillData[] = generateInitialSkills();
