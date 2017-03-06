export type CharacterClass = 'Barbarian' | 'Bard' | 'Cleric' | 'Druid' | 'Fighter' | 'Monk' | 'Paladin' | 'Ranger' | 'Rogue' | 'Sorcerer' | 'Warlock' | 'Wizard';

export class CharacterClasses {
  constructor() {
    throw new Error('Cannot instantiate enum');
  }

  public static BARBARIAN: CharacterClass  = 'Barbarian';
  public static BARD: CharacterClass       = 'Bard';
  public static CLERIC: CharacterClass     = 'Cleric';
  public static DRUID: CharacterClass      = 'Druid';
  public static FIGHTER: CharacterClass    = 'Fighter';
  public static MONK: CharacterClass       = 'Monk';
  public static PALADIN: CharacterClass    = 'Paladin';
  public static RANGER: CharacterClass     = 'Ranger';
  public static ROGUE: CharacterClass      = 'Rogue';
  public static SORCERER: CharacterClass   = 'Sorcerer';
  public static WARLOCK: CharacterClass    = 'Warlock';
  public static WIZARD: CharacterClass     = 'Wizard';
}

// export enum Class {
//   Barbarian,
//   Bard,
//   Cleric,
//   Druid,
//   Fighter,
//   Monk,
//   Paladin,
//   Ranger,
//   Rogue,
//   Sorcerer,
//   Warlock,
//   Wizard
// }
//
// const _ClassNames: string[] = [];
// _ClassNames[Class.Barbarian] = 'Barbarian';
// _ClassNames[Class.Bard]      = 'Bard';
// _ClassNames[Class.Cleric]	 = 'Cleric';
// _ClassNames[Class.Druid]	 = 'Druid';
// _ClassNames[Class.Fighter]	 = 'Fighter';
// _ClassNames[Class.Monk]	     = 'Monk';
// _ClassNames[Class.Paladin]	 = 'Paladin';
// _ClassNames[Class.Ranger]	 = 'Ranger';
// _ClassNames[Class.Rogue]	 = 'Rogue';
// _ClassNames[Class.Sorcerer]	 = 'Sorcerer';
// _ClassNames[Class.Warlock]	 = 'Warlock';
// _ClassNames[Class.Wizard]	 = 'Wizard';
//
// export const ClassNames = _ClassNames;

