import {Component, OnDestroy} from 'angular2/core';

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
import {GainItemModalComponent, GAIN_ITEM_CONFIG_KEY} from "../gain-item-modal/gain-item-modal.component";
import {IAction} from "../../entities/redux";

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
    
    public gainItem() {
        this.modal.open(GainItemModalComponent, {
            [GAIN_ITEM_CONFIG_KEY]: { isBuy: false }
        }).then((action: IAction) => {
            if (action) {
                this.redux.dispatch(action)
            }
        });
    }
}