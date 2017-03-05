import { Component } from '@angular/core';
import {ICharacter, Character} from './legacy/entities/character';
import {Stats} from './legacy/entities/state';

@Component({
  selector: 'character-sheet',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public character: ICharacter = new Character({
    name: 'Ashkor Ferrik'
  });
  public stats: Stats = {
    level: 5
  } as Stats;
}
