import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SectionComponent} from './section/section.component';
import {CharacterModule} from './character/character.module';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CharacterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
