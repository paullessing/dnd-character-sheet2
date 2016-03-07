export interface ItemTemplate {
    name: string;
    weight?: number; // In lbs
    cost?: number; // In cp
    description?: string;
    modifiers?: any[];
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