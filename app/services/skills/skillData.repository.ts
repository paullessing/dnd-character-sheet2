import {Injectable} from "angular2/core";
import {Subscriber, Observable, Subject} from "rxjs/Rx";
import * as _ from 'underscore';

import {Dispatcher, Event} from "../../common/dispatcher";
import {Skills, Skill, SkillData} from "../../entities/skills";
import {SkillsEventType} from "./skillsActions.service";
import {InitialSkills} from "../../entities/skills";

@Injectable()
export class SkillDataRepository {
    private _skills: SkillData[][];
    private _subject: Subject<SkillData[]>;

    private loadingPromise: Promise<void>;

    constructor(
        private _dispatcher: Dispatcher
    ) {
        this._dispatcher.subscribe(SkillsEventType.UPDATE, (data: SkillData[]) => this.update(data));

        this._subject = new Subject();
        this.loadingPromise = this.load().then(skills => {
            this._skills = skills || [];
            this._notify();
            //console.log("SkillDataRepository.construct: Loading promise has resolved with skills:", this._skills);
        });
    }

    private _notify() {
        this._subject.next(this.currentSkillData);
    }

    private load(): Promise<SkillData[][]> {
        // TODO actually load
        let data: SkillData[] = InitialSkills;
        return Promise.resolve([
            data
        ]);
    }

    public get observable(): Observable<SkillData[]> {
        return this._subject;
    }

    private update(data: SkillData[]) {
        // Avoid weird race condition where we try to push onto the array before the async load has finished
        this.loadingPromise
            .then(() => {
                let skillsMap = this.skillDataToMap(data);
                let currentMap = this.skillDataToMap(this.currentSkillData);
                let newData = InitialSkills.map(skill => _.extend({}, skill, currentMap[skill.name], skillsMap[skill.name]));

                console.log("SkillDataRepository.update", "Updated skills", newData);

                this._skills.push(newData);
                this.persistUpdate(newData);
                this._notify();
            });
    }

    private skillDataToMap(data: SkillData[]): { [skillName: string]: SkillData } {
        let skillsMap: { [skillName: string]: SkillData } = {};
        data.forEach(skill => skillsMap[skill.name] = skill);
        return skillsMap;
    }

    private persistUpdate(skills: SkillData[]): void {
        // TODO implement, probably async
    }

    /**
     * Returns the current abilities value. Might be null if the value is lazy-loaded.
     * @returns {Skills|null}
     */
    public get currentSkillData(): SkillData[] {
        if (!this._skills || !this._skills.length) {
            return null;
        } else {
            return this._skills[this._skills.length - 1];
        }
    }
}