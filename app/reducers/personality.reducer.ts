import {Personality} from "../entities/personality";
import {Action} from "../common/redux/action";

export function personality(state = new Personality({}), action: Action) {
    return state;
}
