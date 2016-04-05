import {Injectable, Inject} from "angular2/core";
import {Store, Dispatch} from "redux";
import {Action, ThunkAction} from "./../entities/redux";
import {State} from "./../entities/state";
import {HistoryState} from "../entities/state";

@Injectable()
export class ReduxConnector {
    constructor(
        @Inject('Store') private store: Store
    ) {

    }

    public connect(onStoreUpdate): () => void {
        let unsubscribe: (() => void) = this.store.subscribe(() => {
            onStoreUpdate(this.store.getState().current);
        }) as (() => void); // "Function" definition doesn't match (() => void)

        // Initial update
        onStoreUpdate(this.store.getState().current);

        return unsubscribe;
    }

    public connectFull(onStoreUpdate): () => void {
        let unsubscribe: (() => void) = this.store.subscribe(() => {
            onStoreUpdate(this.store.getState());
        }) as (() => void); // "Function" definition doesn't match (() => void)

        // Initial update
        onStoreUpdate(this.store.getState());

        return unsubscribe;
    }

    public dispatch(action: Action | ThunkAction): void {
        this.store.dispatch(action);
    }

    public getState(): State {
        return this.store.getState().current;
    }

    public getFullState(): HistoryState {
        return this.store.getState();
    }
}