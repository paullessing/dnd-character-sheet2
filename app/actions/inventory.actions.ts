import {Action, GetState, Dispatch} from "./action";
import {REMOVE_ITEM} from "./actions";

export function remove(itemId: number, count: number, reason?: string): (dispatch, getState) => Action {
    return (dispatch: Dispatch, getState: GetState) => {
        if (getState().inventory.items.getCount(itemId) < count) {
            console.error('Cannot remove that many');
            return;
        } else {
            dispatch({
                type: REMOVE_ITEM,
                payload: {
                    itemId,
                    count,
                    reason
                }
            });
        }
    }
}