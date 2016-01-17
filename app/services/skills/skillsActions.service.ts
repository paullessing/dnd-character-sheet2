import {Injectable} from "angular2/core";

import {Dispatcher, Event, EventType} from "../../common/dispatcher";
import {SkillData} from "../../entities/skills";

export class SkillsEventType {
    static UPDATE: EventType = 'skills.update';
}

@Injectable()
export class SkillsActions {

    constructor(
        private _dispatcher: Dispatcher
    ) {}

    public update(data: SkillData[]) {
        var event: Event<SkillData[]> = {
            type: SkillsEventType.UPDATE,
            data: data
        };
        console.log("Dispatching", event);
        this._dispatcher.dispatch(event);
    }
}