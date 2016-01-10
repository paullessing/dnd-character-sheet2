import {Dispatcher} from "../common/dispatcher";
import {PersonalityEventType} from "./personalityActions.service";
import {IPersonality, Personality} from "./personality";
import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/Rx";

@Injectable()
export class PersonalityRepository {
    private _personalities: Personality[];
    private _observable: Observable<Personality>;
    private _notify: (nextValue: Personality) => void;

    private loadingPromise: Promise<void>;

    constructor(private _dispatcher: Dispatcher) {
        _dispatcher.observable.filter(event => event.type === PersonalityEventType.UPDATE)
        .subscribe(update => this.onUpdate(update.data));

        this._observable = new Observable(describe => {
            this._notify = (nextValue: Personality) => describe.next(nextValue);
            if (this.currentPersonality) {
                this._notify(this.currentPersonality);
            }
        });
        this.loadingPromise = this.load().then(personalities => {
            this._personalities = personalities || [new Personality({})];
            if (this._notify) {
                this._notify(this.currentPersonality);
            }
            console.log("Loading promise has resolved", this._personalities.length);
        });
        console.log("Constructor done");
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
        return this._observable;
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
            this._notify(personality);

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