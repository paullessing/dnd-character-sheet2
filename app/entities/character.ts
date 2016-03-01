import {Class} from "./classes";
import {Alignment} from "./alignments";
import {ClassNames} from "./classes";
import {AlignmentNames} from "./alignments";

export interface ICharacter {
    name?: string;
    characterClass?: Class;
    background?: string;
    playerName?: string;
    race?: string;
    alignment?: Alignment;
    xp?: number;
}

export class Character implements ICharacter {
    public name: string;
    public characterClass: Class;
    public background: string;
    public playerName: string;
    public race: string;
    public alignment: Alignment;
    public xp: number;

    constructor(data: ICharacter) {
        this.name = data.name || '';
        this.characterClass = data.characterClass;
        this.background = data.background || '';
        this.playerName = data.playerName || '';
        this.race = data.race || '';
        this.alignment = data.alignment;
        this.xp = data.xp && data.xp > 0 ? data.xp : 0;
        Object.freeze(this);
    }

    public get className(): string {
        return ClassNames[this.characterClass];
    }

    public get alignmentName(): string {
        return AlignmentNames[this.alignment];
    }

    public get level(): number {
        // TODO allow multiclassing
        return getLevel(this.xp);
    }

    public get xpToNextLevel(): number {
        return getXpRequiredForLevelUp(this.xp);
    }

    public get proficiencyBonus(): number {
        return Math.floor((this.level - 1) / 4) + 2;
    }

    public equals(that: Character) {
        return this.name === that.name
            && this.characterClass === that.characterClass
            && this.background === that.background
            && this.playerName === that.playerName
            && this.race === that.race
            && this.alignment === that.alignment
            && this.xp === that.xp;
    }

    public getData(): ICharacter {
        return {
            name: this.name,
            characterClass: this.characterClass,
            background: this.background,
            playerName: this.playerName,
            race: this.race,
            alignment: this.alignment,
            xp: this.xp
        };
    }

    public addXp(xp: number) {
        let data = this.getData();
        data.xp += xp;
        return new Character(data);
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