import { Component } from 'angular2/core';
import { PersonalityComponent } from './personality/personality.component';

/**
 * Main app component for the character sheet app
 */
@Component({
    selector: 'character-sheet',
    templateUrl: 'app/app.component.html',
    directives: [PersonalityComponent]
})
export class AppComponent {

}
