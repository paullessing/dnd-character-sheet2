import {Component, Inject} from "angular2/core";
import {FORM_DIRECTIVES} from "angular2/common";

import {ReduxConnector} from "../../common/connector";
import {ModalWindow} from "../modal/modal.service";
import {HistoryGroup} from "../../entities/state";
import {changeGroup} from "../../actions/history.actions";

@Component({
    selector: 'edit-history-group-modal',
    template: `
<h1>Edit History Group</h1>
<form (ngSubmit)="submit()">
    <div>
        <label>
            Name<br />
            <input [(ngModel)]="name" />
        </label>
    </div>
    <div>
        <label>
            Description<br />
            <textarea [(ngModel)]="description"></textarea>
        </label>
    </div>
    <div>
        <button type="submit">Save</button>
        <a (click)="close()" href="javascript:void(0)">Cancel</a>
    </div>
</form>
`,
    directives: [FORM_DIRECTIVES]
})
export class EditHistoryGroupModalComponent {
    public name: string;
    public description: string;

    constructor(
        private redux: ReduxConnector,
        private modalWindow: ModalWindow<{ name: string, description: string }>,
        @Inject('historyGroupId') private id: number
    ) {
        let group = redux.getFullState().history.find(group => group.id === id);
        this.name = group.name;
        this.description = group.description;
    }

    public submit() {
        this.redux.dispatch(changeGroup(this.id, this.name, this.description));
        this.modalWindow.close({ name: this.name, description: this.description })
    }

    public close() {
        this.modalWindow.close();
    }
}