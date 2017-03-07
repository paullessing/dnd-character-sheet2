import {CharacterClass, CharacterClasses} from './character-class.enum';
import {Alignment, Alignments} from './alignment.enum';
import {CharacterDetails} from './character-details.interface';

export const createCharacterDetails = (
  name: string,
  characterClass: CharacterClass,
  level: number,
  background: string,
  playerName: string,
  race: string,
  alignment: Alignment
): CharacterDetails => {
  return {
    name: name || '',
    classAndLevel: [{
      characterClass: characterClass || CharacterClasses.BARBARIAN,
      level: level || 1
    }],
    background: background || '',
    playerName: playerName || '',
    race: race || '',
    alignment: alignment || Alignments.LAWFUL_GOOD
  };
};
