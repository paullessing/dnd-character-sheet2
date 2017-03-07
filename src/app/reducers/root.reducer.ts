import {Reducer} from "../entities/redux";
import {HistoryState} from "../entities/state";

import {state} from "./state.reducer";
import {history} from "./history.reducer";
import {load} from './load.reducer';

export const rootReducer: Reducer<HistoryState> = load(history(state));
