import {Component, OnInit, Input} from '@angular/core';
import {Character} from '../models/character.class';

@Component({
  selector: 'cs-personality',
  templateUrl: './personality.component.html',
  styleUrls: ['./personality.component.scss']
})
export class PersonalityComponent implements OnInit {

  @Input()
  public character: Character

  constructor() { }

  ngOnInit() {
  }

}
