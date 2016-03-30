import {Component, OnDestroy} from 'angular2/core';
import {ReduxConnector} from "../../common/connector";

import {Alignment, AlignmentNames} from '../../entities/alignments';
import {Class, ClassNames} from "../../entities/classes";
import {ICharacter, Character} from "../../entities/character";
import {State, Stats} from "../../entities/state";
import {update} from "../../actions/character.actions";
import {addXp} from "../../actions/stats.actions";
import {EditCharacterModalComponent} from "./edit-character-modal.component";
import {Modal} from "../modal/modal.service";

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
    public isChangingXp: boolean;
    public xpChange: number;
    public xpChangeReason: string;

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

    public editXp() {
        this.isChangingXp = true;
        this.xpChange = null;
        this.xpChangeReason = null;
    }

    public submitXp() {
        if (!this.xpChange) {
            return;
        }
        this.redux.dispatch(addXp(this.xpChange, this.xpChangeReason));
        console.log('submitting');
        setTimeout(() => {
            this.isChangingXp = false;
        }, 10);
    }
}
