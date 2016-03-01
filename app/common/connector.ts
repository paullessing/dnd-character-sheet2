import {Injectable, Inject} from "angular2/core";
import {Store, Dispatch} from "redux";
import {Action} from "./redux/action";
import {State} from "./redux/state";

@Injectable()
export class ReduxConnector {
    constructor(
        @Inject('Store') private store: Store
    ) {

    }

    public connect(getState) {
        let unsubscribe = this.store.subscribe((state: any) => {
            getState(state);
        });
        return unsubscribe;
    }

    public dispatch(action: Action): void {
        this.store.dispatch(action);
    }

    public getState(): State {
        return this.store.getState();
    }
}