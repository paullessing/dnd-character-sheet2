import {Injectable} from "angular2/core";
import {Observable, Subject} from "rxjs/Rx";

import {AbilityData, Abilities, AbilitiesFactory} from "../../entities/abilities";
import {AbilityDataRepository} from "./abilityData.repository";
import {CharacterRepository} from "../character/character.repository";

@Injectable()
export class AbilitiesRepository {
    private _lastAbilities: AbilityData[];
    private _lastProficiencyBonus: number;

    private _currentAbilities: Abilities;
    private _subject: Subject<Abilities>;

    private _abilitiesFactory: AbilitiesFactory;

    constructor(
        private _abilityDataRepository: AbilityDataRepository,
        private _characterRepository: CharacterRepository
    ) {
        this._abilitiesFactory = new AbilitiesFactory();
        this._subject = new Subject();

        this._abilityDataRepository.observable.subscribe(abilityData => {
            this._lastAbilities = abilityData;
            this._update();
        });
        //this._characterRepository.observable.subscribe(character => {
        //    this._lastProficiencyBonus = character.proficiencyBonus;
        //    this._update();
        //});

        //this._lastAbilities = this._abilityDataRepository.currentAbilityData;
        //if (this._characterRepository.currentCharacter) {
        //    this._lastProficiencyBonus = this._characterRepository.currentCharacter.proficiencyBonus;
        //}
        //this._update();
    }

    private _update() {
        if (!this._lastAbilities || typeof this._lastProficiencyBonus !== 'number') {
            return;
        }

        this._currentAbilities = this._abilitiesFactory.getAbilities(this._lastAbilities, this._lastProficiencyBonus);
        this._notify();
    }

    private _notify() {
        this._subject.next(this.currentAbilities);
    }

    public get observable(): Observable<Abilities> {
        return this._subject;
    }

    public get currentAbilities(): Abilities {
        return this._currentAbilities || new Abilities();
    }
}