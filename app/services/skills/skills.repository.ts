import {Injectable} from "angular2/core";
import {Subject, Observable} from "rxjs/Subject";

import {Skills, SkillData, loadSkills} from "../../entities/skills";
import {Abilities} from "../../entities/abilities";
import {SkillDataRepository} from "./skillData.repository";
import {AbilitiesRepository} from "../abilities/abilities.repository";

@Injectable()
export class SkillsRepository {

    private _lastAbilities: Abilities;
    private _lastSkillData: SkillData[];

    private _currentSkills: Skills;
    private _subject: Subject<Skills>;

    constructor(
        private _skillDataRepository: SkillDataRepository,
        private _abilitiesRepository: AbilitiesRepository
    ) {
        this._subject = new Subject();

        this._skillDataRepository.observable.subscribe(skillData => {
            this._lastSkillData = skillData || [];
            this.pushUpdate();
        });
        this._abilitiesRepository.observable.subscribe(abilities => {
            this._lastAbilities = abilities;
            this.pushUpdate();
        });

        this._lastAbilities = this._abilitiesRepository.currentAbilities;
        this._lastSkillData = this._skillDataRepository.currentSkillData;
        this.pushUpdate();
    }

    public get observable(): Observable<Skills> {
        return this._subject;
    }

    private pushUpdate(): void {
        if (!this._lastAbilities || !this._lastAbilities.length || !this._lastSkillData) {
            return;
        }
        this._currentSkills = loadSkills(this._lastAbilities, this._lastSkillData);
        this._subject.next(this._currentSkills);
    }

    public get currentSkills(): Skills {
        return this._currentSkills || new Skills([]);
    }
}