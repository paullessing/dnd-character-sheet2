import {Component, OnDestroy} from 'angular2/core';
import {ReduxConnector} from "../../common/connector";
import {HistoryState, HistoricalAction, HistoryGroup} from "../../entities/state";
import * as Actions from '../../actions/actions';
import {Action} from "../../entities/redux";
import {Amount} from "../../entities/currency";

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'history',
    templateUrl: 'app/components/history/history.component.html',
})
export class HistoryComponent implements OnDestroy {

    private unsubscribe: () => void;
    public history: HistoryGroup[];

    constructor(
        redux: ReduxConnector
    ) {
        this.unsubscribe = redux.connectFull(this.onStoreUpdate.bind(this));
    }

    private onStoreUpdate(state: HistoryState) {
        this.history = state.history;
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private getTimes(count: number): string {
        if (!count || count <= 0) {
            return '';
        }
        return ' ×' + count;
    }

    public getNiceAction(action: Action) {
        switch(action.type) {
            case Actions.ADD_ITEM:
                return 'Added ' + action.meta.name + this.getTimes(action.payload.count);
            case Actions.ADD_TO_WALLET:
                return 'Gained ' + Amount.toString(action.payload.amount);
            case Actions.ADD_XP:
                return 'Gained ' + action.payload.amount + ' xp';
            case Actions.BUY_ITEM:
                return 'Bought ' + action.payload.item.name + this.getTimes(action.payload.item.quantity);
            case Actions.CREATE_ITEM:
                return 'Added ' + action.payload.item.name + this.getTimes(action.payload.item.quantity);
            case Actions.REMOVE_FROM_WALLET:
                return 'Paid/Lost ' + Amount.toString(action.payload.amount);
            case Actions.REMOVE_ITEM:
                return 'Removed' + action.meta.name + this.getTimes(action.payload.count);
            case Actions.UPDATE_ABILITIES:
                return 'Updated abilities';
            case Actions.UPDATE_CHARACTER:
                return 'Updated character details';
            case Actions.UPDATE_ITEM:
                return 'Updated ' + action.payload.name;
            case Actions.UPDATE_PERSONALITY:
                return 'Updated character personality';
            default:
                return action.type;
        }
    }
}