import {Component, Input} from 'angular2/core';
import {BehaviorSubject, Subject} from "rxjs/Rx";

import {Item} from "../../entities/item";
import {CurrencyPipe} from "../../common/currency.pipe";

/**
 * Component showing an item in the inventory.
 */
@Component({
    selector: 'inventory-entry',
    templateUrl: 'app/components/inventory/inventory-entry.component.html',
    pipes: [CurrencyPipe],
})
export class InventoryEntryComponent {

    @Input()
    public item: Item;

    public isExpanded: boolean = false;

    constructor() {
    }

    public toggle(): void {
        this.isExpanded = !this.isExpanded;
    }
}
