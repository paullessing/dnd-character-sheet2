export interface PersonalityUpdate {
    traits?: string;
    ideals?: string;
    bonds?: string;
    flaws?: string;
}

/**
 * Contains information about a character's personality.
 */
export class Personality {
    constructor(
        private _traits: string,
        private _ideals: string,
        private _bonds: string,
        private _flaws: string
    ) {}

    update(data: PersonalityUpdate) {
        if (typeof data.traits !== 'undefined') {
            this._traits = data.traits;
        }
        if (typeof data.ideals!== 'undefined') {
            this._ideals = data.ideals;
        }
        if (typeof data.bonds !== 'undefined') {
            this._bonds = data.bonds;
        }
        if (typeof data.flaws !== 'undefined') {
            this._flaws = data.flaws;
        }
    }

    get traits(): string {
        return this._traits;
    }

    get ideals(): string {
        return this._ideals;
    }

    get bonds(): string {
        return this._bonds;
    }

    get flaws(): string {
        return this._flaws;
    }
}