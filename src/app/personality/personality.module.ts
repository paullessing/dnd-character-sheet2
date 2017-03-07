import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalityComponent } from './personality.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PersonalityComponent],
  exports: [PersonalityComponent]
})
export class PersonalityModule { }
