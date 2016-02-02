export interface IItem {
    name: string;
    weight?: number; // In lbs
    cost?: number; // In cp
    description?: string;
    modifiers?: any[];
    isCustom?: boolean;
}

export class Item implements IItem {
    public name: string;
    public weight: number;
    public cost: number;
    public description: string;
    public modifiers: any[];
    public isCustom: boolean;

    constructor(data: IItem) {
        this.name = data.name;
        this.weight = data.weight || null;
        this.cost = data.cost || null;
        this.description = data.description;
        this.modifiers = data.modifiers || [];
        this.isCustom = typeof data.isCustom === 'undefined' || !!data.isCustom;
        Object.freeze(this.modifiers);
        Object.freeze(this);
    }
}

export interface IOwnedItem {
    item: IItem;
    quantity: number;
    modifications?: string;
}

export class OwnedItem {
    public item: Item;
    public quantity: number;
    public modifications: string;

    constructor(data: IOwnedItem) {
        this.item = new Item(data.item);
        this.quantity = data.quantity || 1;
        this.modifications = data.modifications;
        Object.freeze(this);
    }
}

export interface Weapon extends IItem {
    type: any;
    damage: DamageDice[];
}

interface DamageDice {
    count: number;
    size: number;
}

const IITEMS: IItem[] = [
    {
        name: 'Ball Bearings (bag of 1000)',
        weight: 2,
        cost: 2,
        description: 'Can be spread in a 10ft square. Any creature entering this area must make a DC13 Dexterity check or fall prone.',
        isCustom: false
    }
];

export const ITEMS = IITEMS.map(item => new Item(item));