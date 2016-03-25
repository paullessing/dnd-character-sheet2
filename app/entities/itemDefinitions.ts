export interface ItemTemplate {
    name: string;
    weight?: number; // In lbs
    cost?: string;
    description?: string;
    modifiers?: any[];
}

export const ITEM_TEMPLATES: ItemTemplate[] = Object.freeze([
    {
        name: 'Abacus',
        weight: 2,
        cost: '2gp'
    },
    {
        name: 'Acid (vial)',
        weight: 1,
        cost: '25gp'
    },
    {
        name: 'Alchemist\'s fire (flask)',
        weight: 1,
        cost: '50gp'
    },
    {
        name: 'Arrows (20)',
        weight: 1,
        cost: '1gp'
    },
    {
        name: 'Blowgun needles (50)',
        weight: 1,
        cost: '1gp'
    },
    {
        name: 'Crossbow bolts (20)',
        weight: 1.5,
        cost: '1gp'
    },
    {
        name: 'Sling bullets (20)',
        weight: 1.5,
        cost: '4cp'
    },
    {
        name: 'Antitoxin (vial)',
        cost: '50gp'
    },
    {
        name: 'Arcane focus - Crystal',
        weight: 1,
        cost: '10gp'
    },
    {
        name: 'Arcane focus - Orb',
        weight: 3,
        cost: '20gp'
    },
    {
        name: 'Arcane focus - Rod',
        weight: 2,
        cost: '10gp'
    },
    {
        name: 'Arcane focus - Staff',
        weight: 4,
        cost: '5gp'
    },
    {
        name: 'Arcane focus - Wand',
        weight: 1,
        cost: '10gp'
    },
    {
        name: 'Backpack',
        weight: 5,
        cost: '2gp'
    },
    {
        name: 'Ball Bearings (bag of 1000)',
        weight: 2,
        cost: '1gp',
        description: 'As an action, you can spill these tiny metal balls from their pouch to cover a level, square area that is 10 feet on a side. ' +
        'A creature moving across the covered area must succeed on a DC10 Dexterity saving throw or fall prone. ' +
        'A creature moving through the area at half speed doesn\'t need to make the save.'
    },
    {
        name: 'Barrel',
        weight: 70,
        cost: '2gp'
    },
    {
        name: 'Basket',
        weight: 2,
        cost: '4sp'
    },
    /*
    {
        name: 'Bedroll',
        weight: 7,
        cost: '1gp'
    },
    {
        name: 'Bell',
        cost: '1gp'
    },
    {
        name: 'Blanket',
        weight: 3,
        cost: '5sp'
    },
    {
        name: 'Block and tackle',
        weight: 5,
        cost: '1gp'
    },
    {
        name: 'Book',
        weight: 5,
        cost: '25gp'
    },
    {
        name: 'Bottle, glass',
        weight: 2,
        cost: '2gp'
    },
    {
        name: 'Bucket',
        weight: 2,
        cost: '5cp'
    },
    {
        name: 'Caltrops (bag of 20)',
        weight: 2,
        cost: '1gp'
    },
    {
        name: 'Candle',
        cost: '1cp'
    },
    {
        name: 'Case, crossbow bolt',
        weight: 1,
        cost: '1gp'
    },
    {
        name: 'Case, map or scroll',
        weight: 1,
        cost: '1gp'
    },
    {
        name: 'Chain (10 feet)',
        weight: 10,
        cost: '5gp'
    },
    {
        name: 'Chalk (1 piece',
        cost: '1cp'
    },
    {
        name: 'Chest',
        weight: 25,
        cost: '5gp'
    },
    {
        name: 'Climber\'s kit',
        weight: 12,
        cost: '25gp'
    },
    {
        name: 'Clothes, common',
        weight: 3,
        cost: '5sp'
    },
    {
        name: 'Clothes, costume',
        weight: 4,
        cost: '5gp'
    },
    {
        name: 'Clothes, fine',
        weight: 6,
        cost: '15gp'
    },
    {
        name: 'Clothes, traveler\'s',
        weight: 4,
        cost: '2gp'
    },
    {
        name: 'Crowbar',
        weight: 5,
        cost: '2gp'
    },
    {
        name: 'Druidic Focus - Sprig of mistletoe',
        cost: '1gp'
    },
    {
        name: 'Druidic Focus - Totem',
        cost: '1gp'
    },
    {
        name: 'Druidic Focus - Wooden staff',
        weight: 4,
        cost: '5gp'
    },
    {
        name: 'Druidic Focus - Yew wand',
        weight: 1,
        cost: '10gp'
    },
    {
        name: 'Fishing tackle',
        weight: 4,
        cost: '1gp'
    },
    {
        name: 'Flask or tankard',
        weight: 1,
        cost: '2cp'
    },
    {
        name: 'Grappling hook',
        weight: 4,
        cost: '2gp'
    },
    {
        name: 'Hammer',
        weight: 3,
        cost: '1gp'
    },
    {
        name: 'Hammer, sledge',
        weight: 10,
        cost: '2gp'
    },
    {
        name: 'Healer\'s kit',
        weight: 3,
        cost: '5gp'
    },
    */
]);