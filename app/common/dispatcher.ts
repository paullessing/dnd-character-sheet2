import {Observable, Subject} from "rxjs/Rx";
import {Injectable} from "angular2/core";

export interface Event<T> {
    type: string;
    data?: T;
}

@Injectable()
export class Dispatcher {
    private _subject: Subject<Event<any>>;

    constructor() {
        this._subject = new Subject();
        console.log("Constructed Dispatcher");
    }

    public dispatch<T>(event: Event<T>) {
        console.log("Dispatch", event);
        this._subject.next(event);
    }

    public get observable(): Observable<Event<any>> {
        return this._subject;
    }
}