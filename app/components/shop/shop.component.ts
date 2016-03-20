import {Component, OnInit, Input} from 'angular2/core';
import {Router, RouterLink} from "angular2/router";

import {ItemTemplate, ITEM_TEMPLATES} from "../../entities/itemDefinitions";
import {CurrencyPipe} from "../../common/currency.pipe";
import {WeightPipe} from "../../common/weight.pipe";
import {ItemActions} from "../../services/item/itemActions.service";
import {ShopItemActionsComponent} from "./shop-item-actions.component";

/**
 * Component listing standard items for sale.
 */
@Component({
    selector: 'shop',
    templateUrl: 'app/components/shop/shop.component.html',
    pipes: [WeightPipe, CurrencyPipe],
    directives: [ShopItemActionsComponent],
})
export class ShopComponent {

    public items: ItemTemplate[] = ITEM_TEMPLATES;
    public itemToBuy: ItemTemplate;

    constructor(
        private _router: Router
    ) {
    }

    public select(item: ItemTemplate) {
        this.itemToBuy = item;
    }

    public deselect() {
        this.itemToBuy = null;
    }
}