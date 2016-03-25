import {Pipe, PipeTransform} from "angular2/core";

import {convertToAmount, Amount} from "../entities/currency";
import {IAmount} from "../entities/currency";

const names = [
    ' cp',
    ' sp',
    ' ep',
    ' gp',
    ' pp',
];
function getPresence(values: IAmount) {
    return [
        !!values.copper,
        !!values.silver,
        !!values.electrum,
        !!values.gold,
        !!values.platinum,
    ];
}

function toArray(values: IAmount) {
    return [
        values.copper,
        values.silver,
        values.electrum,
        values.gold,
        values.platinum,
    ];
}

@Pipe({
    name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
    public transform(value: any, args: any[]): any {
        let values: Amount;
        if (value instanceof Amount) {
            values = value;
        } else {
            let numeric = +value;
            if (isNaN(numeric)) {
                values = new Amount(value);
            } else {
                values = convertToAmount(numeric, false);
            }
        }
        if (values.totalValue <= 0) {
            return '—';
        }
        let array = toArray(values);
        let present = getPresence(values);
        let smallest = present.indexOf(true);
        let biggest = present.lastIndexOf(true);

        if (smallest === biggest) {
            return array[smallest] + names[smallest];
        }
        if (smallest + 1 === biggest) {
            return (array[biggest] * 10 + array[smallest]) + names[smallest];
        }

        let out = '';

        for (let i = biggest; i >= smallest; i--) {
            if (!array[i]) {
                continue;
            }
            if (out) {
                out += ', ';
            }
            out += array[i] + names[i];
        }
        return out;
    }
}
