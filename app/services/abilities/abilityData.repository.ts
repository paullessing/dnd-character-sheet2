import {Injectable} from "angular2/core";
import {Subscriber, Observable, Subject} from "rxjs/Rx";
import * as _ from 'underscore';

import {Dispatcher, Event} from "../../common/dispatcher";
import {AbilityData} from "../../entities/abilities";
import {AbilitiesEventType, AbilitiesDiff} from "./abilitiesActions.service";
import {StorageService} from "../storage/storage.service";

export const STORAGE_KEY = 'abilities';

@Injectable()
export class AbilityDataRepository {
    private _abilityData: AbilityData[];
    private _subject: Subject<AbilityData[]>;

    private loadingPromise: Promise<void>;

    constructor(
        private _dispatcher: Dispatcher,
        private _storageService: StorageService
    ) {
        this._dispatcher.subscribe(AbilitiesEventType.UPDATE, (data: AbilitiesDiff) => this.update(data));

        this._subject = new Subject();
        this.loadingPromise = this.load().then((abilityData: AbilityData[]) => {
            this._abilityData = abilityData || [];
            this._notify();
            //console.log("AbilityDataRepository.construct", "Loading promise has resolved with abilityDatas:", this._abilityDatas);
        });
    }

    private _notify() {
        this._subject.next(this.currentAbilityData);
    }

    private load(): Promise<AbilityData[]> {
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
        return Promise.resolve(
            this._storageService.get(STORAGE_KEY) || data
        );
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

                this._abilityData = newData;
                this.persistUpdate(newData);
                this._notify();
            });
    }

    private persistUpdate(abilityData: AbilityData[]): void {
        this._storageService.set(STORAGE_KEY, abilityData);
    }

    /**
     * Returns the current abilities value. Might be null if the value is lazy-loaded.
     * @returns {AbilityData[]|null}
     */
    public get currentAbilityData(): AbilityData[] {
        return this._abilityData;
    }
}