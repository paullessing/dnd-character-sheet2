import {Injectable} from 'angular2/core';
import {Personality} from './personality';

/**
 * Service for retrieving and storing Personality Traits (traits, ideals, bonds, flaws).
 */
@Injectable()
export class PersonalityService {
    private _personality;

    getPersonality(): Promise<Personality> {
        // TODO real implementation
        if (!this._personality) {
            this._personality = new Personality("I have traits", "My ideals", "James Bond", "I am flawless");
        }
        return Promise.resolve(this._personality);
    }
}