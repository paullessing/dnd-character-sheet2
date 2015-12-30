import {Component} from 'angular2/core';
import {Alignment, AlignmentNames} from './alignments';
import {Class, ClassNames} from "./classes";
import {Character} from "./character";
import {OnInit} from "angular2/core";

/**
 * Component showing basic character details.
 */
@Component({
    selector: 'character',
    templateUrl: 'app/character/character.component.html'
})
export class CharacterComponent implements OnInit{
    // TODO allow multiclassing

    public alignments = AlignmentNames;
    public classes = ClassNames;

    public character: Character;

    ngOnInit() {
        // TODO implement using a service
        this.character = new Character({
            name: "Aragorn",
            characterClass: Class.Ranger,
            background: "Noble",
            playerName: "JRR Tolkien",
            race: "Human",
            alignment: Alignment.LawfulGood,
            xp: 10000
        });
    }
}
