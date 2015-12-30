import {Injectable} from 'angular2/core';
import {Observable, ReplaySubject, Subject} from 'rxjs/Rx';
import {Personality, IPersonality} from './personality';
import * as _ from 'underscore';

/**
 * Service for retrieving and storing Personality Traits (traits, ideals, bonds, flaws).
 */
@Injectable()
export class PersonalityService {
    private _personalities: Personality[] = [];
    private _subject: ReplaySubject<Personality>;

    constructor() {
        this._subject = new ReplaySubject<Personality>(1);
        this.addNewState(new Personality({
            traits: "I have traits",
            ideals: "My ideals",
            bonds: "James Bond",
            flaws: "I am flawless"
        }));
    }

    private _notify() {
        this._subject.next(this.currentPersonality);
    }

    public getPersonality(): Observable<Personality> {
        return this._subject;
    }

    private addNewState(personality: Personality) {
        if (this.currentPersonality !== null && this.currentPersonality.equals(personality)) {
            return;
        }
        this._personalities.push(personality);
        this._notify();
    }

    private get currentPersonality(): Personality {
        if (this._personalities.length === 0) {
            return null;
        }
        return this._personalities[this._personalities.length - 1];
    }

    // TODO add a dispatcher so we can just listen to update events
    public updatePersonality(newPersonality: IPersonality): void {
        this.addNewState(new Personality(newPersonality));
    }

    public storeUpdates() {
        if (!this._personalities.length) {
            return;
        }
        var update = _.extend({}, ...this._personalities);
        console.log(update); // TODO do something sensible with this
    }
}