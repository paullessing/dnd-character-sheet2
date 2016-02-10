import {Component} from 'angular2/core';
import {BehaviorSubject, Subject} from "rxjs/Rx";

import {Item} from "../../entities/item";
import {InventoryEntryComponent} from "./inventory-entry.component";
import {ItemRepository} from "../../services/item/item.repository";
import {WeightPipe} from "../../common/weight.pipe";

/**
 * Component showing the character's inventory.
 */
@Component({
    selector: 'inventory',
    templateUrl: 'app/components/inventory/inventory.component.html',
    directives: [InventoryEntryComponent],
    pipes: [WeightPipe],
})
export class InventoryComponent {

    public items: Item[];
    public newItem: Item;

    constructor(
        private itemRepository: ItemRepository
    ) {
        this.newItem = null;
        this.items = [];

        this.itemRepository.items.subscribe(items => {
            this.items = items;
        });
    }

    public get totalWeight(): number {
        return this.items.reduce((current, item) => current + item.weight * item.quantity, 0);
    }
}