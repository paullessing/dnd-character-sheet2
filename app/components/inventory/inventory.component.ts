import {Component, OnInit} from 'angular2/core';
import {BehaviorSubject, Subject} from "rxjs/Rx";

import {Item} from "../../entities/item";
import {EditItemComponent} from "../edit-item/edit-item.component";
import {InventoryEntryComponent} from "./inventory-entry.component";

/**
 * Component showing the character's inventory.
 */
@Component({
    templateUrl: 'app/components/inventory/inventory.component.html',
    directives: [EditItemComponent, InventoryEntryComponent]
})
export class InventoryComponent implements OnInit {

    public items: Item[];
    public newItem: Item;

    constructor() {
        this.newItem = null;
    }

    ngOnInit() {
        this.items = [
            new Item({ id: 1, name: 'Magic Ring of Ringness', quantity: 1, weight: 0, cost: 150000 }),
            new Item({ id: 2, name: 'Backpack', quantity: 1, weight: 5, cost: 200 }),
            new Item({ id: 3, name: 'Torch', quantity: 7, weight: 1, cost: 572 })
        ];
    }

    public onNewItem(item: Item) {
        this.items.push(item);
        this.newItem = null;
    }
}