import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange} from 'angular2/core';
import {Observable} from "rxjs/Observable";
import {RouteParams} from "angular2/router";

import {Item, IItem} from "../../entities/item";
import {ItemActions} from "../../services/item/itemActions.service";
import {Router} from "../../common/router.service";
import {ITEM_TEMPLATES, ItemTemplate} from "../../entities/itemDefinitions";

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

    private isCreate = true;
    private isFromShop = false;

    constructor(
        params: RouteParams,
        private itemActions: ItemActions,
        private router: Router
    ) {
        if (params.get('template')) {
            this.isFromShop = true;
            let name = params.get('name');
            let template = ITEM_TEMPLATES.find(template => template.name === name);
            this.item = {
                name: template.name,
                cost: template.cost,
                weight: template.weight,
                description: template.description,
                quantity: 1
            };
        }
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        if (changes['inputItem']) {
            let change = changes['inputItem'];
            this.updateItem(change.currentValue);
            this.isCreate = false;
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
        if (this.isCreate) {
            this.itemActions.create(this.item);
            this.router.navigate([this.isFromShop ? 'Shop' : 'Inventory', {addSuccess: true}]);
        } else {
            // TODO not sure I need this
            this.update.emit(new Item(this.item));
        }
    }
}