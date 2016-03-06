import {Component, OnDestroy} from 'angular2/core';

import {AbilitiesRepository} from "../../services/abilities/abilities.repository";
import {Abilities} from "../../entities/abilities";
import {ModifierPipe} from "../../common/modifier.pipe";
import {Skill} from "../../entities/skills";
import {SkillsRepository} from "../../services/skills/skills.repository";
import {EditAbilitiesComponent} from "../edit-abilities/edit-abilities.component";
import {ReduxConnector} from "../../common/connector";
import {State} from "../../entities/state";
import {Router} from "../../common/router.service";

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
    private unsubscribe: () => void;

    constructor(
        private redux: ReduxConnector,
        private router: Router
    ) {
        this.unsubscribe = this.redux.connect(state => this.onStateUpdate(state));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private onStateUpdate(state: State) {
        this.abilities = state.stats.abilities;
        this.skills = state.stats.skills.toAbilitiesMap();
    }

    public edit() {
        this.router.navigate(['EditAbilities']);
    }
}
