import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Personality, IPersonality} from './personality';
import * as _ from 'underscore';

/**
 * Service for retrieving and storing Personality Traits (traits, ideals, bonds, flaws).
 */
@Injectable()
export class PersonalityService {
    private _personalities: Personality[] = [];
    private _observable: Observable<Personality>;
    private _notify: () => void;

    getPersonality(): Observable<Personality> {
        if (this._observable) {
            return this._observable;
        }
        this._observable = new Observable(observer => {
            this._notify = () => observer.next(this.currentPersonality);
        });
        Promise.resolve().then(() => {
            // TODO real implementation
            this.addNewState(new Personality("I have traits", "My ideals", "James Bond", "I am flawless"));
        });
        return this._observable;
    }

    private addNewState(personality: Personality) {
        this._personalities.push(personality);
        this._notify();
    }

    private get currentPersonality(): Personality {
        return this._personalities[this._personalities.length - 1];
    }

    // TODO add a dispatcher so we can just listen to update events
    updatePersonality(newPersonality: IPersonality): void {
        this.addNewState(new Personality(newPersonality));
    }

    storeUpdates() {
        if (!this._personalities.length) {
            return;
        }
        var update = _.extend({}, ...this._personalities);
        console.log(update); // TODO do something sensible with this
    }
}