import {State} from "../entities/state";
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
    (): State;
}

export interface ThunkAction {
    (dispatch: Dispatch, getState: GetState): void;
}