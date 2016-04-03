import {State} from "./state";
import {HistoryState} from "./state";

export interface Action {
    type: string;
    payload?: any;
    error?: any;
    meta?: any;
}

export interface Dispatch {
    (action: Action | ThunkAction): void;
}

export interface GetState {
    (): HistoryState;
}

export interface ThunkAction {
    (dispatch: Dispatch, getState: GetState): void;
}

export interface Reducer<S> {
    (state: S, action: Action): S;
}

export type StateReducer = Reducer<State>;

export interface ReducerEnhancer<S, T> {
    (reducer: Reducer<S>): Reducer<T>
}