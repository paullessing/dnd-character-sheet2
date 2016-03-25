import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {Dispatcher} from "./common/dispatcher";
import {Inject} from "angular2/core";
import {Store} from 'redux';
import {ReduxConnector} from "./common/connector";
import {update} from "./actions/personality.actions";
import {load} from "./actions/storage.actions.ts";
import {Router} from "./common/router.service";
import {
    AbilitiesComponent,
    CharacterComponent,
    PersonalityComponent,
    EditAbilitiesComponent,
    ShopComponent,
    InventoryComponent,
    EditItemComponent
} from "./components/_module";

/**
 * Main app component for the character sheet app.
 */
@Component({
    selector: 'character-sheet',
    templateUrl: 'app/app.component.html',
    directives: [
        ROUTER_DIRECTIVES,
    ],
    providers: [
        Router,
        Dispatcher,
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
