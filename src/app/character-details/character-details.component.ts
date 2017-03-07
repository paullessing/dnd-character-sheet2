import {Component, OnInit, Input} from '@angular/core';
import {Character} from '../models/character.interface';
import {getLevel} from '../models/character.model';

@Component({
  selector: 'cs-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  @Input()
  public character: Character;

  constructor() { }

  ngOnInit() {
  }

  public getLevel() {
    return getLevel(this.character);
  }
}
