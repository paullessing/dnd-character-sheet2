import {Injectable} from "angular2/core";
import {Subscriber, Observable, Subject} from "rxjs/Rx";
import * as _ from 'underscore';

import {Dispatcher, Event} from "../../common/dispatcher";
import {AbilitiesEventType, AbilitiesDiff} from "./abilitiesActions.service";
import {Ability, Abilities, AbilitiesFactory, Names as AbilityNames} from "../../entities/abilities";

@Injectable()
export class AbilitiesRepository {
    private _abilities: Abilities[];
    private _subject: Subject<Abilities>;

    private loadingPromise: Promise<void>;

    private _abilitiesFactory: AbilitiesFactory;

    constructor(
        private _dispatcher: Dispatcher
    ) {
        this._abilitiesFactory = new AbilitiesFactory();

        this._dispatcher.subscribe(AbilitiesEventType.UPDATE, (diff: AbilitiesDiff) => this.update(diff));

        this._subject = new Subject();
        this.loadingPromise = this.load().then(abilities => {
            this._abilities = abilities || [this._abilitiesFactory.getAbilities([], 2)];
            this._notify();
            console.log("Loading promise has resolved with abilities:", this._abilities);
        });
    }

    private _notify() {
        this._subject.next(this.currentAbilities);
    }

    private load(): Promise<Abilities[]> {
        // TODO actually load
        return Promise.resolve([
            this._abilitiesFactory.getAbilities([], 2)
        ]);
    }

    public get observable(): Observable<Abilities> {
        return this._subject;
    }

    private update(diff: AbilitiesDiff) {
        // Avoid weird race condition where we try to push onto the array before the async load has finished
        this.loadingPromise
            .then(() => {
                if (!Object.keys(diff).length) {
                    return;
                }
                let oldAbilities = this.currentAbilities;
                let newAbilities: { [name: string]: Ability } = {};
                for (let id in AbilityNames) {
                    let abilityName = AbilityNames[id];
                    if (diff[id]) {
                        newAbilities[id] = new Ability(
                            abilityName,
                            diff[id].value,
                            diff[id].isProficientSavingThrow
                        );
                    } else {

                    }
                }
                let abilities = new Abilities(
                    newAbilities[AbilityNames.Strength],
                    newAbilities[AbilityNames.Dexterity],
                    newAbilities[AbilityNames.Constitution],
                    newAbilities[AbilityNames.Intelligence],
                    newAbilities[AbilityNames.Wisdom],
                    newAbilities[AbilityNames.Charisma]
                );

                this._abilities.push(abilities);
                this.persistUpdate(abilities);
                this._notify();
            });
    }

    private persistUpdate(abilities: Abilities): void {
        // TODO implement, probably async
    }

    /**
     * Returns the current abilities value. Might be null if the value is lazy-loaded.
     * @returns {Abilities|null}
     */
    public get currentAbilities(): Abilities {
        if (!this._abilities || !this._abilities.length) {
            return null;
        } else {
            return this._abilities[this._abilities.length - 1];
        }
    }
}