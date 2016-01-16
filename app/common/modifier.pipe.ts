import {Pipe, PipeTransform} from "angular2/core";

@Pipe({
    name: 'modifier'
})
export class ModifierPipe implements PipeTransform {
    public transform(value: any, args: any[]): any {
        var parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue)) {
            return '';
        }
        return (parsedValue <= 0 ? '' : '+') + parsedValue;
    }
}
