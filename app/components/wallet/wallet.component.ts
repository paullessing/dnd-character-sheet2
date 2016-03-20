import {Component, OnDestroy} from 'angular2/core';
import {FORM_DIRECTIVES, ControlGroup, FormBuilder, RadioButtonState} from "angular2/common";
import {RadioControlValueAccessor} from "angular2/src/common/forms/directives/radio_control_value_accessor";

import {Amount,IAmount} from "../../entities/currency";
import {WalletRepository} from "../../services/wallet/wallet.repository";
import {ReduxConnector} from "../../common/connector";
import {State} from "../../entities/state";
import {addToWallet, removeFromWallet} from "../../actions/inventory.actions";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'wallet',
    templateUrl: 'app/components/wallet/wallet.component.html',
    directives: [FORM_DIRECTIVES, RadioControlValueAccessor]
})
export class WalletComponent implements OnDestroy {
    public wallet: Amount;
    public changeAmount: IAmount;
    public isEditing: boolean;
    private unsubscribe: () => void;

    public walletForm: ControlGroup;

    constructor(
        private redux: ReduxConnector,
        private formBuilder: FormBuilder
    ) {
        this.unsubscribe = this.redux.connect((state: State) => this.onStateUpdate(state));

        this.walletForm = formBuilder.group({
            add: new RadioButtonState(true, 'add'),
            remove: new RadioButtonState(false, 'remove')
        });
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private onStateUpdate(state: State) {
        this.wallet = state.inventory.wallet;
    }

    public edit() {
        this.isAdd = true;
        this.changeAmount = {
            copper: 0,
            silver: 0,
            electrum: 0,
            gold: 0,
            platinum: 0
        };
        this.isEditing = true;
    }

    public save() {
        if (this.isAdd) {
            this.redux.dispatch(addToWallet(this.changeAmount));
        } else {
            this.redux.dispatch(removeFromWallet(this.changeAmount));
        }
        setTimeout(() => {
            this.isEditing = false;
        }, 10);
    }

    public cancel() {
        setTimeout(() => {
            this.isEditing = false;
        }, 10);
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
