import {Component, OnDestroy} from 'angular2/core';
import {Personality} from "../../entities/personality";
import {ReduxConnector} from "../../common/connector";
import {State} from "../../entities/state";
import {EditPersonalityComponent} from "./edit-personality.component";
import {Modal} from "../modal/modal.service";
import {EditPersonalityModalComponent} from "./edit-personality-modal.component";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'personality',
    templateUrl: 'app/components/personality/personality.component.html',
    directives: [EditPersonalityComponent]
})
export class PersonalityComponent implements OnDestroy {
    public personality: Personality;
    private unsubscribe: () => void;

    constructor(
        private redux: ReduxConnector,
        private modal: Modal
    ) {
        this.unsubscribe = this.redux.connect((state: State) => this.onStateUpdate(state));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private onStateUpdate(state: State) {
        this.personality = state.personality;
    }

    public edit() {
        this.modal.open(EditPersonalityModalComponent);
    }
}
