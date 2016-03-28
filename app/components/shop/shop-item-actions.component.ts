import {Component, Input, OnChanges, SimpleChange, provide, Injector} from 'angular2/core';
import {Router, RouterLink} from "angular2/router";

import {GainItemComponent, GainItemConfig} from "./gain-item.component";

import {ItemTemplate, ITEM_TEMPLATES} from "../../entities/itemDefinitions";
import {IItem} from "../../entities/item";
import {Amount} from "../../entities/currency";
import {CurrencyPipe} from "../../common/currency.pipe";
import {ReduxConnector} from "../../common/connector";
import {buy} from "../../actions/inventory.actions";
import {Modal} from "../modal/modal.service";

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
    public price: Amount;

    constructor(
        private redux: ReduxConnector,
        private modal: Modal
    ) {
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
        this.action = null;
        this.count = null;
        this.reason = null;
        this.onCountChange();
    }

    public buy() {
        let item: IItem = {
            name: this.item.name,
            cost: this.item.cost,
            description: this.item.description,
            weight: this.item.weight,
            modifiers: this.item.modifiers,

            quantity: this.count,
        };
        this.redux.dispatch(buy(item, this.reason));
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

    public gain() {
        let bindings = Injector.resolve([provide('gainConfig', { useValue: { item: this.item, isBuy: false } })]);
        this.modal.open(GainItemComponent, bindings);
    }
}
