import {Component, Inject} from "angular2/core";
import {IItem, Item} from "../../entities/item";
import {create, buy, sell} from "../../actions/inventory.actions";
import {ModalWindow} from "../modal/modal.service";
import {IAction} from "../../entities/redux";
import {FORM_DIRECTIVES} from "angular2/common";
import {Amount} from "../../entities/currency";

export const SELL_ITEM_DETAILS_KEY = 'details';

@Component({
    selector: 'gain-item',
    template: `
<h1>Sell {{ item.name }}</h1>
<form (ngSubmit)="submit()">
    <div>Cost: {{ item.cost.toString() }} {{ item.quantity > 1 ? '(each)' : '' }}</div>
    <div>
        <label>
            Quantity:
            <input type="number" min="1" step="1" max="{{ item.quantity }}"
                [(ngModel)]="quantity"
                (change)="onChangeQuantity()"
            />
        </label>
    </div>
    <div>
        <label>
            Price:
            <input
                type="string"
                [(ngModel)]="price"
            />
        </label>
    </div>
    <div>
        <button type="submit">Sell</button>
        <a href="javascript:void(0)" (click)="cancel()">Cancel</a>
    </div>
</form>`,
    directives: [FORM_DIRECTIVES]
})
export class SellItemModalComponent {
    public quantity: number;
    public price: string;

    constructor(
        private modalWindow: ModalWindow<IAction>,
        @Inject(SELL_ITEM_DETAILS_KEY) private item: Item
    ) {
    }

    public onChangeQuantity() {
        this.price = this.item.cost.times(this.quantity / 2).toString();
    }

    public submit() {
        this.modalWindow.close(sell(this.item.id, this.quantity, new Amount(this.price)));
    }
    
    public cancel() {
        this.modalWindow.close();
    }
}