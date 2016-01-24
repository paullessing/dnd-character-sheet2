import {Injectable} from "angular2/core";
import * as _ from "underscore";

@Injectable()
export class StorageService {
    private context: string;

    constructor() {
        if (!localStorage) {
            throw new Error('Cannot run without local storage!');
        }
        // TODO fallbacks
        // TODO factory
        // TODO session storage
        // TODO tests
    }

    public set<T>(key: string, value: T): void {
        localStorage.setItem(this.getKey(key), JSON.stringify(value)); // TODO handle circular references
    }

    public get<T>(key: string): T {
        let value = localStorage.getItem(this.getKey(key));
        console.log(`Fetching ${key}, result is`, value);
        if (typeof value === 'undefined' || value === null) {
            return null;
        }
        try {
            return JSON.parse(value);
        } catch (e) {
            console.warn(`Error caught attempting to read key "${key}", ignoring value. Error was:`, e);
            return null;
        }
    }

    private getKey(key: string) {
        return this.context ? this.context + '--' + key : key;
    }
}