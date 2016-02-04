import {Component, OnInit} from 'angular2/core';
import {BehaviorSubject, Subject} from "rxjs/Rx";

import {Item} from "../../entities/item";
import {EditItemComponent} from "../edit-item/edit-item.component";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    templateUrl: 'app/components/inventory/inventory.component.html',
    directives: [EditItemComponent]
})
export class InventoryComponent implements OnInit {

    public items: Item[];
    public newItem: Item;

    constructor() {
        this.newItem = null;
    }

    ngOnInit() {
        this.items = [
            new Item({ name: 'Magic Ring of Ringness', quantity: 1 }),
            new Item({ name: 'Backpack', quantity: 1 }),
            new Item({ name: 'Torch', quantity: 7 })
        ];
    }

    public onNewItem(item: Item) {
        console.log("New Item", item);
        this.items.push(item);
        this.newItem = null;
    }
}