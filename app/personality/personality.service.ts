import {Injectable} from 'angular2/core';
import {Personality, PersonalityUpdate} from './personality';
import * as _ from 'underscore';

/**
 * Service for retrieving and storing Personality Traits (traits, ideals, bonds, flaws).
 */
@Injectable()
export class PersonalityService {
    private _personality: Personality;
    private _updates: PersonalityUpdate[] = [];

    getPersonality(): Promise<Personality> {
        // TODO real implementation
        if (!this._personality) {
            this._personality = new Personality("I have traits", "My ideals", "James Bond", "I am flawless");
        }
        return Promise.resolve(this._personality);
    }

    updatePersonality(traits: string, ideals: string, bonds: string, flaws: string): Promise<Personality> {
        return Promise.resolve().then(() => {
            var update: PersonalityUpdate = this._diff(this._personality, {
                traits: traits,
                ideals: ideals,
                bonds: bonds,
                flaws: flaws
            });
            if (!update) {
                return;
            }
            this._updates.push(update);
            this._personality.update(update);
            console.log(this._updates, this._personality);
        }).then(() => this._personality)
        .catch(console.error.bind(console));
    }

    private _diff(personality: Personality, changes: PersonalityUpdate): PersonalityUpdate {
        var result = {};
        var hasDifferences = false;
        ['traits', 'ideals', 'bonds', 'flaws'].forEach(key => {
            if (changes[key] && changes[key] !== personality[key]) {
                result[key] = changes[key];
                hasDifferences = true;
            }
        });
        return hasDifferences ? result : null;
    }

    storeUpdates() {
        if (!this._updates.length) {
            return;
        }
        var update = _.extend({}, ...this._updates);
        console.log(update); // TODO do something sensible with this
    }
}