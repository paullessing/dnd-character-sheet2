import {Component, OnInit} from 'angular2/core';

import {Alignment, AlignmentNames} from '../../entities/alignments';
import {Class, ClassNames} from "../../entities/classes";
import {ICharacter, Character} from "../../entities/character";
import {CharacterActions, UpdateXpDetails} from "../../services/character/characterActions.service";
import {CharacterRepository} from "../../services/character/character.repository";

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'character',
    templateUrl: 'app/components/character/character.component.html'
})
export class CharacterComponent implements OnInit{
    // TODO allow multiclassing

    public alignments = AlignmentNames;
    public classes = ClassNames;
    public character: Character;
    public isEditing: boolean;
    public editCharacter: ICharacter;
    public isChangingXp: boolean;
    public xpChange: number;
    public xpChangeReason: string;

    constructor(
        private _characterActions: CharacterActions,
        private _characterRepository: CharacterRepository
    ) {
    }

    ngOnInit() {
        this.character = this._characterRepository.currentCharacter;
        this._characterRepository.observable.subscribe(character => {
            this.character = character;
            console.log("Updated character", character);
        });
        console.log("Initialised character component");
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
        this._characterActions.update(this.editCharacter);
        this.isEditing = false;
    }

    public cancel() {
        this.isEditing = false;
        this.isChangingXp = false;
    }

    public editXp() {
        this.isChangingXp = true;
    }

    public submitXp() {
        if (!this.xpChange) {
            return;
        }
        this._characterActions.addXp(this.xpChange, this.xpChangeReason);
        this.isChangingXp = false;
    }
}
