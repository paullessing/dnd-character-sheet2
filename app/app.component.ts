import {Component, Inject, ElementRef} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {Store} from 'redux';
import {Dispatcher} from "./common/dispatcher";
import {ReduxConnector} from "./common/connector";
import {update} from "./actions/personality.actions";
import {load} from "./actions/storage.actions";
import {Router} from "./common/router.service";
import {
    AbilitiesComponent,
    CharacterComponent,
    PersonalityComponent,
    EditAbilitiesComponent,
    ShopComponent,
    InventoryComponent,
    EditItemComponent,
    HistoryComponent
} from "./components/_module";
import {Modal} from "./components/modal/modal.service";

/**
 * Main app component for the character sheet app.
 */
@Component({
    selector: 'body[character-sheet], character-sheet',
    styles: [`
    body {}
    body.modal-open {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
}
    `],
    templateUrl: 'app/app.component.html',
    host: {
        '[class.modal-open]': 'isModalOpen'
    },
    directives: [
        ROUTER_DIRECTIVES,
    ],
    providers: [
        Router,
        Dispatcher,
        ReduxConnector,
        Modal
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
    {path: '/history',              name: 'History',            component: HistoryComponent},

])
export class AppComponent {
    public isModalOpen: boolean = false;

    constructor(
        elementRef: ElementRef,
        redux: ReduxConnector,
        modal: Modal
    ) {
        redux.dispatch(load());
        modal.init(elementRef, this.toggleModalOpen.bind(this));
    }

    public toggleModalOpen(newValue?: boolean) {
        if (typeof newValue === undefined) {
            this.isModalOpen = !this.isModalOpen;
        } else {
            this.isModalOpen = !!newValue;
        }
    }
}
