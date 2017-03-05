import {Component, Input, OnChanges, SimpleChange} from "angular2/core";
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
import {NotificationModal, SETTINGS_KEY} from "../modal/notification.modal.component";
import {ItemNotAffordableError} from "../../entities/errors";

@Component({
    selector: 'shop-item-actions',
    templateUrl: 'app/components/shop/shop-item-actions.component.html',
    directives: [FORM_DIRECTIVES, RouterLink],
    pipes: [CurrencyPipe],
})
export class ShopItemActionsComponent implements OnChanges {

    @Input()
    public item: ItemTemplate;

    @Input()
    public wallet: Amount;

    public count: number;
    public reason: string;
    public isEdit: boolean;
    public canAfford: boolean;

    public price: Amount;

    constructor(
        private redux: ReduxConnector,
        private modal: Modal
    ) {
        this.reset();
    }

    ngOnChanges(changes: { [property: string]: SimpleChange }) {
        this.onCountChange();
    }

    private calculateCanAfford(): void {
        this.canAfford = this.wallet && this.price && !this.price.greaterThan(this.wallet);
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
                    this.gainSafely(action).then(() => {
                        this.onCompleteEdit();
                    });
                }
            });
        } else {
            let action = isBuy ? buy(this.getItem(), this.reason) : create(this.getItem());
            this.gainSafely(action).then(() => {
                this.reset();
            });
        }
    }

    private getGainConfig(isBuy: boolean): GainItemConfig {
        return {
            item: this.item,
            isBuy: isBuy,
            quantity: this.count
        };
    }

    private gainSafely(action: IAction): Promise<void> {
        try {
            this.redux.dispatch(action);
            return Promise.resolve();
        } catch (error) {
            if (error instanceof ItemNotAffordableError) {
                this.modal.open(NotificationModal, {
                    [SETTINGS_KEY]: {
                        text: 'You cannot afford that!',
                        primaryButtonText: 'Oops'
                    }
                });
            }
            return Promise.reject(error);
        }
    }

    private onCompleteEdit(): void {
        this.reset();
    }

    public onCountChange() {
        if (!this.count || !this.item) {
            this.price = null;
        } else {
            this.price = new Amount(this.item.cost).times(this.count);
        }
        this.calculateCanAfford();
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
