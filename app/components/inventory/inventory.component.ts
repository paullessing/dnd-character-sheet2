import {Component, OnInit} from 'angular2/core';
import {Item, ITEMS} from "../../entities/item";
import {OwnedItem} from "../../entities/item";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    templateUrl: 'app/components/inventory/inventory.component.html'
})
export class InventoryComponent implements OnInit {

    public items: OwnedItem[];

    ngOnInit() {
        this.items = [
            new OwnedItem({ item: {name: 'Magic Ring of Ringness'}, quantity: 1 }),
            new OwnedItem({ item: {name: 'Backpack'}, quantity: 1 }),
            new OwnedItem({ item: {name: 'Torch'}, quantity: 7 })
        ];
    }
}