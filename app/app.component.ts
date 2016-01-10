import {Component} from 'angular2/core';
import {Dispatcher} from "./common/dispatcher";
import {CharacterComponent} from "./character/character.component";
import {CharacterService} from "./character/character.service";
import {PersonalityActions} from "./services/personality/personalityActions.service";
import {PersonalityRepository} from "./services/personality/personality.repository";
import {PersonalityComponent} from './components/personality/personality.component';

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
