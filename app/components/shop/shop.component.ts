import {Component, OnInit} from 'angular2/core';
import {Router} from "angular2/router";

import {ItemTemplate, ITEM_TEMPLATES} from "../../entities/item";
import {CurrencyPipe} from "../../common/currency.pipe";
import {WeightPipe} from "../../common/weight.pipe";

/**
 * Component listing standard items for sale.
 */
@Component({
    templateUrl: 'app/components/shop/shop.component.html',
    pipes: [CurrencyPipe, WeightPipe],
})
export class ShopComponent {

    public items: ItemTemplate[] = ITEM_TEMPLATES;

    constructor(
        private _router: Router
    ) {
    }
}
