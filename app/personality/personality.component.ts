import {Component} from 'angular2/core';
import {PersonalityService} from './personality.service';
import {OnInit} from "angular2/core";
import {Personality, IPersonality} from "./personality";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'personality',
    templateUrl: 'app/personality/personality.component.html'
})
export class PersonalityComponent implements OnInit {
    public personality: IPersonality;
    public editPersonality: IPersonality;
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
        this.editPersonality = {
            traits: this.personality.traits,
            ideals: this.personality.ideals,
            bonds: this.personality.bonds,
            flaws: this.personality.flaws
        };
        this.isEditing = true;
    }

    public save() {
        this._personalityService.updatePersonality(this.editPersonality);
        this.isEditing = false;
    }

    public cancel() {
        this.isEditing = false;
    }
}
