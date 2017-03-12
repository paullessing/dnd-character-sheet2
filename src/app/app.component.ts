import {Component} from '@angular/core';
import {Alignments} from './models/alignment.enum';
import {CharacterClasses} from './models/character-class.enum';
import {Character} from './models/character.class';
import {Abilities} from './models/ability.enum';
import {Skills} from './models/skill.enum';
import {Proficiencies} from './models/proficiency.enum';

@Component({
  selector: 'character-sheet',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public character: Character = new Character({
    name: 'Ashkor Ferrik',
    playerName: 'Paul',
    xp: 3000,
    race: 'Human (Variant)',
    background: 'Sailor',
    alignment: Alignments.TRUE_NEUTRAL,
    classLevel: [{
      characterClass: CharacterClasses.FIGHTER,
      level: 5
    }],
    traits: 'Traiteur',
    flaws: 'Flawed',
    bonds: 'James',
    ideals: 'Yes please',
    abilityScores: {
      [Abilities.STRENGTH]: 13,
      [Abilities.DEXTERITY]: 20
    },
    skillProficiencies: {
      [Skills.ACROBATICS]: Proficiencies.REGULAR,
      [Skills.STEALTH]: Proficiencies.REGULAR
    },
    savingThrowProficiencies: {
      [Abilities.STRENGTH]: true
    }
  });
}
