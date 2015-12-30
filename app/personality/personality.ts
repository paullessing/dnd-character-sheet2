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
    public traits: string;
    public ideals: string;
    public bonds: string;
    public flaws: string;

    constructor(data: IPersonality) {
        this.traits = data.traits || '';
        this.ideals = data.ideals || '';
        this.bonds = data.bonds || '';
        this.flaws = data.flaws || '';
        Object.freeze(this); // Make immutable
    }
}