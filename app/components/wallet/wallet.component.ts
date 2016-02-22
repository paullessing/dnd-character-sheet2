import {Component, OnInit} from 'angular2/core';
import {Amount,IAmount} from "../../entities/currency";
import {WalletRepository} from "../../services/wallet/wallet.repository";
import {WalletActions} from "../../services/wallet/walletActions.service";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'wallet',
    templateUrl: 'app/components/wallet/wallet.component.html'
})
export class WalletComponent implements OnInit {
    public wallet: Amount;
    public changeAmount: IAmount;
    public isEditing: boolean;
    public isAdd: boolean;

    constructor(
        private _walletActions: WalletActions,
        private _walletRepository: WalletRepository
    ) {
    }

    ngOnInit() {
        this._walletRepository.wallet.subscribe(wallet => {
            this.wallet = wallet;
            console.log("Updated wallet", wallet);
        });
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
            this._walletActions.add(this.changeAmount);
        } else {
            if (new Amount(this.changeAmount).totalValue > this.wallet.totalValue) {
                this.changeAmount = {
                    copper: this.wallet.copper,
                    silver: this.wallet.silver,
                    electrum: this.wallet.electrum,
                    gold: this.wallet.gold,
                    platinum: this.wallet.platinum
                };
            }
            this._walletActions.remove(this.changeAmount);
        }
        this.isEditing = false;
    }

    public cancel() {
        this.isEditing = false;
    }
}
