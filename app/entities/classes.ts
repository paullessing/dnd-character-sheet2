export enum Class {
    Barbarian,
    Bard,
    Cleric,
    Druid,
    Fighter,
    Monk,
    Paladin,
    Ranger,
    Rogue,
    Sorcerer,
    Warlock,
    Wizard
}

let _ClassNames: string[] = [];
_ClassNames[Class.Barbarian] = 'Barbarian';
_ClassNames[Class.Bard]      = 'Bard';
_ClassNames[Class.Cleric]	 = 'Cleric';
_ClassNames[Class.Druid]	 = 'Druid';
_ClassNames[Class.Fighter]	 = 'Fighter';
_ClassNames[Class.Monk]	     = 'Monk';
_ClassNames[Class.Paladin]	 = 'Paladin';
_ClassNames[Class.Ranger]	 = 'Ranger';
_ClassNames[Class.Rogue]	 = 'Rogue';
_ClassNames[Class.Sorcerer]	 = 'Sorcerer';
_ClassNames[Class.Warlock]	 = 'Warlock';
_ClassNames[Class.Wizard]	 = 'Wizard';

export const ClassNames = _ClassNames;

