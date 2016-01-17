import {Injectable} from "angular2/core";
import {Subscriber, Observable, Subject} from "rxjs/Rx";
import * as _ from 'underscore';

import {Dispatcher, Event} from "../../common/dispatcher";
import {Skills, Skill, loadSkills, SkillData} from "../../entities/skills";
import {SkillsEventType} from "./skillsActions.service";
import {Abilities} from "../../entities/abilities";
import {AbilitiesRepository} from "../abilities/abilities.repository";

@Injectable()
export class SkillsRepository {
    private _skills: Skills[];
    private _subject: Subject<Skills>;

    private loadingPromise: Promise<void>;

    constructor(
        private _dispatcher: Dispatcher,
        private _abilitiesRepository: AbilitiesRepository
    ) {
        this._dispatcher.subscribe(SkillsEventType.UPDATE, (data: SkillData[]) => this.update(data));
        this._abilitiesRepository.observable.subscribe(abilities => this.onChangeAbilities(abilities));

        this._subject = new Subject();
        this.loadingPromise = this.load().then(skills => {
            this._skills = skills || [loadSkills([])];
            this._notify();
            console.log("Loading promise has resolved with skills:", this._skills);
        });
    }

    private _notify() {
        this._subject.next(this.currentSkills);
    }

    private load(): Promise<Skills[]> {
        // TODO actually load
        return Promise.resolve([
            loadSkills([])
        ]);
    }

    public get observable(): Observable<Skills> {
        return this._subject;
    }

    private update(data: SkillData[]) {
        // Avoid weird race condition where we try to push onto the array before the async load has finished
        this.loadingPromise
            .then(() => {
                let skillsMap = {};
                this.data.forEach(skill => skillsMap[skill.name] = skill);
                let newSkills: Skills = new Skills(this.currentSkills.map((skill: Skill) => {
                    const skillData: SkillData = skillsMap[skill.name];
                    if (!skillData) {
                        return skill;
                    } else {
                        return new Skill(skill.name, skillData.proficiency, skill.modifier, skill.abilityName);
                    }
                }));

                this._skills.push(newSkills);
                this.persistUpdate(newSkills);
                this._notify();
            });
    }

    private onChangeAbilities(abilities: Abilities) {
        this.loadingPromise
            .then(() => {
                let newSkills = loadSkills(abilities, this.currentSkills);

                this._skills.push(newSkills);
                this.persistUpdate(newSkills);
                this._notify();
            });
    }

    private persistUpdate(skills: Skills): void {
        // TODO implement, probably async
    }

    /**
     * Returns the current abilities value. Might be null if the value is lazy-loaded.
     * @returns {Skills|null}
     */
    public get currentSkills(): Skills {
        if (!this._skills || !this._skills.length) {
            return null;
        } else {
            return this._skills[this._skills.length - 1];
        }
    }
}