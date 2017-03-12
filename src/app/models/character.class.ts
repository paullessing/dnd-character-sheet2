import {Alignment} from './alignment.enum';
import {ClassLevel} from './class-level.interface';
import {Ability} from './ability.enum';
import {Proficiency, Proficiencies} from './proficiency.enum';
import {Skill} from './skill.enum';

export interface CharacterData {
  name: string;
  playerName: string;
  alignment: Alignment;
  xp: number;

  classLevel: ClassLevel[];

  background: string;

  race: string;

  traits: string;
  ideals: string;
  bonds: string;
  flaws: string;

  abilityScores: { [ability: string]: number };
  skillProficiencies: { [skill: string]: Proficiency };
  savingThrowProficiencies: { [ability: string]: boolean };
}

export class Character {

  private abilityScores: { [ability: string]: number };
  private skillProficiencies: { [skill: string]: Proficiency };
  private savingThrowProficiencies: { [ability: string]: boolean };
  private inventory: any; // TODO make private when well-defined

  constructor(
    private data: CharacterData
  ) {
  }

  get name(): string {
    return this.data.name;
  }

  get playerName(): string {
    return this.data.playerName;
  }

  get alignment(): Alignment {
    return this.data.alignment;
  }

  get xp(): number {
    return this.data.xp;
  }

  get background(): string {
    return this.data.background;
  }

  get race(): string {
    return this.data.race;
  }

  get traits(): string {
    return this.data.traits;
  }

  get ideals(): string {
    return this.data.ideals;
  }

  get bonds(): string {
    return this.data.bonds;
  }

  get flaws(): string {
    return this.data.flaws;
  }

  public get classLevel(): ClassLevel[] {
    return this.data.classLevel.slice(0);
  }

  public get playerLevel(): number {
    return getLevel(this.data.xp);
  }

  public get proficiencyBonus(): number {
    return getProficiencyBonus(this.playerLevel);
  }

  public getSkillModifier(ability: Ability, skill: Skill): number {
    const proficiency = this.skillProficiencies[skill] || Proficiencies.NONE;
    return this.getAbilityModifier(ability, proficiency);
  }

  public getAbilityScore(ability: Ability): number {
    return this.abilityScores[ability] || 10;
  }

  public getAbilityModifier(ability: Ability, proficiency: Proficiency = Proficiencies.NONE): number {
    const score = this.abilityScores[ability];
    const modifier = -5 + Math.floor(score / 2);

    return modifier + this.getProficiencyModifier(proficiency);
  }

  public getSavingThrowModifier(ability: Ability, proficiency: Proficiency = Proficiencies.NONE): number {
    const isProficient = !!this.savingThrowProficiencies[ability];
    return this.getAbilityModifier(ability, isProficient ? Proficiencies.REGULAR : Proficiencies.NONE);
  }

  private getProficiencyModifier(proficiency: Proficiency): number {
    switch (proficiency) {
      case Proficiencies.NONE:
        return 0;
      case Proficiencies.JACK_OF_ALL_TRADES:
        return Math.floor(this.proficiencyBonus / 2);
      case Proficiencies.REGULAR:
        return this.proficiencyBonus;
      case Proficiencies.EXPERTISE:
        return this.proficiencyBonus * 2;
      default:
        console.error('Unexpected proficiency', proficiency);
        return 0;
    }
  }
}

const XP_TO_LEVEL = [
  0, 300, 900, 2700, 6500,
  14000, 23000, 34000, 48000, 64000,
  85000, 100000, 120000, 140000, 165000,
  195000, 225000, 265000, 305000, 355000
];

function getLevel(xp: number): number {
  for (let level = XP_TO_LEVEL.length - 1; level >= 0; level--) {
    if (xp >= XP_TO_LEVEL[level]) {
      return level + 1;
    }
  }
  return 1; // Cannot be less than level 1
}

function getProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2;
}
