export interface IPersonality {
    traits?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
}

function trimToEmpty(value) {
    if (!value) {
        return '';
    }
    return ('' + value).trim();
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
        this.traits = trimToEmpty(data.traits);
        this.ideals = trimToEmpty(data.ideals);
        this.bonds = trimToEmpty(data.bonds);
        this.flaws = trimToEmpty(data.flaws);
        Object.freeze(this); // Make immutable
    }

    public equals(that: Personality): boolean {
        return this.traits === that.traits
            && this.ideals === that.ideals
            && this.bonds === that.bonds
            && this.flaws === that.flaws;
    }
}