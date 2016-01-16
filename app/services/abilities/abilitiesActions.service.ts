import {Injectable} from "angular2/core";

import {Dispatcher, Event, EventType} from "../../common/dispatcher";

export class AbilitiesEventType {
    static UPDATE: EventType = 'abilities.update';
}

export interface AbilityDiff {
    value: number;
    isProficientSavingThrow: boolean;
}

export interface AbilitiesDiff {
    [name: string]: AbilityDiff
}

@Injectable()
export class AbilitiesActions {

    constructor(
        private _dispatcher: Dispatcher
    ) {}

    public update(diff: AbilitiesDiff) {
        var event: Event<AbilitiesDiff> = {
            type: AbilitiesEventType.UPDATE,
            data: diff
        };
        console.log("Dispatching", event);
        this._dispatcher.dispatch(event);
    }
}