import {State, HistoryState, HistoryGroup, HistoricalAction} from "../entities/state";
import {Action, StateReducer, Reducer, ReducerEnhancer} from "../entities/redux";
import {
  isUserAction,
  UNDO, REDO, HISTORY_ADD_GROUP
} from "../actions/actions";
import {deserializeState} from "../common/storage.middleware";
import {serializeState} from "../common/storage.middleware";
import {HISTORY_RENAME_GROUP} from "../actions/actions";

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
    if (!isUserAction(action.type)) {
      return Object.assign({}, state, {current: reducer(state.current, action)});
    }

    switch(action.type) {
      case UNDO:
        return undo(state, reducer);
      case REDO:
        return redo(state, reducer);
      case HISTORY_ADD_GROUP:
        return addHistoryGroup(state, action);
      case HISTORY_RENAME_GROUP:
        return renameGroup(state, action);
      default:
        return runAndStore(reducer, state, action);
    }
  };
};

function renameGroup(state: HistoryState, action: Action) {
  let newState = Object.assign({}, state);
  newState.history = newState.history.map((group: HistoryGroup) => {
    if (group.id !== action.payload.id) {
      return group;
    }
    let newGroup = Object.assign({}, group);
    newGroup.name = action.payload.name;
    newGroup.description = action.payload.description;
    return newGroup;
  });
  return newState;
}

function addHistoryGroup(state: HistoryState, action: Action) {
  let maxIndex = state.history[0].id;
  let newGroup = {
    id: maxIndex + 1,
    dateCreated: new Date(),
    startStateSerialized: serializeState(state.current),
    actions: []
  };
  let newState = store(state, state.current, action);
  let newHistory = [newGroup].concat(newState.history);
  return Object.assign({}, newState, { history: newHistory });
}

/**
 * Finds the first element that matches the given predicate.
 * Searches backwards through the history!
 */
function find(history: HistoryGroup[], predicate: (action: HistoricalAction, group: HistoryGroup) => boolean): {
  group: HistoryGroup;
  groupIndex: number;
  action: HistoricalAction;
  actionIndex: number;
} {
  for (let groupIndex = 0; groupIndex < history.length; groupIndex++) {
    let group = history[groupIndex];
    if (group.isDeleted) {
      continue;
    }
    for (let actionIndex = 0; actionIndex < group.actions.length; actionIndex++) {
      let action = group.actions[actionIndex];
      if (action.isDeleted) {
        continue;
      }
      if (predicate(action, group)) {
        return {
          group,
          groupIndex,
          action,
          actionIndex
        };
      }
    }
  }
  return null;
}

function findNext(history: HistoryGroup[], id: number): {
  group: HistoryGroup;
  groupIndex: number;
  action: HistoricalAction;
  actionIndex: number;
} {
  let previous = null;
  for (let groupIndex = 0; groupIndex < history.length; groupIndex++) {
    let group = history[groupIndex];
    if (group.isDeleted) {
      continue;
    }
    for (let actionIndex = 0; actionIndex < group.actions.length; actionIndex++) {
      let action = group.actions[actionIndex];
      if (action.isDeleted) {
        continue;
      }
      if (action.id === id) {
        return previous;
      }
      previous = {
        group,
        groupIndex,
        action,
        actionIndex
      };
    }
  }
  return previous;
}

function undo(state: HistoryState, reducer: StateReducer): HistoryState {
  if (state.currentId <= 1) {
    return state; // Can't undo any further
  }
  let newAction = find(state.history, (action: HistoricalAction) => action.id < state.currentId);
  if (!newAction) {
    console.warn(`Cannot undo from state ${state.currentId} since no suitable predecessor could be found`);
    return state;
  }
  let currentState: State = newAction.group.startStateSerialized ? deserializeState(newAction.group.startStateSerialized) : undefined;
  for (let i = newAction.group.actions.length - 1; i >= newAction.actionIndex; i--) {
    currentState = reducer(currentState, newAction.group.actions[i].action);
  }
  let newState = Object.assign({}, state);
  newState.current = currentState;
  newState.currentId = newAction.action.id;
  return newState;
}

function redo(state: HistoryState, reducer: StateReducer): HistoryState {
  if (state.currentId === state.maxId) {
    return state;
  }
  let newAction = findNext(state.history, state.currentId);
  if (!newAction) {
    console.warn(`Cannot redo from state ${state.currentId} since no suitable successor could be found`);
  }
  let current = reducer(state.current, newAction.action.action);
  return {
    current,
    currentId: newAction.action.id,
    maxId: state.maxId,
    history: state.history
  };
}

function indexOfCurrent(history: HistoryGroup[]): number {
  for (let i = 0; i < history.length; i++) {
    if (!history[i].isDeleted) {
      return i;
    }
  }
  throw new Error('No current group found!');
}

function runAndStore(reducer: StateReducer, state: HistoryState, action: Action): HistoryState {
  state = removeFuture(state);
  let newState = reducer(state.current, action);
  return store(state, newState, action);
}

function store(state: HistoryState, newState: State, action: Action): HistoryState {
  let maxId = state.maxId;
  let history: HistoryGroup[] = state.history.slice();
  let currentIndex = indexOfCurrent(state.history);
  history[currentIndex] = Object.assign({}, state.history[currentIndex]);
  history[currentIndex].actions = [{
    id: ++maxId,
    dateTime: new Date(), // TODO consider generating in metadata
    action: action
  }].concat(history[currentIndex].actions);
  return {
    current: newState,
    currentId: maxId,
    maxId,
    history
  };
}

function removeFuture(state: HistoryState): HistoryState {
  if (state.currentId === state.maxId) {
    return state;
  }
  let newHistory: HistoryGroup[] = state.history.map((group: HistoryGroup) => {
    let allDeleted = true;
    let anyDeleted = false;
    let newActions = group.actions.map((action: HistoricalAction) => {
      if (action.id <= state.currentId) {
        allDeleted = false;
        return action;
      } else {
        anyDeleted = true;
        return Object.assign({}, action, {isDeleted: true});
      }
    });
    if (!anyDeleted) {
      return group;
    } else {
      return Object.assign({}, group, { actions: newActions, isDeleted: allDeleted });
    }
  });
  //let newHistory: HistoryGroup[] = state.history.slice(currentState.groupIndex);
  //newHistory[0] = Object.assign({}, newHistory[0], { actions: newHistory[0].actions.slice(currentState.actionIndex) });
  return Object.assign({}, state, { history: newHistory });
}
