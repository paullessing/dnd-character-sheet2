import {Component, OnInit, EventEmitter} from 'angular2/core';
import {Router} from "angular2/router";

import {Names as AbilityNames} from "../../entities/abilities";
import {Skill, SkillData} from "../../entities/skills";

import {AbilitiesRepository} from "../../services/abilities/abilities.repository";
import {AbilityDiff, AbilitiesDiff, AbilitiesActions} from "../../services/abilities/abilitiesActions.service";

import {SkillsRepository} from "../../services/skills/skills.repository";
import {SkillsActions} from "../../services/skills/skillsActions.service";
import {Proficiency} from "../../entities/skills";

/**
 * Component showing basic character details.
 */
@Component({
    templateUrl: 'app/components/edit-abilities/edit-abilities.component.html'
})
export class EditAbilitiesComponent implements OnInit {

    public abilities: {
        name: string,
        value: number,
        isProficientSavingThrow: boolean
    }[];
    public skills: {
        [abilityName: string]: SkillData[]
    };
    public proficiencies = Proficiency.values;

    constructor(
        private _abilitiesRepository: AbilitiesRepository,
        private _skillsRepository: SkillsRepository,
        private _abilitiesActions: AbilitiesActions,
        private _skillsActions: SkillsActions,
        private _router: Router
    ) {
    }

    ngOnInit() {
        let currentAbilities = this._abilitiesRepository.currentAbilities;

        this.abilities = _.map(AbilityNames.values, name => ({
            name: name,
            value: currentAbilities.byName[name].value,
            isProficientSavingThrow: currentAbilities.byName[name].savingThrows.isProficient
        }));

        let currentSkills = this._skillsRepository.currentSkills;

        this.skills = {};
        _.each(currentSkills.toAbilitiesMap(), (skills: Skill[], abilityName: string) => {
            this.skills[abilityName] = (skills || []).map(
                (skill: Skill) => ({
                    name: skill.name,
                    proficiency: skill.proficiency
                })
            );
        });
    }

    public save() {
        let abilities: AbilitiesDiff = {};
        this.abilities.forEach(abilityDiff => abilities[abilityDiff.name] = {
            value: abilityDiff.value,
            isProficientSavingThrow: abilityDiff.isProficientSavingThrow
        });
        this._abilitiesActions.update(abilities);
        this._skillsActions.update(_.flatten(_.toArray(this.skills), true));
        this._router.navigate(['Abilities']);
    }

    public cancel() {
        this._router.navigate(['Abilities']);
    }
}
