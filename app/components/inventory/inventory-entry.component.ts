import {Component, Input, Output} from 'angular2/core';
import {BehaviorSubject, Subject} from "rxjs/Rx";

import {Item} from "../../entities/item";
import {CurrencyPipe} from "../../common/currency.pipe";
import {WeightPipe} from "../../common/weight.pipe";
import {EventEmitter} from "angular2/core";

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

    @Output('remove')
    public removeEvents: EventEmitter<ItemRemoveData> = new EventEmitter<ItemRemoveData>();

    public isExpanded: boolean = false;
    public removeCount: number;

    constructor(
    ) {
    }

    public toggle(): void {
        this.isExpanded = !this.isExpanded;
    }

    public remove(): void {
        this.removeEvents.emit({
            count: this.removeCount || 1
        });
        this.removeCount = null;
    }
}
