import {Component, OnInit} from 'angular2/core';
import {Router} from "angular2/router";

import {AbilitiesRepository} from "../../services/abilities/abilities.repository";
import {Abilities} from "../../entities/abilities";
import {Skill} from "../../entities/skills";
import {SkillsRepository} from "../../services/skills/skills.repository";
import {EditAbilitiesComponent} from "../edit-abilities/edit-abilities.component";

/**
 * Component showing basic character details.
 */
@Component({
    templateUrl: 'app/components/abilities/abilities.component.html',
    directives: [EditAbilitiesComponent]
})
export class AbilitiesComponent implements OnInit{
    public abilities: Abilities;
    public skills: { [name: string]: Skill[] };

    constructor(
        private _abilitiesRepository: AbilitiesRepository,
        private _skillsRepository: SkillsRepository,
        private _router: Router
    ) {
    }

    ngOnInit() {
        this.abilities = this._abilitiesRepository.currentAbilities;
        this._abilitiesRepository.observable.subscribe(abilities => {
            this.abilities = abilities;
            console.log("AbilitiesComponent.init", "Updated abilities", abilities);
        });
        this.skills = this._skillsRepository.currentSkills.toAbilitiesMap();
        this._skillsRepository.observable.subscribe(skills => {
            this.skills = skills.toAbilitiesMap();
            console.log("AbilitiesComponent.init", "Updated skills", this.skills);
        });
        console.log("Initialised abilities component");
    }

    public edit() {
        this._router.navigate(['EditAbilities']);
    }
}
