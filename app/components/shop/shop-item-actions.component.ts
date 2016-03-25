import {Component, Input, OnChanges, SimpleChange} from 'angular2/core';
import {Router, RouterLink} from "angular2/router";

import {ItemTemplate, ITEM_TEMPLATES} from "../../entities/itemDefinitions";
import {CurrencyPipe} from "../../common/currency.pipe";
import {WeightPipe} from "../../common/weight.pipe";
import {Amount} from "../../entities/currency";
import {ReduxConnector} from "../../common/connector";
import {buy} from "../../actions/inventory.actions";

@Component({
    selector: 'shop-item-actions',
    templateUrl: 'app/components/shop/shop-item-actions.component.html',
    directives: [RouterLink],
    pipes: [CurrencyPipe],
})
export class ShopItemActionsComponent implements OnChanges {

    @Input()
    public item: ItemTemplate;
    public count: number;
    public reason: string;

    public action: string;
    public isExpanded: boolean;
    public price: Amount;

    constructor(
        private redux: ReduxConnector
    ) {
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        this.action = null;
        this.count = null;
        this.reason = null;
        this.onCountChange();
    }

    public buy() {
        this.redux.dispatch(buy(this.item, this.count, this.reason, null));
        this.count = null;
        this.reason = null;
        this.onCountChange();
    }

    public onCountChange() {
        if (!this.count) {
            this.price = null;
            return;
        }
        this.price = new Amount(this.item.cost).times(this.count);
    }
}
