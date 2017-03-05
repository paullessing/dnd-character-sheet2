import {Component, Inject} from "angular2/core";
import {ItemTemplate} from "../../entities/itemDefinitions";
import {IItem} from "../../entities/item";
import {create, buy} from "../../actions/inventory.actions";
import {ModalWindow} from "../modal/modal.service";
import {EditItemComponent} from "../edit-item/edit-item.component";
import {IAction} from "../../entities/redux";

export interface GainItemConfig {
    item?: ItemTemplate;
    isBuy?: boolean;
    quantity?: number;
}

export const GAIN_ITEM_CONFIG_KEY = 'gainConfig';

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
export class GainItemModalComponent {
    public item: IItem;

    constructor(
        private modalWindow: ModalWindow<IAction>,
        @Inject(GAIN_ITEM_CONFIG_KEY) private config: GainItemConfig
    ) {
        this.item = {
            name: '',
            quantity: 1
        };
        if (config.item) {
            Object.assign(this.item, config.item);
        }
    }

    public onUpdate(item: IItem) {
        if (!item) {
            this.modalWindow.close();
            return;
        }

        if (this.config.isBuy) {
            this.modalWindow.close(buy(item, null)); // TODO reason
        } else {
            this.modalWindow.close(create(item));
        }
    }
}