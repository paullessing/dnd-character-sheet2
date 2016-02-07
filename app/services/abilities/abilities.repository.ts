import {Injectable} from "angular2/core";
import {Observable, Subject} from "rxjs/Rx";

import {AbilityData, Abilities, AbilitiesFactory} from "../../entities/abilities";
import {AbilityDataRepository} from "./abilityData.repository";

@Injectable()
export class AbilitiesRepository {
    private _lastAbilities: AbilityData[];
    private _lastProficiencyBonus: number;

    private _currentAbilities: Abilities;
    private _subject: Subject<Abilities>;

    private _abilitiesFactory: AbilitiesFactory;

    constructor(
        private _abilityDataRepository: AbilityDataRepository
    ) {
        this._abilitiesFactory = new AbilitiesFactory();
        this._subject = new Subject();

        this._lastProficiencyBonus = 2; // TODO

        this._abilityDataRepository.observable.subscribe(abilityData => {
            this._lastAbilities = abilityData;
            this._update();
        });

        this._lastAbilities = this._abilityDataRepository.currentAbilityData;
        this._update();
        // TODO add a listener for proficiency bonus (character data)
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