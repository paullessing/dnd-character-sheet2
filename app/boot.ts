import {bootstrap}    from 'angular2/platform/browser'
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS} from "angular2/router";
import {createStore, applyMiddleware} from 'redux';

import {AppComponent} from './app.component'
//import {provider} from 'ng2-redux';
import thunk from 'redux-thunk';

const rootReducer = (state = { character: { name: 'Foo' } }, action) => { return state; };

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

bootstrap(AppComponent, [ROUTER_PROVIDERS, provide('Store', {useValue: store})]);
