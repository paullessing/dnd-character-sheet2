import {Component} from 'angular2/core';
import {PersonalityComponent} from './personality/personality.component';
import {PersonalityService} from './personality/personality.service';
import {CharacterComponent} from "./character/character.component";

/**
 * Main app component for the character sheet app.
 */
@Component({
    selector: 'character-sheet',
    templateUrl: 'app/app.component.html',
    directives: [PersonalityComponent, CharacterComponent],
    providers: [PersonalityService]
})
export class AppComponent {

}
