import {Component, Input, OnChanges, SimpleChange, provide, Injector} from 'angular2/core';
import {Router, RouterLink} from "angular2/router";
import {FORM_DIRECTIVES, FormBuilder, Control} from 'angular2/common'

import {GainItemComponent, GainItemConfig} from "./gain-item.component";

import {ItemTemplate, ITEM_TEMPLATES} from "../../entities/itemDefinitions";
import {IItem} from "../../entities/item";
import {Amount} from "../../entities/currency";
import {CurrencyPipe} from "../../common/currency.pipe";
import {ReduxConnector} from "../../common/connector";
import {buy} from "../../actions/inventory.actions";
import {Modal} from "../modal/modal.service";
import {create} from "../../actions/inventory.actions";
import {ResolvedBinding} from "angular2/core";

@Component({
    selector: 'shop-item-actions',
    templateUrl: 'app/components/shop/shop-item-actions.component.html',
    directives: [FORM_DIRECTIVES, RouterLink],
    pipes: [CurrencyPipe],
})
export class ShopItemActionsComponent {

    @Input()
    public item: ItemTemplate;

    public count: number;
    public reason: string;
    public isEdit: boolean;

    public price: Amount;

    constructor(
        private redux: ReduxConnector,
        private modal: Modal
    ) {
        this.reset();
    }

    private reset() {
        this.isEdit = false;
        this.count = null;
        this.onCountChange();
    }

    public submit(isBuy: boolean) {
        if (!this.count || this.count <= 0) {
            return;
        }
        if (this.isEdit) {
            this.modal.open(GainItemComponent, this.getBindings(isBuy));
        } else {
            let action = isBuy ? buy(this.getItem(), this.reason) : create(this.getItem());
            this.redux.dispatch(action);
            this.reset();
        }
    }

    private getBindings(isBuy: boolean): ResolvedBinding[] {
        let config: GainItemConfig = {
            item: this.item,
            isBuy: isBuy,
            quantity: this.count,
            onComplete: () => this.onCompleteEdit()
        };

        return Injector.resolve([
            provide('gainConfig', {
                useValue: config
            })
        ]);
    }

    private onCompleteEdit(): void {
        this.reset();
    }

    public onCountChange() {
        if (!this.count) {
            this.price = null;
            return;
        }
        this.price = new Amount(this.item.cost).times(this.count);
    }

    private getItem(): IItem {
        return {
            name: this.item.name,
            cost: this.item.cost,
            description: this.item.description,
            weight: this.item.weight,
            modifiers: this.item.modifiers,

            quantity: this.count,
        };
    }
}
