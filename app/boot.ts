import {bootstrap} from 'angular2/platform/browser'
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS} from "angular2/router";
import {createStore, applyMiddleware, Store} from 'redux';
import thunk from 'redux-thunk';

import {AppComponent} from './app.component'
import {rootReducer} from "./reducers/root.reducer";
import {storeStateAfterUpdate} from "./common/storage.middleware.ts";

const createStoreWithMiddleware = applyMiddleware(thunk, storeStateAfterUpdate)(createStore);
const store = createStoreWithMiddleware(rootReducer);

bootstrap(AppComponent, [ROUTER_PROVIDERS, provide('Store', {useValue: store})]);
