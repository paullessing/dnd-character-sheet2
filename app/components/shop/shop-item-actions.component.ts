import {Component, OnInit, Input} from 'angular2/core';
import {Router, RouterLink} from "angular2/router";

import {ItemTemplate, ITEM_TEMPLATES} from "../../entities/item";
import {CurrencyPipe} from "../../common/currency.pipe";
import {WeightPipe} from "../../common/weight.pipe";
import {ItemActions} from "../../services/item/itemActions.service";



@Component({
    selector: 'shop-item-actions',
    templateUrl: 'app/components/shop/shop-item-actions.component.html',
    directives: [RouterLink],
})
export class ShopItemActionsComponent {

    @Input()
    public item: ItemTemplate;
    public count: number;
    public reason: string;

    constructor(
        private itemActions: ItemActions
    ) {
    }

    public buy() {
        this.itemActions.buy(this.item, this.count, this.reason);
        this.count = null;
        this.reason = null;
    }
}
