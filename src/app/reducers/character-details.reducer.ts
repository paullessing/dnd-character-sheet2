import {CharacterDetails, CharacterClasses, Alignments} from '../models';

import {Action} from 'redux';

const DEFAULT_CHARACTER_DETAILS: CharacterDetails = {
  name: '',
  classAndLevel: [{
    characterClass: CharacterClasses.BARBARIAN,
    level: 1
  }],
  alignment: Alignments.LAWFUL_GOOD,
  background: '',
  playerName: '',
  race: 'Human'
};

const characterDetailsReducer = (state: CharacterDetails = DEFAULT_CHARACTER_DETAILS, action: Action): CharacterDetails => {
  return state;
};

export {
  characterDetailsReducer as characterDetails
};
