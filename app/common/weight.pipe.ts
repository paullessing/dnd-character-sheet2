import {Pipe, PipeTransform} from "angular2/core";

function getFractional(fraction: number) {
    if (!fraction) {
        return '';
    }
    if (fraction === 0.25) {
        return '¼';
    }
    if (fraction === 0.5) {
        return '½';
    }
    if (fraction === 0.75) {
        return '¾';
    }
    console.log("Fraction:", fraction);
    return '';
}

@Pipe({
    name: 'weight'
})
export class WeightPipe implements PipeTransform {
    public transform(value: any, args: any[]): any {
        console.log('Weight', value);
        const parsedValue = parseFloat(value);
        console.log('parsed weight', parsedValue);
        if (isNaN(parsedValue) || parsedValue === 0) {
            return '—';
        }
        let weight = Math.trunc(parsedValue);
        let fractionValue = Math.abs(parsedValue - weight);
        console.log("FractionValue", fractionValue);
        return weight + getFractional(fractionValue) + (Math.abs(weight) === 1 ? ' lb' : ' lbs');
    }
}
