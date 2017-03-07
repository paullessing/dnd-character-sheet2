import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SectionComponent} from './section/section.component';
import {CharacterDetailsModule} from './character-details/character-details.module';
import {PersonalityModule} from './personality/personality.module';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CharacterDetailsModule,
    PersonalityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
