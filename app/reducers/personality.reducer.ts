import {Personality} from "../entities/personality";
import {Action} from "../common/redux/action";
import {UPDATE_PERSONALITY} from "../actions/actions";

export function personality(state = new Personality({}), action: Action) {
    if (action.type === UPDATE_PERSONALITY) {
        return new Personality(action.payload);
    }

    return state;
}
