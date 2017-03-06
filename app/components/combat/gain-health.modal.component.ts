import {Component, Input, Inject} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";

import {ModalWindow} from "../modal/modal.service";
import {CombatStats} from "../../entities/state";
import {IAction} from "../../entities/redux";
import {gainHitpoints} from "../../actions/combat.actions";

export const STATS_KEY = 'combatStats';

@Component({
    selector: 'gain-health',
    template: `
<h2>Gain Health</h2>
<form (ngSubmit)="submit()">
    <div>
        <label>
            Hitpoints (current: {{ stats.hitpoints }})
            <input type="number" step="1" min="0" [(ngModel)]="hitpoints" />
        </label>
    </div>
    <div>
        <label>
            Temporary hitpoints (current: {{ stats.temporaryHitpoints || 0 }})
            <input type="number" step="1" min="0" [(ngModel)]="temporaryHitpoints" />
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
export class GainHealthModalComponent {

	public hitpoints: number;
	public temporaryHitpoints: number;

    constructor(
        private modalWindow: ModalWindow<IAction>,
        @Inject(STATS_KEY) public stats: CombatStats
    ) {
    }

    public submit() {
		let action: IAction = gainHitpoints(this.hitpoints, this.temporaryHitpoints);
        this.modalWindow.close(action);
    }

    public close() {
        this.modalWindow.close();
    }
}
