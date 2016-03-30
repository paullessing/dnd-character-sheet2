import {Component, OnChanges, SimpleChange, Input, Output, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES, ControlGroup, FormBuilder, Validators} from "angular2/common";

import {Personality, IPersonality} from "../../entities/personality";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'edit-personality',
    templateUrl: 'app/components/personality/edit-personality.component.html',
    directives: [FORM_DIRECTIVES]
})
export class EditPersonalityComponent implements OnChanges {
    public personalityForm: ControlGroup;

    @Input('personality')
    public personality: Personality;

    @Output('update')
    public update: EventEmitter<IPersonality> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder
    ) {
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (changes['personality']) {
            let personality: Personality = changes['personality'].currentValue;
            this.personalityForm = this.formBuilder.group({
                traits: [personality.traits, Validators.required],
                ideals: [personality.ideals, Validators.required],
                bonds: [personality.bonds, Validators.required],
                flaws: [personality.flaws, Validators.required]
            });
            console.log('Form updated');
        }
    }

    public save() {
        let newPersonality: IPersonality = this.personalityForm.value;
        console.log("NEW", newPersonality);
        if (this.personalityForm.pristine) {
            this.update.emit(null); // No changes made
            return;
        }
        if (!this.personalityForm.valid) {
            return;
        }
        this.update.emit(this.personalityForm.value);
    }

    public cancel() {
        this.update.emit(null);
    }
}
