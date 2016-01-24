import {Injectable} from "angular2/core";
import {Observable, Subject} from "rxjs/Rx";

import {Dispatcher} from "../../common/dispatcher";
import {IPersonality, Personality} from "../../entities/personality";
import {PersonalityEventType} from "./personalityActions.service";
import {StorageService} from "../storage/storage.service";

export const STORAGE_KEY = 'personality';

@Injectable()
export class PersonalityRepository {

    private _currentPersonality: Personality;
    private _subject: Subject<Personality>;

    private loadingPromise: Promise<void>;

    constructor(
        private _dispatcher: Dispatcher,
        private _storageService: StorageService
    ) {
        _dispatcher.observable // TODO add filter when it becomes implemented
            .subscribe(update => update.type === PersonalityEventType.UPDATE && this.onUpdate(update.data));

        this._subject = new Subject();
        this.loadingPromise = this.load().then((personality: Personality) => {
            this._currentPersonality = personality;
            this._notify();
        });
        console.log("Constructed PersonalityRepository");
    }

    private _notify() {
        this._subject.next(this.currentPersonality);
    }

    private load(): Promise<Personality> {
        return Promise.resolve(
            this._storageService.get(STORAGE_KEY) ||
            new Personality({
                traits: "I have traits",
                ideals: "My ideals",
                bonds: "James Bond",
                flaws: "I am flawless"
            })
        );
    }

    public get observable(): Observable<Personality> {
        return this._subject;
    }

    private onUpdate(data: IPersonality): void {
        var personality = new Personality(data);
        // Avoid weird race condition where we try to push onto the array before the async load has finished
        this.loadingPromise
        .then(() => {
            if (this.currentPersonality && this.currentPersonality.equals(personality)) {
                return;
            }
            this._currentPersonality = personality;
            this.persistUpdate(personality);
            this._notify();
        });
    }

    private persistUpdate(personality: Personality): void {
        this._storageService.set(STORAGE_KEY, personality);
    }

    /**
     * Returns the current personality value. Might be null if the value is lazy-loaded.
     * @returns {Personality|null}
     */
    public get currentPersonality(): Personality {
        return this._currentPersonality;
    }
}