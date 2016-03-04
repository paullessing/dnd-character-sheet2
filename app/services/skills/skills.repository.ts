import {Injectable} from "angular2/core";
import {Subject, Observable} from "rxjs/Rx";

import {Skills, SkillData, loadSkills} from "../../entities/skills";
import {Abilities} from "../../entities/abilities";
import {SkillDataRepository} from "./skillData.repository";
import {AbilitiesRepository} from "../abilities/abilities.repository";
import {CharacterRepository} from "../character/character.repository";

@Injectable()
export class SkillsRepository {

    private _lastAbilities: Abilities;
    private _lastSkillData: SkillData[];
    private _lastProficiencyBonus: number = null;

    private _currentSkills: Skills;
    private _subject: Subject<Skills>;

    constructor(
        private _skillDataRepository: SkillDataRepository,
        private _abilitiesRepository: AbilitiesRepository,
        private _characterRepository: CharacterRepository
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
        this._characterRepository.observable.subscribe(character => {
            //this._lastProficiencyBonus = character.proficiencyBonus;
            this.pushUpdate();
        });

        this._lastAbilities = this._abilitiesRepository.currentAbilities;
        this._lastSkillData = this._skillDataRepository.currentSkillData;
        let character = this._characterRepository.currentCharacter;
        if (character) {
            //this._lastProficiencyBonus = character.proficiencyBonus;
        }
        this.pushUpdate();
    }

    public get observable(): Observable<Skills> {
        return this._subject;
    }

    private pushUpdate(): void {
        if (!this._lastAbilities || !this._lastAbilities.length ||
            !this._lastSkillData ||
            this._lastProficiencyBonus === null) {
            return;
        }
        this._currentSkills = loadSkills(this._lastAbilities, this._lastSkillData, this._lastProficiencyBonus);
        this._subject.next(this._currentSkills);
    }

    public get currentSkills(): Skills {
        return this._currentSkills || new Skills([]);
    }
}