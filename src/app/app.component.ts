import {Component} from '@angular/core';
import {Character} from './models/character.interface';
import {Alignments} from './models/alignment.enum';
import {CharacterClasses} from './models/character-class.enum';

@Component({
  selector: 'character-sheet',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public character: Character = {
    name: 'Ashkor Ferrik',
    playerName: 'Paul',
    xp: 3000,
    race: 'Human (Variant)',
    background: 'Sailor',
    abilities: '',
    alignment: Alignments.TRUE_NEUTRAL,
    classLevel: [{
      characterClass: CharacterClasses.FIGHTER,
      level: 5
    }],
    traits: 'Traiteur',
    flaws: 'Flawed',
    bonds: 'James',
    ideals: 'Yes please',
    inventory: []
  }
}
