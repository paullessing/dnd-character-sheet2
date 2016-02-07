export interface ItemTemplate {
    name: string;
    weight?: number; // In lbs
    cost?: number; // In cp
    description?: string;
    modifiers?: any[];
}

export interface IItem {
    id?: number;
    name: string;
    quantity: number;
    weight?: number; // In lbs
    cost?: number; // In cp
    description?: string;
    modifiers?: any[];
    modifications?: string;
}

export class Item {
    public id: number;
    public name: string;
    public quantity: number;
    public weight: number;
    public cost: number;
    public description: string;
    public modifiers: any[];
    public modifications: string;

    constructor(data: IItem) {
        if (!data.id) {
            throw new Error('Item must have an ID!');
        }
        if (!data.name) {
            throw new Error('Item must have a name!');
        }
        this.id = data.id;
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

    public getData(): IItem {
        return this;
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
        name: 'Abacus',
        weight: 2,
        cost: 200
    },
    // Acid
    // Alchemist's Fire
    // Ammunition
    // Antitoxin
    // Arcane Focus
    {
        name: 'Backpack',
        weight: 5,
        cost: 200
    },
    {
        name: 'Ball Bearings (bag of 1000)',
        weight: 2,
        cost: 2,
        description: 'As an action, you can spill these tiny metal balls from their pouch to cover a level, square area that is 10 feet on a side. ' +
        'A creature moving across the covered area must succeed on a DC10 Dexterity saving throw or fall prone. ' +
        'A creature moving through the area at half speed doesn\'t need to make the save.'
    },
    {
        name: 'Barrel',
        weight: 70,
        cost: 200
    },
    {
        name: 'Basket',
        weight: 2,
        cost: 40
    },
    {
        name: 'Bedroll',
        weight: 7,
        cost: 100
    },
    {
        name: 'Bell',
        cost: 100
    },
]);