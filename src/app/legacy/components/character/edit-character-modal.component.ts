import {Component, Inject} from "angular2/core";
import {ReduxConnector} from "../../common/connector";
import {ItemTemplate} from "../../entities/itemDefinitions";
import {IItem} from "../../entities/item";
import {create} from "../../actions/inventory.actions";
import {buy} from "../../actions/inventory.actions";
import {ModalWindow} from "../modal/modal.service";
import {EditItemComponent} from "../edit-item/edit-item.component";
import {Personality} from "../../entities/personality";
import {update} from "../../actions/character.actions";
import {IPersonality} from "../../entities/personality";
import {ICharacter} from "../../entities/character";
import {EditCharacterComponent} from "./edit-character.component";
import {Character} from "../../entities/character";

@Component({
    selector: 'edit-character-modal',
    template: `
<h1>Edit Character</h1>
<edit-character
    [character]="character"
    (update)="onUpdate($event)"
></edit-character>`,
    directives: [EditCharacterComponent]
})
export class EditCharacterModalComponent {
    public character: Character;

    constructor(
        private redux: ReduxConnector,
        private modalWindow: ModalWindow<ICharacter>
    ) {
        this.character = this.redux.getState().character;
    }

    public onUpdate(character: ICharacter) {
        if (!character) {
            this.modalWindow.close();
            return;
        }

        this.redux.dispatch(update(character));
        this.modalWindow.close();
    }
}