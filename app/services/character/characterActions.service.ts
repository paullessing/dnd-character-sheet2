import {Injectable} from "angular2/core";

import {ICharacter, Character} from "../../entities/character";
import {Dispatcher, Event} from "../../common/dispatcher";

export class CharacterEventType {
    static UPDATE = 'character.update';
    static ADD_XP = 'character.addXp';
}

export interface UpdateXpDetails {
    amount: number;
    reason: string;
}

@Injectable()
export class CharacterActions {

    constructor(
        private _dispatcher: Dispatcher
    ) {}

    public update(data: ICharacter) {
        var event: Event<ICharacter> = {
            type: CharacterEventType.UPDATE,
            data: data
        };
        console.log("Dispatching", event);
        this._dispatcher.dispatch(event);
    }

    public addXp(xp: number, reason: string) {
        var event: Event<UpdateXpDetails> = {
            type: CharacterEventType.ADD_XP,
            data: {
                amount: xp,
                reason: reason
            }
        };
        this._dispatcher.dispatch(event);
    }
}