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
    constructor(
        public traits: string,
        public ideals: string,
        public bonds: string,
        public flaws: string
    ) {
        this.traits = this.traits || '';
        this.ideals = this.ideals || '';
        this.bonds = this.bonds || '';
        this.flaws = this.flaws || '';
        Object.freeze(this); // Make immutable
    }
}