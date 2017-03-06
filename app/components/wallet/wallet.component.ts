import {Component, OnDestroy} from 'angular2/core';

import {ReduxConnector} from "../../common/connector";
import {addToWallet, removeFromWallet} from "../../actions/inventory.actions";
import {Amount} from "../../entities/currency";
import {State} from "../../entities/state";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'wallet',
    templateUrl: 'app/components/wallet/wallet.component.html'
})
export class WalletComponent implements OnDestroy {
    public wallet: Amount;
    private unsubscribe: () => void;

    constructor(
        private redux: ReduxConnector
    ) {
        this.unsubscribe = this.redux.connect((state: State) => this.onStateUpdate(state));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private onStateUpdate(state: State) {
        this.wallet = state.inventory.wallet;
    }
}
