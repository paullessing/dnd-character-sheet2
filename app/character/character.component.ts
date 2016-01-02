import {Component} from 'angular2/core';
import {Alignment, AlignmentNames} from './alignments';
import {Class, ClassNames} from "./classes";
import {Character} from "./character";
import {OnInit} from "angular2/core";
import {CharacterService} from "./character.service";

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'character',
    templateUrl: 'app/character/character.component.html'
})
export class CharacterComponent implements OnInit{
    // TODO allow multiclassing

    public alignments = AlignmentNames;
    public classes = ClassNames;
    public character: Character;

    constructor(private _characterService: CharacterService) {
    }

    ngOnInit() {
        this._characterService.getCharacter().subscribe(character => {
            this.character = character;
            console.log("Updated character", character);
        });;
    }
}
