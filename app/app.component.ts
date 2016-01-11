import {Component} from 'angular2/core';
import {Dispatcher} from "./common/dispatcher";
import {CharacterComponent} from "./components/character/character.component";
import {CharacterService} from "./character/character.service";
import {PersonalityActions} from "./services/personality/personalityActions.service";
import {PersonalityRepository} from "./services/personality/personality.repository";
import {PersonalityComponent} from './components/personality/personality.component';
import {CharacterActions} from "./services/character/characterActions.service";
import {CharacterRepository} from "./services/character/character.repository";

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
        CharacterActions, CharacterRepository,
        PersonalityActions, PersonalityRepository,
    ]
})
export class AppComponent {

}
