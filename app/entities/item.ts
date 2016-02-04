export interface ItemTemplate {
    name: string;
    weight?: number; // In lbs
    cost?: number; // In cp
    description?: string;
    modifiers?: any[];
}

export interface IItem {
    name: string;
    quantity: number;
    weight?: number; // In lbs
    cost?: number; // In cp
    description?: string;
    modifiers?: any[];
    modifications?: string;
}

export class Item {
    public name: string;
    public quantity: number;
    public weight: number;
    public cost: number;
    public description: string;
    public modifiers: any[];
    public modifications: string;

    constructor(data: IItem) {
        if (!data.name) {
            throw new Error('Item must have a name!');
        }
        this.name = data.name;
        this.quantity = data.quantity || 1;
        this.weight = data.weight || null;
        this.cost = data.cost || null;
        this.description = data.description;
        this.modifiers = data.modifiers || [];
        this.modifications = data.modifications;
        Object.freeze(this.modifiers);
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

export const ITEM_TEMPLATES: ItemTemplate[] = Object.freeze([
    {
        name: 'Ball Bearings (bag of 1000)',
        weight: 2,
        cost: 2,
        description: 'Can be spread in a 10ft square. Any creature entering this area must make a DC13 Dexterity check or fall prone.'
    }
]);