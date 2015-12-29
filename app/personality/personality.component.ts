import {Component} from 'angular2/core';
import {PersonalityService} from './personality.service';
import {OnInit} from "angular2/core";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'personality',
    templateUrl: 'app/personality/personality.component.html'
})
export class PersonalityComponent implements OnInit {
    traits: string;
    ideals: string;
    bonds: string;
    flaws: string;

    constructor(private _personalityService: PersonalityService) {
    }

    ngOnInit() {
        this._personalityService.getPersonality().subscribe(personality => {
            this.traits = personality.traits;
            this.ideals = personality.ideals;
            this.bonds = personality.bonds;
            this.flaws = personality.flaws;
        });
    }

    updateField() {
        this._personalityService.updatePersonality(this.traits, this.ideals, this.bonds, this.flaws);
    }

    save() {
        this._personalityService.storeUpdates();
    }
}
