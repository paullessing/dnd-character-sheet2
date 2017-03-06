import {HistoryState} from "../entities/state";
import {ReducerEnhancer, Action} from "../entities/redux";
import {LOAD} from "../actions/actions";
import {loadState} from "../common/storage.middleware";

export const load: ReducerEnhancer<HistoryState, HistoryState> = (reducer) => {
    return (state: HistoryState, action: Action) => {
        // This should not inspect the localStorage, instead it should be pure
        // But since localStorage is synchronous anyway it doesn't really matter
        // TODO refactor to be async, even if that's pointless
        if (action.type === LOAD) {
            state = loadState();
        }
        return reducer(state, action);
    }
};