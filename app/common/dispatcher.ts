import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";

export interface Event<T> {
    type: string;
    data?: T;
}

@Injectable()
export class Dispatcher {
    private _observable: Observable<Event<any>>;
    private _notify: (event: Event<any>) => void;

    constructor() {
        this._observable = new Observable(describe => {
            this._notify = (event) => describe.next(event);
        });
    }

    public dispatch<T>(event: Event<T>) {
        this._notify(event);
    }

    public get observable(): Observable<Event<any>> {
        return this._observable;
    }
}