import {Component, OnDestroy, Injector, provide} from 'angular2/core';

import {ReduxConnector} from "../../common/connector";
import {Router} from "../../common/router.service";

import {Abilities} from "../../entities/abilities";
import {Skill} from "../../entities/skills";
import {State} from "../../entities/state";
import {ModifierPipe} from "../../common/modifier.pipe";
import {EditAbilitiesComponent} from "../edit-abilities/edit-abilities.component";
import {Modal} from "../modal/modal.service";
import {EditProficienciesComponent, PROFICIENCIES_KEY} from "./edit-proficiencies.modal.component";
import {updateProficiencies} from "../../actions/stats.actions";

/**
 * Component showing character abilities.
 */
@Component({
    selector: 'abilities',
    templateUrl: 'app/components/abilities/abilities.component.html',
    pipes: [ModifierPipe],
    directives: [EditAbilitiesComponent]
})
export class AbilitiesComponent implements OnDestroy {
    public abilities: Abilities;
    public skills: { [name: string]: Skill[] };
    public proficiencies: string;
    private unsubscribe: () => void;

    constructor(
        private redux: ReduxConnector,
        private router: Router,
        private modal: Modal
    ) {
        this.unsubscribe = this.redux.connect(state => this.onStateUpdate(state));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private onStateUpdate(state: State) {
        this.abilities = state.stats.abilities;
        this.skills = state.stats.skills.toAbilitiesMap();
        this.proficiencies = state.stats.proficiencies;
    }

    public edit() {
        this.router.navigate(['EditAbilities']);
    }

    public editProficiencies() {
        this.modal.open(EditProficienciesComponent, Injector.resolve([
            provide(PROFICIENCIES_KEY, {
                useValue: this.proficiencies
            })
        ])).then((proficiencies: string) => {
            console.log("Modal result", proficiencies);
            this.redux.dispatch(updateProficiencies(proficiencies));
        });
    }
}
