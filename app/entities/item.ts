export interface Item {
    name: string;
    weight?: number; // In lbs
    cost?: number; // In cp
    description?: string;
    modifiers: any[];
    isCustom?: boolean;
}

export interface OwnedItem {
    item: Item;
    quantity: number;
    modifications?: string;
}

export interface Weapon extends Item {
    type: any;
    damage: any[];
}

interface Dice {
    
}

interface Damage {

}

export const ITEMS = [
    {
        name: 'Ball Bearings (bag of 1000)',
        weight: 2,
        cost: 2,
        description: 'Can be spread in a 10ft square. Any creature entering this area must make a DC13 Dexterity check or fall prone.',
        isCustom: false,
    }
];