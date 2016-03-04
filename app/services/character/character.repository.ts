import {Injectable} from "angular2/core";
import {Subscriber, Observable, Subject} from "rxjs/Rx";
import * as _ from 'underscore';

import {Dispatcher, Event} from "../../common/dispatcher";
import {ICharacter, Character} from "../../entities/character";
import {CharacterEventType, UpdateXpDetails} from "./characterActions.service";
import {Alignment} from "../../entities/alignments";
import {Class} from "../../entities/classes";
import {StorageService} from "../storage/storage.service";

export const STORAGE_KEY = 'character';

@Injectable()
export class CharacterRepository {
    private _character: Character;
    private _subject: Subject<Character>;

    private loadingPromise: Promise<void>;

    constructor(
        private _dispatcher: Dispatcher,
        private _storageService: StorageService
    ) {
        this._dispatcher.subscribe(CharacterEventType.UPDATE, (character: ICharacter) => this.onUpdate(character));
        this._dispatcher.subscribe(CharacterEventType.ADD_XP, (xpUpdate: UpdateXpDetails) => this.onAddXp(xpUpdate));

        this._subject = new Subject();
        this.loadingPromise = this.load().then((character: Character) => {
            this._character = character || new Character({});
            this._notify();
            console.log("Loading promise has resolved with character:", this._character);
        });
    }

    private _notify() {
        let character = this.currentCharacter;
        this._subject.next(character);
    }

    private load(): Promise<Character> {
        // TODO actually load
        return Promise.resolve(new Character(this._storageService.get(STORAGE_KEY) || {
            name: "Aragorn",
            characterClass: Class.Ranger,
            background: "Noble",
            playerName: "JRR Tolkien",
            race: "Human",
            alignment: Alignment.LawfulGood
        }));
    }

    public get observable(): Observable<Character> {
        return this._subject;
    }

    private onUpdate(data: ICharacter): void {
        let character = new Character(data);
        this.update(character);
    }

    private update(character: Character) {
        // Avoid weird race condition where we try to push onto the array before the async load has finished
        this.loadingPromise
            .then(() => {
                if (this.currentCharacter && this.currentCharacter.equals(character)) {
                    return;
                }
                this._character = character;
                this.persistUpdate(character);
                this._notify();

                console.log("Character:", this._character);
            });
    }

    private onAddXp(data: UpdateXpDetails) {
        //let character = this.editCharacter(this.currentCharacter, { xp: this.currentCharacter.xp + data.amount});
        //this.update(character);
    }

    private editCharacter(character: ICharacter, edits: ICharacter): Character {
        return new Character(_.extend({
            name: character.name,
            characterClass: character.characterClass,
            background: character.background,
            playerName: character.playerName,
            race: character.race,
            alignment: character.alignment
        }, edits));
    }

    private persistUpdate(character: Character): void {
        this._storageService.set(STORAGE_KEY, character.getData());
    }

    /**
     * Returns the current personality value. Might be null if the value is lazy-loaded.
     * @returns {Character|null}
     */
    public get currentCharacter(): Character {
        return this._character;
    }
}