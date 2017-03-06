import {CharacterClass, CharacterClasses} from './character-class.enum';
import {Alignment, Alignments} from './alignment.enum';

export interface ClassLevel {
  characterClass: CharacterClass;
  level: number;
}

export interface Character {
  name: string;
  characterClass: ClassLevel[];
  background: string;
  playerName: string;
  race: string;
  alignment: Alignment;
}

export const createCharacter = (
  name: string,
  characterClass: CharacterClass,
  level: number,
  background: string,
  playerName: string,
  race: string,
  alignment: Alignment
): Character => {
    return {
      name: name || '',
      characterClass: [{
        characterClass: characterClass || CharacterClasses.BARBARIAN,
        level: level || 1
      }],
      background: background || '',
      playerName: playerName || '',
      race: race || '',
      alignment: alignment || Alignments.LAWFUL_GOOD
    };
};

export const updateCharacter = (character: Character, newData: Partial<Character>) => {

}
