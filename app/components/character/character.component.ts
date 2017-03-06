import {Component, OnDestroy} from "angular2/core";
import {ReduxConnector} from "../../common/connector";
import {Character} from "../../entities/character";
import {State, Stats} from "../../entities/state";
import {addXp} from "../../actions/stats.actions";
import {EditCharacterModalComponent} from "./edit-character-modal.component";
import {Modal} from "../modal/modal.service";
import {AddXpModalComponent, XP_KEY, AddXpDetails} from "./add-xp.modal.component";

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'character',
    templateUrl: 'app/components/character/character.component.html',
})
export class CharacterComponent implements OnDestroy {
    // TODO allow multiclassing

    public character: Character;
    public stats: Stats;

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
        this.character = state.character;
        this.stats = state.stats;
    }

    public edit() {
        this.modal.open(EditCharacterModalComponent);
    }

    public addXp() {
        this.modal.open(AddXpModalComponent, {
            [XP_KEY]: this.stats.xp
        }).then((details: AddXpDetails) => {
            if (details) {
                this.redux.dispatch(addXp(details.amount, details.reason));
            }
        });
    }
}
