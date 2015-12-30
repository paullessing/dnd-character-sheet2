import {Component} from 'angular2/core';
import {PersonalityService} from './personality.service';
import {OnInit} from "angular2/core";
import {Personality} from "./personality";
import {IPersonality} from "./personality";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'personality',
    templateUrl: 'app/personality/personality.component.html'
})
export class PersonalityComponent implements OnInit {
    public personality: IPersonality;
    public isEditing: boolean;

    constructor(private _personalityService: PersonalityService) {
    }

    ngOnInit() {
        this._personalityService.getPersonality().subscribe(personality => {
            this.personality = personality;
            console.log("Updated personality", personality);
        });
    }

    public edit() {
        this.personality = {
            traits: this.personality.traits,
            ideals: this.personality.ideals,
            bonds: this.personality.bonds,
            flaws: this.personality.flaws
        };
        this.isEditing = true;
    }

    public save() {
        this._personalityService.updatePersonality(this.personality);
        this.isEditing = false;
    }
}
