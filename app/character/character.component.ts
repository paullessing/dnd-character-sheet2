import {Component} from 'angular2/core';
import {Alignment, AlignmentNames} from './alignments';
import {Class, ClassNames} from "./classes";
import {ICharacter, Character} from "./character";
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
    public isEditing: boolean;
    public editCharacter: ICharacter

    constructor(private _characterService: CharacterService) {
    }

    ngOnInit() {
        this._characterService.getCharacter().subscribe(character => {
            this.character = character;
            console.log("Updated character", character);
        });
    }

    public edit() {
        this.isEditing = true;
        this.editCharacter = {
            name: this.character.name,
            characterClass: this.character.characterClass,
            background: this.character.background,
            playerName: this.character.playerName,
            race: this.character.race,
            alignment: this.character.alignment,
            xp: this.character.xp
        };
    }

    public save() {
        this._characterService.updateCharacter(this.editCharacter);
        this.isEditing = false;
    }

    public cancel() {
        this.isEditing = false;
    }
}
