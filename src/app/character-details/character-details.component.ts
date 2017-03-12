import {Component, OnInit, Input} from '@angular/core';
import {Character} from '../models/character.class';

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
}
