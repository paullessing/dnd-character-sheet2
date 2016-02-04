import {Pipe, PipeTransform} from "angular2/core";

import {convertToAmount, Amount} from "../entities/currency";

const names = [
    ' cp',
    ' sp',
    ' gp',
    ' pp',
];
function getPresence(values: Amount) {
    return [
        !!values.copper,
        !!values.silver,
        !!values.gold,
        !!values.platinum,
    ];
}

function toArray(values: Amount) {
    return [
        values.copper,
        values.silver,
        values.gold,
        values.platinum,
    ];
}

@Pipe({
    name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
    public transform(value: any, args: any[]): any {
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue) || parsedValue === 0) {
            return '—';
        }
        let values = convertToAmount(parsedValue, false);
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
