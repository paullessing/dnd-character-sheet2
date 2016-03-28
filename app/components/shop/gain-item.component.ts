import {Component, Inject} from "angular2/core";
import {ReduxConnector} from "../../common/connector";
import {ItemTemplate} from "../../entities/itemDefinitions";
import {IItem} from "../../entities/item";
import {create} from "../../actions/inventory.actions";
import {buy} from "../../actions/inventory.actions";
import {ModalWindow} from "../modal/modal.service";
import {EditItemComponent} from "../edit-item/edit-item.component";

export interface GainItemConfig {
    item: ItemTemplate;
    isBuy?: boolean;
    quantity?: number;
    onComplete?: () => void;
}

@Component({
    selector: 'gain-item',
    template: `
<h1>{{ config.isBuy ? 'Buy Item' : 'Gain Item' }}</h1>
<edit-item
    [item]="item"
    (update)="onUpdate($event)"
    [submit-label]="config.isBuy ? 'Buy' : 'Gain'"
></edit-item>`,
    directives: [EditItemComponent]
})
export class GainItemComponent {
    public item: IItem;

    constructor(
        private redux: ReduxConnector,
        private modalWindow: ModalWindow,
        @Inject('gainConfig') private config: GainItemConfig
    ) {
        this.item = {
            name: config.item.name,
            quantity: config.quantity || 1,
            weight: config.item.weight,
            description: config.item.description,
            cost: config.item.cost
        };
    }

    public onUpdate(item: IItem) {
        if (!item) {
            this.modalWindow.close();
            return;
        }

        if (this.config.isBuy) {
            this.redux.dispatch(buy(item, null)); // TODO reason
        } else {
            this.redux.dispatch(create(item));
        }
        this.modalWindow.close();
        if (this.config.onComplete) {
            this.config.onComplete();
        }
    }
}