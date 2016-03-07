import {Component, OnDestroy} from 'angular2/core';
import {BehaviorSubject, Subject} from "rxjs/Rx";

import {Item} from "../../entities/item";
import {InventoryEntryComponent} from "./inventory-entry.component";
import {WeightPipe} from "../../common/weight.pipe";
import {WalletComponent} from "../wallet/wallet.component";
import {ReduxConnector} from "../../common/connector";
import {State} from "../../entities/state";
import {ItemRemoveData} from "./inventory-entry.component";
import {remove} from "../../actions/inventory.actions";

/**
 * Component showing the character's inventory.
 */
@Component({
    selector: 'inventory',
    templateUrl: 'app/components/inventory/inventory.component.html',
    directives: [InventoryEntryComponent, WalletComponent],
    pipes: [WeightPipe],
})
export class InventoryComponent implements OnDestroy {

    public items: Item[];
    public newItem: Item;

    private unsubscribe: () => void;

    constructor(
        private redux: ReduxConnector
    ) {
        this.newItem = null;
        this.items = [];

        this.unsubscribe = this.redux.connect(state => this.onUpdate(state));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private onUpdate(state: State) {
        this.items = state.inventory.items;
    }

    public onItemRemove(itemId: number, data: ItemRemoveData) {
        console.log('item remove', itemId, data);
        this.redux.dispatch(remove(itemId, data.count, null));
    }

    public get totalWeight(): number {
        return this.items.reduce((current, item) => current + item.weight * item.quantity, 0);
    }
}