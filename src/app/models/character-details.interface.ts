import {CharacterClass} from './character-class.enum';
import {Alignment} from './alignment.enum';

export interface ClassLevel {
  characterClass: CharacterClass;
  level: number;
}

export interface CharacterDetails {
  name: string;
  classAndLevel: ClassLevel[];
  background: string;
  playerName: string;
  race: string;
  alignment: Alignment;
}
