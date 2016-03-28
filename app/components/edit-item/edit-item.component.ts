import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange} from 'angular2/core';
import {Observable} from "rxjs/Observable";
import {RouteParams} from "angular2/router";

import {Item, IItem} from "../../entities/item";
import {Router} from "../../common/router.service";
import {ITEM_TEMPLATES, ItemTemplate} from "../../entities/itemDefinitions";
import {ReduxConnector} from "../../common/connector";
import {create} from "../../actions/inventory.actions";

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
    public inputItem: IItem;
    public item: IItem;

    @Input('submit-label')
    public submitLabel: string = 'Edit';

    @Output()
    public update = new EventEmitter<IItem>();

    constructor(
    ) {
        this.updateItem(null);
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (changes['inputItem']) {
            let change = changes['inputItem'];
            this.updateItem(change.currentValue);
        }
    }

    private updateItem(newItem: IItem) {
        if (!newItem) {
            this.item = {
                name: null,
                quantity: 1
            };
        } else {
            this.item = {
                name:          newItem.name || null,
                quantity:      newItem.quantity || 1,
                cost:          newItem.cost.toString() || null,
                description:   newItem.description || null,
                weight:        newItem.weight || null,
                modifications: newItem.modifications || null
            };
        }
    }

    public submit() {
        // TODO validation
        // TODO pay?
        this.update.emit(this.item);
    }

    public cancel() {
        this.update.emit(null);
    }
}