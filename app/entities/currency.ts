import * as _ from 'underscore';

export interface IAmount {
    copper?:   number;
    silver?:   number;
    electrum?: number;
    gold?:     number;
    platinum?: number;
}

const shortAmounts = {
    'c': 'copper',
    's': 'silver',
    'e': 'electrum',
    'g': 'gold',
    'p': 'platinum'
};

function parseStringToAmount(value: string): IAmount {
    const input = value.toLowerCase();
    const pattern = /(?:(\d+)\s*(cp?|copper|sp?|silver|ep?|electrum|gp?|gold|pp?|platinum)\b)/gi;
    let match;
    let amount: IAmount = {};

    while ((match = pattern.exec(input)) !== null) {
        if (match.index === pattern.lastIndex) {
            pattern.lastIndex++;
        }
        const name = shortAmounts[match[2][0]]; // First letter is indicative of the value
        amount[name] = (amount[name] || 0) + parseInt(match[1], 10);
    }
    return amount;
}

export class Amount implements IAmount {
    public copper:   number;
    public silver:   number;
    public electrum: number;
    public gold:     number;
    public platinum: number;

    public totalValue: number;

    constructor(value: IAmount | string) {
        let amount: IAmount = (typeof value === 'string') ?
            parseStringToAmount(value) :
            value;
        this.copper   = amount.copper   || 0;
        this.silver   = amount.silver   || 0;
        this.electrum = amount.electrum || 0;
        this.gold     = amount.gold     || 0;
        this.platinum = amount.platinum || 0;
        this.totalValue = toCopper(this);
        Object.freeze(this);
    }

    public toString(): string {
        if (this.totalValue === 0) {
            return '0 gp';
        }
        let s = '';
        Currencies.forEach(currency => {
            if (this[currency] <= 0) {
                return;
            }
            s = this[currency] + ' ' + Exchange[currency].shortName + (s.length > 0 ? ', ' + s : '');
        });
        return s;
    }

    public minus(cost: IAmount | number): Amount {
        const costInCopper = (typeof cost === 'number' ? cost : toCopper(cost));
        const costAsAmount = (typeof cost === 'number' ? convertToAmount(cost) : cost);

        let remainder = this.totalValue - costInCopper;
        if (remainder < 0) {
            throw new Error('Insufficient funds to pay for this!');
        }

        let newWallet: IAmount = this.getData();

        Currencies.forEach(currency => {
            newWallet[currency] = (this[currency] || 0) - (costAsAmount[currency] || 0);
        });

        // Try to clear discrepancies by going up first
        while (newWallet.copper < 0) {
            newWallet.silver--;
            newWallet.copper += 10;
        }
        while (newWallet.silver < 0) {
            if (newWallet.electrum > 0) {
                newWallet.electrum--;
                newWallet.silver += 5;
            } else {
                newWallet.gold--;
                newWallet.silver += 10;
            }
        }
        while (newWallet.electrum < 0) {
            newWallet.gold--;
            newWallet.electrum += 2;
        }
        while (newWallet.gold < 0) {
            newWallet.platinum--;
            newWallet.gold += 10;
        }

        // Now try to clear discrepancies by converting smaller amounts up
        if (newWallet.platinum < 0) {
            newWallet.gold += newWallet.platinum * 10;
            newWallet.platinum = 0;
        }
        if (newWallet.gold < 0) {
            if (newWallet.electrum > 0) {
                newWallet.electrum += newWallet.gold * 2;
            } else {
                newWallet.silver += newWallet.silver * 10;
            }
            newWallet.gold = 0;
        }
        if (newWallet.electrum < 0) {
            newWallet.silver += newWallet.electrum * 5;
            newWallet.electrum = 0;
        }
        if (newWallet.silver < 0) {
            newWallet.copper += newWallet.silver * 10;
            newWallet.silver = 0;
        }

        return new Amount(newWallet);
    }

    public plus(that: IAmount) {
        let newData: IAmount = {};
        Currencies.forEach(currency => newData[currency] = (this[currency] || 0) + (that[currency] || 0));
        return new Amount(newData);
    }

    public getData(): IAmount {
        return {
            copper: this.copper,
            silver: this.silver,
            electrum: this.electrum,
            gold: this.gold,
            platinum: this.platinum
        };
    }
}

export class Currency {
    constructor(
        public name: string,
        public shortName: string,
        public multiplier: number) {}
}

export const Exchange: { [name: string]: Currency } = { // Must be ascending
    copper:   new Currency("Copper",   "cp", 1),
    silver:   new Currency("Silver",   "sp", 10),
    electrum: new Currency("Electrum", "ep", 50),
    gold:     new Currency("Gold",     "gp", 100),
    platinum: new Currency("Platinum", "pp", 1000)
};

export const Currencies: string[] = Object.freeze([
    'copper',
    'silver',
    'electrum',
    'gold',
    'platinum'
]);

export function toCopper(amount: IAmount) {
    let total = 0;
    Object.keys(Exchange).forEach((key) => {
        if (amount[key] && typeof amount[key] === 'number') {
            total += amount[key] * Exchange[key].multiplier;
        }
    });
    return total;
}

export function convertToAmount(copper: number, includePlatinum: boolean = true): IAmount {
    let value = copper;
    let amount: IAmount = {};
    amount.copper = value % 10;
    value = Math.floor(value / 10);
    amount.silver = value % 10;
    value = Math.floor(value / 10);
    if (includePlatinum) {
        amount.gold = value % 10;
        value = Math.floor(value / 10);
        amount.platinum = value;
    } else {
        amount.gold = value;
    }
    return amount;
}
