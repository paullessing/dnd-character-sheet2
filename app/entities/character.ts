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
}

export class Character implements ICharacter {
    public name: string;
    public characterClass: Class;
    public background: string;
    public playerName: string;
    public race: string;
    public alignment: Alignment;

    constructor(data: ICharacter) {
        this.name = data.name || '';
        this.characterClass = data.characterClass;
        this.background = data.background || '';
        this.playerName = data.playerName || '';
        this.race = data.race || '';
        this.alignment = data.alignment;
        Object.freeze(this);
    }

    public get className(): string {
        return ClassNames[this.characterClass];
    }

    public get alignmentName(): string {
        return AlignmentNames[this.alignment];
    }

    public equals(that: Character) {
        return this.name === that.name
            && this.characterClass === that.characterClass
            && this.background === that.background
            && this.playerName === that.playerName
            && this.race === that.race
            && this.alignment === that.alignment
    }

    public getData(): ICharacter {
        return {
            name: this.name,
            characterClass: this.characterClass,
            background: this.background,
            playerName: this.playerName,
            race: this.race,
            alignment: this.alignment,
        };
    }
}
