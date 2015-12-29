import {Component} from 'angular2/core';
import {Alignment, AlignmentNames} from './alignments';
import {Class, ClassNames} from "./classes";

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'character',
    templateUrl: 'app/character/character.component.html'
})
export class CharacterComponent {
    // TODO allow multiclassing

    alignments = AlignmentNames;
    classes = ClassNames;

    name: string;
    characterClass: Class;
    background: string;
    playerName: string;
    race: string;
    alignment: Alignment;
    xp: number;
}
