import {Component, Input, Inject} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";

import {ModalWindow} from "../modal/modal.service";

export const XP_KEY = 'currentXp';

export interface AddXpDetails {
    amount: number;
    reason: string;
}

@Component({
    selector: 'add-xp',
    template: `
<h2>Add XP</h2>
<form (ngSubmit)="submit()">
    <div>
        <label>
            Amount (current: {{ currentXp }})
            <input type="number" required step="1" [(ngModel)]="details.amount" />
        </label>
    </div>
    <div>
        <label>
            Reason
            <input type="text" [(ngModel)]="details.reason" />
        </label>
    </div>
    <div>
        <button type="submit">Add</button>
        <a (click)="close()" href="javascript:void(0)">Cancel</a>
    </div>
</form>
`,
    directives: [FORM_DIRECTIVES]
})
export class AddXpModalComponent {

    public details: AddXpDetails;

    constructor(
        private modalWindow: ModalWindow<AddXpDetails>,
        @Inject(XP_KEY) public currentXp: number
    ) {
        this.details = {
            amount: 0,
            reason: null
        };
    }

    public submit() {
        this.modalWindow.close(this.details);
    }

    public close() {
        this.modalWindow.close(null);
    }
}
