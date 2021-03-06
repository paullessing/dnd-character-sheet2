import {Component, OnDestroy} from 'angular2/core';
import {ReduxConnector} from "../../common/connector";
import {HistoryState, HistoricalAction, HistoryGroup} from "../../entities/state";
import * as Actions from '../../actions/actions';
import {Action} from "../../entities/redux";
import {Amount} from "../../entities/currency";
import {undo, redo, addGroup} from "../../actions/history.actions";
import {Modal} from "../modal/modal.service";
import {EditHistoryGroupModalComponent} from "./edit-history-group-modal.component";
import {Injector} from "angular2/core";
import {provide} from "angular2/core";

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
    public currentId: number;
    public canUndo: boolean;
    public canRedo: boolean;

    constructor(
        private redux: ReduxConnector,
        private modal: Modal
    ) {
        this.unsubscribe = redux.connectFull(this.onStoreUpdate.bind(this));
    }

    private onStoreUpdate(state: HistoryState) {
        this.history = state.history;
        this.currentId = state.currentId;
        let firstGroup = state.history[state.history.length - 1];
        if (!firstGroup.actions.length) {
            this.canUndo = false;
        } else {
            let firstAction = firstGroup.actions[firstGroup.actions.length - 1];
            this.canUndo = state.currentId > firstAction.id;
        }
        this.canRedo = state.currentId < state.maxId;
    }

    public undo() {
        this.redux.dispatch(undo());
    }

    public redo() {
        this.redux.dispatch(redo());
    }

    public addGroup() {
        this.redux.dispatch(addGroup());
    }

    public edit(id) {
        this.modal.open(EditHistoryGroupModalComponent, Injector.resolve([
            provide('historyGroupId', {
                useValue: id
            })
        ]));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private getTimes(count: number): string {
        if (!count || count <= 1) {
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
                return 'Gained ' + action.payload.amount + ' xp' + (action.payload.reason ? ` for: "${action.payload.reason}"` : '');
            case Actions.BUY_ITEM:
                return 'Bought ' + action.payload.item.name + this.getTimes(action.payload.item.quantity);
            case Actions.CREATE_ITEM:
                return 'Added ' + action.payload.item.name + this.getTimes(action.payload.item.quantity);
            case Actions.HISTORY_ADD_GROUP:
                return 'End of group';
            case Actions.REMOVE_FROM_WALLET:
                return 'Paid/Lost ' + Amount.toString(action.payload.amount);
            case Actions.REMOVE_ITEM:
                return 'Removed' + action.meta.name + this.getTimes(action.payload.count);
            case Actions.SELL_ITEM:
                return 'Sold ' + action.meta.name + this.getTimes(action.payload.count) + ' for ' + action.payload.price;
            case Actions.UPDATE_ABILITIES:
                return 'Updated abilities';
            case Actions.UPDATE_CHARACTER:
                return 'Updated character details';
            case Actions.UPDATE_ITEM:
                return 'Updated ' + action.payload.name;
            case Actions.UPDATE_PERSONALITY:
                return 'Updated character personality';
            case Actions.UPDATE_PROFICIENCIES:
                return 'Updated proficiencies';
            default:
                return action.type;
        }
    }
}