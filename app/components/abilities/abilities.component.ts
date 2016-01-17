import {Component, OnInit} from 'angular2/core';

import {AbilitiesRepository} from "../../services/abilities/abilities.repository";
import {Abilities} from "../../entities/abilities";
import {ModifierPipe} from "../../common/modifier.pipe";
import {Skill} from "../../entities/skills";
import {SkillsRepository} from "../../services/skills/skills.repository";

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'abilities',
    templateUrl: 'app/components/abilities/abilities.component.html',
    pipes: [ModifierPipe]
})
export class AbilitiesComponent implements OnInit{
    public abilities: Abilities;
    public skills: { [name: string]: Skill[] };

    constructor(
        private _abilitiesRepository: AbilitiesRepository,
        private _skillsRepository: SkillsRepository
    ) {
    }

    ngOnInit() {
        this.abilities = this._abilitiesRepository.currentAbilities;
        this._abilitiesRepository.observable.subscribe(abilities => {
            this.abilities = abilities;
            console.log("Updated abilities", abilities);
        });
        this.skills = this._skillsRepository.currentSkills.toAbilitiesMap();
        this._skillsRepository.observable.subscribe(skills => {
            this.skills = skills.toAbilitiesMap();
        });
        console.log("Initialised abilities component");
    }
}
