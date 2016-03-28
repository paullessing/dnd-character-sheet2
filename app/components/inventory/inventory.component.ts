import {Component, OnDestroy} from 'angular2/core';
import {BehaviorSubject, Subject} from "rxjs/Rx";

import {ReduxConnector} from "../../common/connector";

import {remove} from "../../actions/inventory.actions";
import {WeightPipe} from "../../common/weight.pipe";
import {Modal} from "../modal/modal.service";

import {Inventory} from "../../entities/item";
import {Item} from "../../entities/item";
import {State} from "../../entities/state";
import {InventoryEntryComponent, ItemRemoveData} from "./inventory-entry.component";
import {WalletComponent} from "../wallet/wallet.component";
import {EditWalletComponent} from "../edit-wallet/edit-wallet.component";

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

    public inventory: Inventory;
    public newItem: Item;

    private unsubscribe: () => void;

    constructor(
        private redux: ReduxConnector,
        private modal: Modal
    ) {
        this.newItem = null;
        this.inventory = new Inventory();

        this.unsubscribe = this.redux.connect(state => this.onUpdate(state));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private onUpdate(state: State) {
        this.inventory = state.inventory.items;
    }

    public onItemRemove(itemId: number, data: ItemRemoveData) {
        this.redux.dispatch(remove(itemId, data.count, null));
    }

    public editWallet() {
        this.modal.open(EditWalletComponent);
    }
}