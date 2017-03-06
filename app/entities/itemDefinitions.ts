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
        cost: '25gp',
        description: 'As an action, you can splash the contents of this vial onto a creature within 5 feet of you ' +
        'or throw the vial up to 20 feet, shattering it on impact. In either case, make a ranged attack  against ' +
        'a creature or object, treating the acid as an improvised weapon. On a hit, the target takes 2d 6 acid damage.'
    },
    {
        name: 'Alchemist\'s fire (flask)',
        weight: 1,
        cost: '50gp',
        description: 'This sticky, adhesive fluid ignites when exposed to air. As an action, you can throw this flask ' +
        'up to 20 feet, shattering it on impact. Make a ranged attack against a creature or object, treating the ' +
        'alchemist\'s fire as an improvised weapon. On a hit, the target takes 1d4 fire damage at the start of each ' +
        'of its turns. A creature can end this damage by using its action to make a DC 10 Dexterity check to ' +
        'extinguish the flames.'
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
        cost: '50gp',
        description: 'A creature that drinks this vial of liquid gains advantage on saving throws against poison for ' +
        '1 hour. It confers no benefit to undead or constructs.'
    },
    {
        name: 'Arcane focus - Crystal',
        weight: 1,
        cost: '10gp',
        description: 'An arcane focus is a special item—an orb, a crystal, a rod, a specially constructed staff, ' +
        'a wand-like length of wood, or some similar item—designed to channel the power of arcane spells. A sorcerer, ' +
        'warlock, or wizard can use such an item as a spellcasting focus, as described in chapter 10.'
    },
    {
        name: 'Arcane focus - Orb',
        weight: 3,
        cost: '20gp',
        description: 'An arcane focus is a special item—an orb, a crystal, a rod, a specially constructed staff, ' +
        'a wand-like length of wood, or some similar item—designed to channel the power of arcane spells. A sorcerer, ' +
        'warlock, or wizard can use such an item as a spellcasting focus, as described in chapter 10.'
    },
    {
        name: 'Arcane focus - Rod',
        weight: 2,
        cost: '10gp',
        description: 'An arcane focus is a special item—an orb, a crystal, a rod, a specially constructed staff, ' +
        'a wand-like length of wood, or some similar item—designed to channel the power of arcane spells. A sorcerer, ' +
        'warlock, or wizard can use such an item as a spellcasting focus, as described in chapter 10.'
    },
    {
        name: 'Arcane focus - Staff',
        weight: 4,
        cost: '5gp',
        description: 'An arcane focus is a special item—an orb, a crystal, a rod, a specially constructed staff, ' +
        'a wand-like length of wood, or some similar item—designed to channel the power of arcane spells. A sorcerer, ' +
        'warlock, or wizard can use such an item as a spellcasting focus, as described in chapter 10.'
    },
    {
        name: 'Arcane focus - Wand',
        weight: 1,
        cost: '10gp',
        description: 'An arcane focus is a special item—an orb, a crystal, a rod, a specially constructed staff, ' +
        'a wand-like length of wood, or some similar item—designed to channel the power of arcane spells. A sorcerer, ' +
        'warlock, or wizard can use such an item as a spellcasting focus, as described in chapter 10.'
    },
    {
        name: 'Backpack',
        weight: 5,
        cost: '2gp',
        description: 'Capacity: 1 cubic foot/30 pounds of gear'
    },
    {
        name: 'Ball Bearings (bag of 1000)',
        weight: 2,
        cost: '1gp',
        description: 'As an action, you can spill these tiny metal balls from their pouch to cover a level, ' +
        'square area that is 10 feet on a side. ' +
        'A creature moving across the covered area must succeed on a DC10 Dexterity saving throw or fall prone. ' +
        'A creature moving through the area at half speed doesn\'t need to make the save.'
    },
    {
        name: 'Barrel',
        weight: 70,
        cost: '2gp',
        description: 'Capacity: 40 gallons liquid, 4 cubic feet solid'
    },
    {
        name: 'Basket',
        weight: 2,
        cost: '4sp',
        description: 'Capacity: 2 cubic feet/40 pounds of gear'
    },

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
        cost: '1gp',
        description: 'A set of pulleys with a cable threaded through them and a hook to attach to objects, a block ' +
        'and tackle allows you to hoist up to four times the weight you can normally lift.'
    },
    {
        name: 'Book',
        weight: 5,
        cost: '25gp',
        description: 'A book might contain poetry, historical accounts, information pertaining to a particular field ' +
        'of lore, diagrams and notes on gnomish contraptions, or just about anything else that can be represented ' +
        'using text or pictures. A book of spells is a spellbook (described later in this section).'
    },
    {
        name: 'Bottle, glass',
        weight: 2,
        cost: '2gp',
        description: 'Capacity: 1½ pints liquid'
    },
    {
        name: 'Bucket',
        weight: 2,
        cost: '5cp',
        description: 'Capacity: 3 gallons liquid, ½ cubic foot solid'
    },
    {
        name: 'Caltrops (bag of 20)',
        weight: 2,
        cost: '1gp',
        description: 'As an action, you can spread a single bag of caltrops to cover a 5-foot-square area. Any ' +
        'creature that enters the area must succeed on a DC 15 Dexterity saving throw or stop moving and take ' +
        '1 piercing damage. Until the creature regains at least 1 hit point, its w alking speed is reduced by 10 feet. ' +
        'A creature moving through the area at half speed doesn\'t need to make the saving throw.'
    },
    {
        name: 'Candle',
        cost: '1cp',
        description: 'For 1 hour, a candle sheds bright light in a 5-foot radius and dim light for an additional 5 feet.'
    },
    {
        name: 'Case, crossbow bolt',
        weight: 1,
        cost: '1gp',
        description: 'This wooden case can hold up to twenty crossbow bolts.'
    },
    {
        name: 'Case, map or scroll',
        weight: 1,
        cost: '1gp',
        description: 'This cylindrical leather case can hold up to ten rolled-up sheets of paper or five rolled-up ' +
        'sheets of parchment.'
    },
    {
        name: 'Chain (10 feet)',
        weight: 10,
        cost: '5gp',
        description: 'A chain has 10 hit points. It can be burst with a successful DC 20 Strength check.'
    },
    {
        name: 'Chalk (1 piece)',
        cost: '1cp'
    },
    {
        name: 'Chest',
        weight: 25,
        cost: '5gp',
        description: 'Capacity: 12 cubic feet solid/300 pounds of gear'
    },
    {
        name: 'Climber\'s kit',
        weight: 12,
        cost: '25gp',
        description: 'A climber\'s kit includes special pitons, boot tips, gloves, and a harness. You can use the ' +
        'climber\'s kit as an action to anchor yourself; when you do, you can\'t fall more than 25 feet from the ' +
        'point where you anchored yourself, and you can\'t climb more than 25 feet away from that point ' +
        'without undoing the anchor.'
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
        name: 'Component pouch',
        weight: 2,
        cost: '25gp',
        description: 'A component pouch is a small, watertight leather belt pouch that has compartments to hold all ' +
        'the material components and other special items you need to cast your spells, except for those components ' +
        'that have a specific cost (as indicated in a spell\'s description).'
    },
    {
        name: 'Crowbar',
        weight: 5,
        cost: '2gp',
        description: 'Using a crowbar grants advantage to Strength checks where the crowbar’s leverage can be applied.'
    },
    {
        name: 'Druidic Focus - Sprig of mistletoe',
        cost: '1gp',
        description: 'A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another ' +
        'special wood , a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, ' +
        'and teeth from sacred animals. A druid can use such an object as a spellcasting focus, as described in chapter 10.'
    },
    {
        name: 'Druidic Focus - Totem',
        cost: '1gp',
        description: 'A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another ' +
        'special wood , a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, ' +
        'and teeth from sacred animals. A druid can use such an object as a spellcasting focus, as described in chapter 10.'
    },
    {
        name: 'Druidic Focus - Wooden staff',
        weight: 4,
        cost: '5gp',
        description: 'A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another ' +
        'special wood , a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, ' +
        'and teeth from sacred animals. A druid can use such an object as a spellcasting focus, as described in chapter 10.'
    },
    {
        name: 'Druidic Focus - Yew wand',
        weight: 1,
        cost: '10gp',
        description: 'A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another ' +
        'special wood , a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, ' +
        'and teeth from sacred animals. A druid can use such an object as a spellcasting focus, as described in chapter 10.'
    },
    {
        name: 'Fishing tackle',
        weight: 4,
        cost: '1gp',
        description: 'This kit includes a wooden rod, silken line, corkwood bobbers, steel hooks, lead sinkers, velvet ' +
        'lures, and narrow netting.'
    },
    {
        name: 'Flask or tankard',
        weight: 1,
        cost: '2cp',
        description: 'Capacity: 1 pint liquid'
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
        cost: '5gp',
        description: 'This kit is a leather pouch containing bandages, salves, and splints. The kit has ten uses. ' +
        'As an action, you can expend one use of the kit to stabilize a creature that has 0 hit points, without ' +
        'needing to make a Wisdom (Medicine) check.'
    },
    {
        name: 'Holy symbol - Amulet',
        weight: 1,
        cost: '5gp',
        description: 'A holy symbol is a representation of a god or pantheon. It might be an amulet depicting a symbol ' +
        'representing a deity, the same symbol carefully engraved or inlaid as an emblem on a shield, or a tiny box ' +
        'holding a fragment of a sacred relic. Appendix B lists the symbols commonly associated with many gods in the ' +
        'multiverse. A cleric or paladin can use a holy symbol as a spellcasting focus, as described in chapter 10. ' +
        'To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield.'
    },
    {
        name: 'Holy symbol - Emblem',
        cost: '5gp',
        description: 'A holy symbol is a representation of a god or pantheon. It might be an amulet depicting a symbol ' +
        'representing a deity, the same symbol carefully engraved or inlaid as an emblem on a shield, or a tiny box ' +
        'holding a fragment of a sacred relic. Appendix B lists the symbols commonly associated with many gods in the ' +
        'multiverse. A cleric or paladin can use a holy symbol as a spellcasting focus, as described in chapter 10. ' +
        'To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield.'
    },
    {
        name: 'Holy symbol - Reliquary',
        weight: 2,
        cost: '5gp',
        description: 'A holy symbol is a representation of a god or pantheon. It might be an amulet depicting a symbol ' +
        'representing a deity, the same symbol carefully engraved or inlaid as an emblem on a shield, or a tiny box ' +
        'holding a fragment of a sacred relic. Appendix B lists the symbols commonly associated with many gods in the ' +
        'multiverse. A cleric or paladin can use a holy symbol as a spellcasting focus, as described in chapter 10. ' +
        'To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield.'
    },
    {
        name: 'Holy water (flask)',
        weight: 1,
        cost: '25gp',
        description: 'A s an action, you can splash the contents of this flask onto a creature within 5 feet of you ' +
        'or throw it up to 20 feet, shattering it on impact. In either case, make a ranged attack against a target ' +
        'creature, treating the holy water as an improvised weapon. If the target is a fiend or undead, ' +
        'it takes 2d6 radiant damage.'
    },
]);