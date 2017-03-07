import {ClassLevel} from './class-level.interface';
import {Alignment} from './alignment.enum';

export interface Character {
  name: string;
  playerName: string;
  alignment: Alignment;
  xp: number;

  background: string;
  classLevel: ClassLevel[];
  race: string;

  traits: string;
  ideals: string;
  bonds: string;
  flaws: string;

  abilities: any;
  inventory: any;
}
