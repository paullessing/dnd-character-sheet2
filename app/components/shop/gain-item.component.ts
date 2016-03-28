import {Component} from "angular2/core";
import {ModalWindow} from "../modal/modal.service";
import {ReduxConnector} from "../../common/connector";
import {IItem} from "../../entities/item";
import {create} from "../../actions/inventory.actions";
import {ItemTemplate} from "../../entities/itemDefinitions";
import {buy} from "../../actions/inventory.actions";
import {Inject} from "angular2/core";
import {EditItemComponent} from "../edit-item/edit-item.component";

export interface GainItemConfig {
    item: ItemTemplate;
    isBuy?: boolean;
}

@Component({
    selector: 'gain-item',
    template: `<edit-item [item]="item" (update)="onUpdate($event)"></edit-item>`,
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
            quantity: 1,
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
    }
}