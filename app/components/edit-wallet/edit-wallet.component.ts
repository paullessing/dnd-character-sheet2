import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, ControlGroup, FormBuilder, RadioButtonState} from "angular2/common";

import {IAmount} from "../../entities/currency";
import {ReduxConnector} from "../../common/connector";
import {addToWallet, removeFromWallet} from "../../actions/inventory.actions";
import {ModalWindow} from "../modal/modal.service";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'edit-wallet',
    templateUrl: 'app/components/edit-wallet/edit-wallet.component.html',
    directives: [FORM_DIRECTIVES]
})
export class EditWalletComponent {
    public changeAmount: IAmount;

    public walletForm: ControlGroup;

    constructor(
        private redux: ReduxConnector,
        private formBuilder: FormBuilder,
        private modalWindow: ModalWindow<IAmount>
    ) {
        this.walletForm = formBuilder.group({
            add: new RadioButtonState(true, 'add'),
            remove: new RadioButtonState(false, 'remove')
        });

        this.isAdd = true;
        this.changeAmount = {
            copper: 0,
            silver: 0,
            electrum: 0,
            gold: 0,
            platinum: 0
        };
    }

    public save() {
        if (this.isAdd) {
            this.redux.dispatch(addToWallet(this.changeAmount));
        } else {
            this.redux.dispatch(removeFromWallet(this.changeAmount));
        }
        this.modalWindow.close();
    }

    public cancel() {
        this.modalWindow.close();
    }

    private get isAdd(): boolean {
        return this.walletForm.controls['add'].value.checked;
    }

    private set isAdd(value: boolean) {
        this.walletForm.controls['add'].value.checked = value;
        this.walletForm.controls['remove'].value.checked = !value;
        this.walletForm.controls['add'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
        this.walletForm.controls['remove'].updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
}
