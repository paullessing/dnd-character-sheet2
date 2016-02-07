import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
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
import {AbilityDataRepository} from "./services/abilities/abilityData.repository";
import {EditAbilitiesComponent} from "./components/edit-abilities/edit-abilities.component";
import {AbilitiesActions} from "./services/abilities/abilitiesActions.service";
import {SkillsActions} from "./services/skills/skillsActions.service";
import {StorageService} from "./services/storage/storage.service";
import {InventoryComponent} from "./components/inventory/inventory.component";
import {ItemActions} from "./services/item/itemActions.service";
import {ItemRepository} from "./services/item/item.repository";
import {ShopComponent} from "./components/shop/shop.component";

/**
 * Main app component for the character sheet app.
 */
@Component({
    selector: 'character-sheet',
    templateUrl: 'app/app.component.html',
    directives: [
        ROUTER_DIRECTIVES,
        PersonalityComponent,
        CharacterComponent,
        AbilitiesComponent,
        EditAbilitiesComponent,
        ShopComponent
    ],
    providers: [
        Dispatcher,
        HistoryRepository,
        AbilitiesActions, AbilityDataRepository, AbilitiesRepository,
        SkillsActions, SkillDataRepository, SkillsRepository,
        CharacterActions, CharacterRepository,
        PersonalityActions, PersonalityRepository,
        ItemActions, ItemRepository,
        StorageService,
    ]
})
@RouteConfig([
    {path: '/character',            name: 'Character',          component: CharacterComponent, useAsDefault: true},
    {path: '/abilities',            name: 'Abilities',          component: AbilitiesComponent},
    {path: '/abilities/edit',       name: 'EditAbilities',      component: EditAbilitiesComponent},
    {path: '/personality',          name: 'Personality',        component: PersonalityComponent},
    {path: '/inventory',            name: 'Inventory',          component: InventoryComponent},
    {path: '/shop',                 name: 'Shop',               component: ShopComponent},

])
export class AppComponent {
    constructor(
        historyRepo: HistoryRepository
    ) {
        // Must construct to ensure HistoryRepo gets created. TODO investigate
    }
}
