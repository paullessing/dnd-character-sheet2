import {Component} from 'angular2/core';
import {Dispatcher} from "./common/dispatcher";
import {CharacterComponent} from "./components/character/character.component";
import {PersonalityActions} from "./services/personality/personalityActions.service";
import {PersonalityRepository} from "./services/personality/personality.repository";
import {PersonalityComponent} from './components/personality/personality.component';
import {CharacterActions} from "./services/character/characterActions.service";
import {CharacterRepository} from "./services/character/character.repository";
import {HistoryRepository} from "./services/history/history.repository";
import {AbilitiesRepository} from "./services/abilities/abilities.repository";
import {AbilitiesComponent} from "./components/abilities/abilities.component";
import {SkillDataRepository} from "./services/skills/skillData.repository";
import {SkillsRepository} from "./services/skills/skills.repository";

/**
 * Main app component for the character sheet app.
 */
@Component({
    selector: 'character-sheet',
    templateUrl: 'app/app.component.html',
    directives: [
        PersonalityComponent,
        CharacterComponent,
        AbilitiesComponent,
    ],
    providers: [
        Dispatcher,
        HistoryRepository,
        AbilitiesRepository, SkillDataRepository, SkillsRepository,
        CharacterActions, CharacterRepository,
        PersonalityActions, PersonalityRepository,
    ]
})
export class AppComponent {
    constructor(historyRepo: HistoryRepository) {
        // Must construct to ensure HistoryRepo gets created. TODO investigate
    }
}
