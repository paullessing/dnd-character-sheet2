import {Injectable} from "angular2/core";
import {Subscriber, Observable, Subject} from "rxjs/Rx";
import * as _ from 'underscore';

import {Dispatcher, Event} from "../../common/dispatcher";
import {AbilityData} from "../../entities/abilities";
import {AbilitiesEventType, AbilitiesDiff} from "./abilitiesActions.service";

@Injectable()
export class AbilityDataRepository {
    private _abilityDatas: AbilityData[][];
    private _subject: Subject<AbilityData[]>;

    private loadingPromise: Promise<void>;

    constructor(
        private _dispatcher: Dispatcher
    ) {
        this._dispatcher.subscribe(AbilitiesEventType.UPDATE, (data: AbilitiesDiff) => this.update(data));

        this._subject = new Subject();
        this.loadingPromise = this.load().then(abilityDatas => {
            this._abilityDatas = abilityDatas || [];
            this._notify();
            //console.log("AbilityDataRepository.construct", "Loading promise has resolved with abilityDatas:", this._abilityDatas);
        });
    }

    private _notify() {
        this._subject.next(this.currentAbilityData);
    }

    private load(): Promise<AbilityData[][]> {
        // TODO actually load
        let data: AbilityData[] = [
            {
                name: 'Strength',
                value: 16,
                isProficientSavingThrow: true
            },
            {
                name: 'Dexterity',
                value: 13,
                isProficientSavingThrow: false
            },
            {
                name: 'Constitution',
                value: 12,
                isProficientSavingThrow: false
            },
            {
                name: 'Intelligence',
                value: 15,
                isProficientSavingThrow: false
            },
            {
                name: 'Wisdom',
                value: 10,
                isProficientSavingThrow: true
            },
            {
                name: 'Charisma',
                value: 8,
                isProficientSavingThrow: false
            }
        ];
        return Promise.resolve([
            data
        ]);
    }

    public get observable(): Observable<AbilityData[]> {
        return this._subject;
    }

    private update(diff: AbilitiesDiff) {
        // Avoid weird race condition where we try to push onto the array before the async load has finished
        this.loadingPromise
            .then(() => {
                let newData = this.currentAbilityData.map((abilityData: AbilityData) => {
                    return diff[abilityData.name] ? _.extend({}, abilityData, diff[abilityData.name]) : abilityData;
                });

                this._abilityDatas.push(newData);
                this.persistUpdate(newData);
                this._notify();
            });
    }

    private persistUpdate(skills: AbilityData[]): void {
        // TODO implement, probably async
    }

    /**
     * Returns the current abilities value. Might be null if the value is lazy-loaded.
     * @returns {Skills|null}
     */
    public get currentAbilityData(): AbilityData[] {
        if (!this._abilityDatas || !this._abilityDatas.length) {
            return null;
        } else {
            return this._abilityDatas[this._abilityDatas.length - 1];
        }
    }
}