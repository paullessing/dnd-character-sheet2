import {State, HistoryState} from "../entities/state";
import {Action, StateReducer, Reducer, ReducerEnhancer} from "../entities/redux";
import {LOAD} from "../actions/actions";

export const EXCLUDED_ACTIONS = [
    '@@redux/init',
    LOAD
];

export const history: ReducerEnhancer<State, HistoryState> = (reducer) => {
    return (state: HistoryState = {
        current: undefined,
        currentId: 0,
        maxId: 0,
        history: [{
            id: 1,
            dateCreated: new Date(),
            startStateSerialized: null,
            actions: []
        }]
    }, action: Action): HistoryState => {
        if (EXCLUDED_ACTIONS.indexOf(action.type) >= 0) {
            //return state;
            return Object.assign({}, state, {current: reducer(state.current, action)});
        }

        switch(action) {
            // TODO cases for manipulating history
            default:
                let newState = reducer(state.current, action);
                let maxId = state.maxId;
                let history = state.history.slice();
                history[0] = Object.assign({}, state.history[0]);
                history[0].actions = [{
                    id: ++maxId,
                    dateTime: new Date(), // TODO consider generating in metadata
                    action: action
                }].concat(history[0].actions);
                return {
                    current: newState,
                    currentId: maxId,
                    maxId,
                    history
                };
        }
    };
};
