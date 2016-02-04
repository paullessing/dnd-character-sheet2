import {Component, OnInit, Input, Output, EventEmitter, SimpleChange} from 'angular2/core';
import {Observable} from "rxjs/Observable";

import {Item, IItem, ITEM_TEMPLATES, ItemTemplate} from "../../entities/item";
import {OnChanges} from "angular2/core";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'edit-item',
    templateUrl: 'app/components/edit-item/edit-item.component.html'
})
export class EditItemComponent implements OnChanges {

    public items: ItemTemplate[] = ITEM_TEMPLATES;
    @Input('item')
    public inputItem: Item;
    public item: IItem;
    @Output()
    public update = new EventEmitter<Item>();

    constructor() {
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (changes['inputItem']) {
            let change = changes['inputItem'];
            this.updateItem(change.currentValue);
        }
    }

    private updateItem(newItem: Item) {
        if (!newItem) {
            this.item = {
                name: null,
                quantity: 1
            };
        } else {
            this.item = {
                name:          newItem.name || null,
                quantity:      newItem.quantity || 1,
                cost:          newItem.cost || null,
                description:   newItem.description || null,
                weight:        newItem.weight || null,
                modifications: newItem.modifications || null
            };
        }
    }

    public submit() {
        console.log("Submitting", this.item);
        // TODO validation
        this.update.emit(new Item(this.item));
    }
}