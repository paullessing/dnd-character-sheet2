import {Component} from 'angular2/core';
import {PersonalityComponent} from './personality/personality.component';
import {CharacterComponent} from "./character/character.component";
import {CharacterService} from "./character/character.service";
import {PersonalityRepository} from "./personality/personality.repository";
import {Dispatcher} from "./common/dispatcher";
import {PersonalityActions} from "./personality/personalityActions.service";

/**
 * Main app component for the character sheet app.
 */
@Component({
    selector: 'character-sheet',
    templateUrl: 'app/app.component.html',
    directives: [
        PersonalityComponent,
        CharacterComponent,
    ],
    providers: [
        Dispatcher,
        CharacterService,
        PersonalityActions, PersonalityRepository,
    ]
})
export class AppComponent {

}
