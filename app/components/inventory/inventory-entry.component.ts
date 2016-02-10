import {Component, Input} from 'angular2/core';
import {BehaviorSubject, Subject} from "rxjs/Rx";

import {Item} from "../../entities/item";
import {CurrencyPipe} from "../../common/currency.pipe";
import {WeightPipe} from "../../common/weight.pipe";
import {ItemActions} from "../../services/item/itemActions.service";

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

    public isExpanded: boolean = false;
    public removeCount: number;

    constructor(
        private itemActions: ItemActions
    ) {
    }

    public toggle(): void {
        this.isExpanded = !this.isExpanded;
    }

    public remove(): void {
        this.itemActions.add(this.item.id, -(this.removeCount || 1), null);
        this.removeCount = null;
    }
}
