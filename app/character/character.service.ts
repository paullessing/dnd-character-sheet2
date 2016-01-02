import {Injectable} from 'angular2/core';
import {Observable, ReplaySubject, Subject} from 'rxjs/Rx';
import {Character, ICharacter} from "./character";
import {Alignment} from "./alignments";
import {Class} from "./classes";
import * as _ from 'underscore';

/**
 * Service for retrieving and storing Character Data.
 */
@Injectable()
export class CharacterService {
    private _characters: Character[] = [];
    private _subject: ReplaySubject<Character>;

    constructor() {
        this._subject = new ReplaySubject<Character>(1);
        this.addNewState(new Character({
            name: "Aragorn",
            characterClass: Class.Ranger,
            background: "Noble",
            playerName: "JRR Tolkien",
            race: "Human",
            alignment: Alignment.LawfulGood,
            xp: 10000
        }));
    }

    private _notify() {
        this._subject.next(this.currentCharacter);
    }

    public getCharacter(): Observable<Character> {
        return this._subject;
    }

    private addNewState(character: Character) {
        if (this.currentCharacter !== null && this.currentCharacter.equals(character)) {
            return;
        }
        this._characters.push(character);
        this._notify();
    }

    private get currentCharacter(): Character {
        if (this._characters.length === 0) {
            return null;
        }
        return this._characters[this._characters.length - 1];
    }

    // TODO add a dispatcher so we can just listen to update events
    public updateCharacter(newCharacter: ICharacter): void {
        this.addNewState(new Character(newCharacter));
    }

    public storeUpdates() {
        if (!this._characters.length) {
            return;
        }
        var update = _.extend({}, ...this._characters);
        console.log(update); // TODO do something sensible with this
    }
}