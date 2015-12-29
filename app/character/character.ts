import {Class} from "./classes";
import {Alignment} from "./alignments";

export class Character {
    constructor(
        public name: string,
        public characterClass: Class,
        public background: string,
        public playerName: string,
        public race: string,
        public alignment: Alignment,
        public xp: number
    ) {
        this.name = this.name || '';
        this.background = this.background || '';
        this.playerName = this.playerName || '';
        this.race = this.race || '';
        this.xp = this.xp && this.xp > 0 ? this.xp : 0;
        Object.freeze(this);
    }

    public get level(): number {
        // TODO allow multiclassing
        return getLevel(this.xp);
    }

    public get xpToNextLevel(): number {
        return getXpRequiredForLevelUp(this.xp);
    }
}

var xpToLevel = [
    0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

function getLevel(xp: number) {
    for (var level = xpToLevel.length - 1; level >= 0; level--) {
        if (xp >= xpToLevel[level]) {
            return level + 1;
        }
    }
    return 1; // Cannot be less than level 1
}

function getXpRequiredForLevelUp(xp) {
    var level = getLevel(xp);
    if (level >= xpToLevel.length) {
        return 0;
    } else {
        return xpToLevel[level] - xp;
    }
}