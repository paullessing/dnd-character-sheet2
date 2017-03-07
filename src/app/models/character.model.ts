import {Character} from './character.interface';

const XP_TO_LEVEL = [
  0, 300, 900, 2700, 6500,
  14000, 23000, 34000, 48000, 64000,
  85000, 100000, 120000, 140000, 165000,
  195000, 225000, 265000, 305000, 355000
];

export function getLevel(character: Character): number {
  for (let level = XP_TO_LEVEL.length - 1; level >= 0; level--) {
    if (character.xp >= XP_TO_LEVEL[level]) {
      return level + 1;
    }
  }
  return 1; // Cannot be less than level 1
}
