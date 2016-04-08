import {Component, Input, Inject} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";

import {ModalWindow} from "../modal/modal.service";

export const PROFICIENCIES_KEY = 'proficiencies';

@Component({
    selector: 'edit-proficiencies',
    template: `
<form (ngSubmit)="submit()">
    <textarea [(ngModel)]="proficiencies"></textarea>
    <div>
        <button type="submit">Save</button>
        <a (click)="close()" href="javascript:void(0)">Cancel</a>
    </div>
</form>
`,
    directives: [FORM_DIRECTIVES]
})
export class EditProficienciesComponent {
    constructor(
        private modalWindow: ModalWindow<string>,
        @Inject('proficiencies') public proficiencies: string
    ) {
    }

    public submit() {
        console.log(this.proficiencies);
        this.modalWindow.close(this.proficiencies);
    }

    public close() {
        this.modalWindow.close(null);
    }
}