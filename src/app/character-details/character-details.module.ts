import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetailsComponent } from './character-details.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CharacterDetailsComponent],
  exports: [CharacterDetailsComponent]
})
export class CharacterDetailsModule { }
