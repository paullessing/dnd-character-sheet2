import {Injectable} from "angular2/core";
import {Subscriber, Observable, Subject} from "rxjs/Rx";
import * as _ from 'underscore';

import {Dispatcher, Event} from "../../common/dispatcher";
import {ICharacter, Character} from "../../entities/character";
import {CharacterEventType, UpdateXpDetails} from "./characterActions.service";
import {Alignment} from "../../entities/alignments";
import {Class} from "../../entities/classes";

@Injectable()
export class CharacterRepository {
    private _characters: Character[];
    private _subject: Subject<Character>;

    private loadingPromise: Promise<void>;

    constructor(private _dispatcher: Dispatcher) {
        this._dispatcher.subscribe(CharacterEventType.UPDATE, (character: ICharacter) => this.onUpdate(character));
        this._dispatcher.subscribe(CharacterEventType.ADD_XP, (xpUpdate: UpdateXpDetails) => this.onAddXp(xpUpdate));

        this._subject = new Subject();
        this.loadingPromise = this.load().then(characters => {
            this._characters = characters || [new Character({})];
            this._notify();
            console.log("Loading promise has resolved with characters:", this._characters);
        });
    }

    private _notify() {
        let character = this.currentCharacter;
        this._subject.next(character);
    }

    private load(): Promise<Character[]> {
        // TODO actually load
        return Promise.resolve([new Character({
            name: "Aragorn",
            characterClass: Class.Ranger,
            background: "Noble",
            playerName: "JRR Tolkien",
            race: "Human",
            alignment: Alignment.LawfulGood,
            xp: 10000
        })]);
    }

    public get observable(): Observable<Character> {
        return this._subject;
    }

    private onUpdate(data: ICharacter): void {
        var character = new Character(data);
        this.update(character);
    }

    private update(character: Character) {
        // Avoid weird race condition where we try to push onto the array before the async load has finished
        this.loadingPromise
            .then(() => {
                if (this.currentCharacter && this.currentCharacter.equals(character)) {
                    return;
                }
                this._characters.push(character);
                this.persistUpdate(character);
                this._subject.next(character);

                console.log("Personalities:", this._characters);
            });
    }

    private onAddXp(data: UpdateXpDetails) {
        var character = this.editCharacter(this.currentCharacter, { xp: this.currentCharacter.xp + data.amount});
        this.update(character);
    }

    private editCharacter(character: ICharacter, edits: ICharacter): Character {
        return new Character(_.extend({
            name: character.name,
            characterClass: character.characterClass,
            background: character.background,
            playerName: character.playerName,
            race: character.race,
            alignment: character.alignment,
            xp: character.xp
        }, edits));
    }

    private persistUpdate(character: Character): void {
        // TODO implement, probably async
    }

    /**
     * Returns the current personality value. Might be null if the value is lazy-loaded.
     * @returns {Personality|null}
     */
    public get currentCharacter(): Character {
        if (!this._characters || !this._characters.length) {
            return null;
        } else {
            return this._characters[this._characters.length - 1];
        }
    }
}