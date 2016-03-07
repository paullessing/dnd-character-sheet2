import {Component, EventEmitter} from 'angular2/core';

import {Names as AbilityNames} from "../../entities/abilities";
import {Skill, SkillData} from "../../entities/skills";

import {Proficiency} from "../../entities/skills";
import {AbilityData} from "../../entities/abilities";
import {ReduxConnector} from "../../common/connector";
import {Abilities} from "../../entities/abilities";
import {updateStats} from "../../actions/stats.actions";
import {AbilitiesDiff} from "../../actions/stats.actions";
import {Router} from "../../common/router.service";

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'edit-abilities',
    templateUrl: 'app/components/edit-abilities/edit-abilities.component.html'
})
export class EditAbilitiesComponent {

    public abilities: AbilityData[];
    public skills: {
        [abilityName: string]: SkillData[]
    };
    public proficiencies = Proficiency.values;

    constructor(
        private redux: ReduxConnector,
        private router: Router
    ) {
        let state = this.redux.getState();
        let currentAbilities: Abilities = state.stats.abilities;

        this.abilities = _.map(AbilityNames.values, name => ({
            name: name,
            value: currentAbilities.byName[name].value,
            isProficientSavingThrow: currentAbilities.byName[name].savingThrows.isProficient
        }));

        let currentSkills = state.stats.skills;

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
        let skills: SkillData[] = _.flatten(_.toArray(this.skills), true);
        this.redux.dispatch(updateStats(abilities, skills))

        this.router.navigate(['Abilities']);
    }

    public cancel() {
        this.router.navigate(['Abilities']);
    }
}
