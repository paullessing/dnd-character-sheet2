import {Component, OnInit, Input} from '@angular/core';
import {ICharacter} from '../legacy/entities/character';
import {Stats} from '../legacy/entities/state';

@Component({
  selector: 'cs-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input()
  public character: ICharacter;

  @Input()
  public stats: Stats;

  constructor() { }

  ngOnInit() {
  }

}
