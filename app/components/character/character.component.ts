import {Component, OnDestroy} from 'angular2/core';
import {ReduxConnector} from "../../common/connector";

import {Alignment, AlignmentNames} from '../../entities/alignments';
import {Class, ClassNames} from "../../entities/classes";
import {ICharacter, Character} from "../../entities/character";
import {State, Stats} from "../../entities/state";
import {update} from "../../actions/character.actions";
import {addXp} from "../../actions/stats.actions";

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'character',
    templateUrl: 'app/components/character/character.component.html',
})
export class CharacterComponent implements OnDestroy {
    // TODO allow multiclassing

    public alignments = AlignmentNames;
    public classes = ClassNames;
    public character: Character;
    public stats: Stats;
    public isEditing: boolean;
    public editCharacter: ICharacter;
    public isChangingXp: boolean;
    public xpChange: number;
    public xpChangeReason: string;

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
        this.character = state.character;
        this.stats = state.stats;
    }

    public edit() {
        this.isEditing = true;
        this.editCharacter = {
            name: this.character.name,
            characterClass: this.character.characterClass,
            background: this.character.background,
            playerName: this.character.playerName,
            race: this.character.race,
            alignment: this.character.alignment
        };
    }

    public save() {
        this.redux.dispatch(update(this.editCharacter));
        setTimeout(() => {
            this.isEditing = false;
        }, 10);
    }

    public cancel() {
        setTimeout(() => {
            this.isEditing = false;
            this.isChangingXp = false;
        }, 10);
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
