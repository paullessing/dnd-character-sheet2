import {Component} from 'angular2/core';

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'character',
    templateUrl: 'app/character/character.component.html'
})
export class CharacterComponent {
    alignments: string[] = [
        "Lawful Good",
        "Lawful Neutral",
        "Lawful Evil",
        "Neutral Good",
        "True Neutral",
        "Neutral Evil",
        "Chaotic Good",
        "Chaotic Neutral",
        "Chaotic Evil"
    ];
    classes: string[] = [
        // TODO missing loads of classes
        "Bard",
        "Ranger",
        "Rogue",
        "Paladin",
        "Warlock"
    ]
}
