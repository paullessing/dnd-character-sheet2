import {Component} from 'angular2/core';
import {PersonalityService} from './personality.service';
import {OnInit} from "angular2/core";
import {Personality} from "./personality";

/**
 * Component showing personality traits, motivation etc.
 */
@Component({
    selector: 'personality',
    templateUrl: 'app/personality/personality.component.html'
})
export class PersonalityComponent implements OnInit {
    personality: Personality;

    constructor(private _personalityService: PersonalityService) {
    }

    ngOnInit() {
        this._personalityService.getPersonality().subscribe(personality => {
            this.personality = personality;
        });
    }
}
