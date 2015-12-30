export interface IPersonality {
    traits?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
}

/**
 * Contains information about a character's personality.
 */
export class Personality implements IPersonality {
    traits: string;
    ideals: string;
    bonds: string;
    flaws: string;

    constructor(
        traits: string | IPersonality,
        ideals?: string,
        bonds?: string,
        flaws?: string
    ) {
        if (typeof traits !== 'string') {
            let personality: IPersonality = traits;
            traits = personality.traits;
            ideals = personality.ideals;
            bonds = personality.bonds;
            flaws = personality.flaws;
        }
        this.traits = (traits as string) || '';
        this.ideals = ideals || '';
        this.bonds = bonds || '';
        this.flaws = flaws || '';
        Object.freeze(this); // Make immutable
    }
}