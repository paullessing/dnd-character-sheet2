import {Component, Input} from "angular2/core";
import {RouterLink} from "angular2/router";
import {FORM_DIRECTIVES} from "angular2/common";
import {
    GainItemModalComponent,
    GainItemConfig,
    GAIN_ITEM_CONFIG_KEY
} from "../gain-item-modal/gain-item-modal.component";
import {ItemTemplate} from "../../entities/itemDefinitions";
import {IItem} from "../../entities/item";
import {Amount} from "../../entities/currency";
import {CurrencyPipe} from "../../common/currency.pipe";
import {ReduxConnector} from "../../common/connector";
import {buy, create} from "../../actions/inventory.actions";
import {Modal} from "../modal/modal.service";
import {IAction} from "../../entities/redux";

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
        this.count = 1;
        this.onCountChange();
    }

    public submit(isBuy: boolean) {
        if (!this.count || this.count <= 0) {
            return;
        }
        if (this.isEdit) {
            this.modal.open(GainItemModalComponent, {
                [GAIN_ITEM_CONFIG_KEY]: this.getGainConfig(isBuy)
            }).then((action: IAction) => {
                if (action) {
                    this.redux.dispatch(action);
                    this.onCompleteEdit()
                }
            });
        } else {
            let action = isBuy ? buy(this.getItem(), this.reason) : create(this.getItem());
            this.redux.dispatch(action);
            this.reset();
        }
    }

    private getGainConfig(isBuy: boolean): GainItemConfig {
        return {
            item: this.item,
            isBuy: isBuy,
            quantity: this.count
        };
    }

    private onCompleteEdit(): void {
        this.reset();
    }

    public onCountChange() {
        if (!this.count || !this.item) {
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
