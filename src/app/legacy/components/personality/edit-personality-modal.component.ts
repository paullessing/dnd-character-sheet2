import {Component, Inject} from "angular2/core";
import {ReduxConnector} from "../../common/connector";
import {ItemTemplate} from "../../entities/itemDefinitions";
import {IItem} from "../../entities/item";
import {create} from "../../actions/inventory.actions";
import {buy} from "../../actions/inventory.actions";
import {ModalWindow} from "../modal/modal.service";
import {EditItemComponent} from "../edit-item/edit-item.component";
import {EditPersonalityComponent} from "./edit-personality.component";
import {Personality} from "../../entities/personality";
import {update} from "../../actions/personality.actions";
import {IPersonality} from "../../entities/personality";

@Component({
    selector: 'edit-personality-modal',
    template: `
<h1>Edit Personality</h1>
<edit-personality
    [personality]="personality"
    (update)="onUpdate($event)"
></edit-personality>`,
    directives: [EditPersonalityComponent]
})
export class EditPersonalityModalComponent {
    public personality: Personality;

    constructor(
        private redux: ReduxConnector,
        private modalWindow: ModalWindow<IPersonality>
    ) {
        this.personality = this.redux.getState().personality;
    }

    public onUpdate(personality: IPersonality) {
        if (!personality) {
            this.modalWindow.close();
            return;
        }

        this.redux.dispatch(update(personality));
        this.modalWindow.close();
    }
}