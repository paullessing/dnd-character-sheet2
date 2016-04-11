import {Component} from "angular2/core";
import {ItemTemplate, ITEM_TEMPLATES} from "../../entities/itemDefinitions";
import {CurrencyPipe} from "../../common/currency.pipe";
import {WeightPipe} from "../../common/weight.pipe";
import {ShopItemActionsComponent} from "./shop-item-actions.component";
import {WalletComponent} from "../wallet/wallet.component";
import {AmountComponent} from "../amount/amount.component";

/**
 * Component listing standard items for sale.
 */
@Component({
    selector: 'shop',
    templateUrl: 'app/components/shop/shop.component.html',
    directives: [ShopItemActionsComponent, WalletComponent, AmountComponent],
    pipes: [WeightPipe, CurrencyPipe],
})
export class ShopComponent {

    public items: ItemTemplate[] = ITEM_TEMPLATES;
    public itemToBuy: ItemTemplate;

    private expandedItemName: string;

    constructor(
    ) {
    }

    public select(item: ItemTemplate) {
        this.itemToBuy = item;
    }

    public deselect() {
        this.itemToBuy = null;
    }

    public toggleExpand(item: ItemTemplate) {
        if (this.isExpanded(item)) {
            this.expandedItemName = null;
        } else {
            this.expandedItemName = item.name;
        }
    }

    public isExpanded(item: ItemTemplate): boolean {
        return this.expandedItemName === item.name;
    }
}