import {Component, Input, OnChanges, SimpleChange} from "angular2/core";
import {Amount} from "../../entities/currency";

@Component({
    selector: 'amount',
    styles: [`
.amount__value {
    display: inline-block;
    line-height: 28px;
    width: 24px;
    margin-right: 8px;
    font-size: 0.8em;
    position: relative;
    text-align: center;
    z-index: 0;
}
.amount__value[hidden] {
    display: none;
}
.amount__value:before {
    display: inline-block;
    content: '';
    margin-right: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    box-shadow: 0 2px 0 0 rgba(0,0,0,0.4);
}
.amount__value--platinum:before {
    background-color: #8DBAC9;
}
.amount__value--gold:before {
    background-color: #FFD700;
}
.amount__value--electrum:before {
    background-color: #928729;
}
.amount__value--silver:before {
    background-color: #C0C0C0;
}
.amount__value--copper:before {
    background-color: #C87533;
}
    `],
    template: `
<span *ngIf="amount">
    <span
        [hidden]="amount.platinum <= 0"
        class="amount__value amount__value--platinum"
        title="{{ amount.platinum }} pp"
    >{{ amount.platinum }}</span>
    <span
        [hidden]="amount.gold <= 0 && amount.totalValue > 0"
        class="amount__value amount__value--gold"
        title="{{ amount.gold }} gp"
    >{{ amount.gold }}</span>
    <span
        [hidden]="amount.electrum <= 0"
        class="amount__value amount__value--electrum"
        title="{{ amount.electrum }} ep"
    >{{ amount.electrum }}</span>
    <span
        [hidden]="amount.silver <= 0"
        class="amount__value amount__value--silver"
        title="{{ amount.silver }} sp"
    >{{ amount.silver }}</span>
    <span
        [hidden]="amount.copper <= 0"
        class="amount__value amount__value--copper"
        title="{{ amount.copper }} cp"
    >{{ amount.copper }}</span>
</span>`,
})
export class AmountComponent implements OnChanges {
    @Input('value')
    public inputAmount: Amount;
    public amount: Amount;

    ngOnChanges(changes: { [property: string]: SimpleChange }) {
        if (changes['inputAmount']) {
            let amount = changes['inputAmount'].currentValue;
            if (amount instanceof Amount) {
                this.amount = amount;
            } else {
                this.amount = new Amount(amount);
            }
        }
    }
}