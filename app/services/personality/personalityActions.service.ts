import {Injectable} from "angular2/core";

import {IPersonality} from "../../entities/personality";
import {Dispatcher, Event} from "../../common/dispatcher";
import {Personality} from "../../entities/personality";

export class PersonalityEventType {
    static UPDATE = 'personality.update';
}

@Injectable()
export class PersonalityActions {

    constructor(
        private _dispatcher: Dispatcher
    ) {}

    public update(data: IPersonality) {
        var event: Event<IPersonality> = {
            type: PersonalityEventType.UPDATE,
            data: data
        }
        this._dispatcher.dispatch(event);
    }
}