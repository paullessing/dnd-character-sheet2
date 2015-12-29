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
        private _traits: string,
        private _ideals: string,
        private _bonds: string,
        private _flaws: string
    ) {}

    get traits(): string {
        return this._traits || '';
    }

    get ideals(): string {
        return this._ideals || '';
    }

    get bonds(): string {
        return this._bonds || '';
    }

    get flaws(): string {
        return this._flaws || '';
    }
}