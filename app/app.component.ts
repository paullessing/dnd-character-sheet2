import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {Dispatcher} from "./common/dispatcher";
import {CharacterComponent} from "./components/character/character.component";
import {PersonalityComponent} from './components/personality/personality.component';
import {HistoryRepository} from "./services/history/history.repository";
import {AbilitiesComponent} from "./components/abilities/abilities.component";
import {EditAbilitiesComponent} from "./components/edit-abilities/edit-abilities.component";
import {StorageService} from "./services/storage/storage.service";
import {InventoryComponent} from "./components/inventory/inventory.component";
import {ItemActions} from "./services/item/itemActions.service";
import {ItemRepository} from "./services/item/item.repository";
import {ShopComponent} from "./components/shop/shop.component";
import {EditItemComponent} from "./components/edit-item/edit-item.component";
import {WalletComponent} from "./components/wallet/wallet.component";
import {Inject} from "angular2/core";
import {Store} from 'redux';
import {ReduxConnector} from "./common/connector";
import {update} from "./actions/personality.actions";
import {load} from "./actions/history.actions";
import {Router} from "./common/router.service";

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
        Router,
        Dispatcher,
        HistoryRepository,
        ItemActions, ItemRepository,
        StorageService,
        ReduxConnector,
    ]
})
@RouteConfig([
    {path: '/character',            name: 'Character',          component: CharacterComponent, useAsDefault: true},
    {path: '/abilities',            name: 'Abilities',          component: AbilitiesComponent},
    {path: '/abilities/edit',       name: 'EditAbilities',      component: EditAbilitiesComponent},
    {path: '/personality',          name: 'Personality',        component: PersonalityComponent},
    {path: '/inventory',            name: 'Inventory',          component: InventoryComponent},
    {path: '/edit-item',            name: 'EditItem',           component: EditItemComponent},
    {path: '/shop',                 name: 'Shop',               component: ShopComponent},

])
export class AppComponent {
    constructor(
        redux: ReduxConnector
    ) {
        redux.dispatch(load());
    }
}
