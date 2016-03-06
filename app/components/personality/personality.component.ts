import {Component, OnDestroy} from 'angular2/core';
import {Personality, IPersonality} from "../../entities/personality";
import {ReduxConnector} from "../../common/connector";
import {State} from "../../entities/state";
import {update} from "../../actions/personality.actions";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'personality',
    templateUrl: 'app/components/personality/personality.component.html'
})
export class PersonalityComponent implements OnDestroy {
    public personality: IPersonality;
    public editPersonality: IPersonality;
    public isEditing: boolean;
    private unsubscribe: () => void;

    constructor(
        private redux: ReduxConnector
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
        this.editPersonality = {
            traits: this.personality.traits,
            ideals: this.personality.ideals,
            bonds: this.personality.bonds,
            flaws: this.personality.flaws
        };
        this.isEditing = true;
    }

    public save() {
        this.redux.dispatch(update(this.editPersonality));
        this.isEditing = false;
    }

    public cancel() {
        this.isEditing = false;
    }
}
