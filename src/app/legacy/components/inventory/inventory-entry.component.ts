import {Component, Input, Output, EventEmitter} from "angular2/core";

import {Item} from "../../entities/item";
import {CurrencyPipe} from "../../common/currency.pipe";
import {WeightPipe} from "../../common/weight.pipe";
import {SellItemModalComponent, SELL_ITEM_DETAILS_KEY} from "./sell-item.modal.component";
import {IAction} from "../../entities/redux";
import {Modal} from "../modal/modal.service";

export interface ItemRemoveData {
    count: number;
}

/**
 * Component showing an item in the inventory.
 */
@Component({
    selector: 'inventory-entry',
    templateUrl: 'app/components/inventory/inventory-entry.component.html',
    pipes: [CurrencyPipe, WeightPipe],
})
export class InventoryEntryComponent {

    @Input()
    public item: Item;

    @Output()
    public remove: EventEmitter<ItemRemoveData> = new EventEmitter<ItemRemoveData>();

    @Output()
    public sell: EventEmitter<IAction> = new EventEmitter<IAction>();

    public isExpanded: boolean = false;
    public removeCount: number;

    constructor(
        private modal: Modal
    ) {
    }

    public toggle(): void {
        this.isExpanded = !this.isExpanded;
    }

    public removeItem(): void {
        this.remove.emit({
            count: this.removeCount || 1
        });
        this.removeCount = null;
    }

    public sellItem(): void {
        this.modal.open(SellItemModalComponent, { [SELL_ITEM_DETAILS_KEY]: this.item })
            .then((action: IAction) => this.sell.emit(action));
    }
}
