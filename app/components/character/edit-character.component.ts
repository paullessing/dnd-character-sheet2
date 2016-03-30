import {Component, OnChanges, SimpleChange, Input, Output, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES, ControlGroup, FormBuilder, Validators} from "angular2/common";

import {Personality, IPersonality} from "../../entities/personality";
import {Character} from "../../entities/character";
import {ICharacter} from "../../entities/character";
import {ClassNames} from "../../entities/classes";
import {AlignmentNames} from "../../entities/alignments";

/**
 * Component for editing character data.
 */
@Component({
    selector: 'edit-character',
    templateUrl: 'app/components/character/edit-character.component.html',
    directives: [FORM_DIRECTIVES]
})
export class EditCharacterComponent implements OnChanges {
    public characterForm: ControlGroup;

    public alignments = AlignmentNames;
    public classes = ClassNames;

    @Input('character')
    public character: Character;

    @Output('update')
    public update: EventEmitter<ICharacter> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder
    ) {
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['character']) {
            let character: Character = changes['character'].currentValue;
            this.characterForm = this.formBuilder.group({
                name: [character.name, Validators.required],
                characterClass: [character.characterClass, Validators.required],
                background: [character.background, Validators.required],
                playerName: [character.playerName, Validators.required],
                race: [character.race, Validators.required],
                alignment: [character.alignment, Validators.required],
            });
            console.log('Form updated');
        }
    }

    public save() {
        if (this.characterForm.pristine) {
            this.update.emit(null); // No changes made
            return;
        }
        if (!this.characterForm.valid) {
            return;
        }
        this.update.emit(this.characterForm.value);
    }

    public cancel() {
        this.update.emit(null);
    }
}
