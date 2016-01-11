import {Injectable} from "angular2/core";
import {Observable, Subject} from "rxjs/Rx";

import {Dispatcher} from "../../common/dispatcher";
import {IPersonality, Personality} from "../../entities/personality";
import {PersonalityEventType} from "./personalityActions.service";

@Injectable()
export class PersonalityRepository {
    private _personalities: Personality[];
    private _subject: Subject<Personality>;
    private _notify: (nextValue: Personality) => void;

    private loadingPromise: Promise<void>;

    constructor(private _dispatcher: Dispatcher) {
        _dispatcher.observable // TODO add filter when it becomes implemented
            .subscribe(update => update.type === PersonalityEventType.UPDATE && this.onUpdate(update.data));

        this._subject = new Subject();
        this.loadingPromise = this.load().then(personalities => {
            this._personalities = personalities || [new Personality({})];
            this._notify();
        });
        console.log("Constructed PersonalityRepository");
    }

    private _notify() {
        this._subject.next(this.currentPersonality);
    }

    private load(): Promise<Personality[]> {
        // TODO actually load
        return Promise.resolve([new Personality({
            traits: "I have traits",
            ideals: "My ideals",
            bonds: "James Bond",
            flaws: "I am flawless"
        })]);
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
            this._personalities.push(personality);
            this.persistUpdate(personality);
            this._notify();

            console.log("Personalities:", this._personalities);
        });
    }

    private persistUpdate(personality: Personality): void {
        // TODO implement, probably async
    }

    /**
     * Returns the current personality value. Might be null if the value is lazy-loaded.
     * @returns {Personality|null}
     */
    public get currentPersonality(): Personality {
        if (!this._personalities || !this._personalities.length) {
            return null;
        } else {
            return this._personalities[this._personalities.length - 1];
        }
    }
}