import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CharacterComponent],
  exports: [CharacterComponent]
})
export class CharacterModule { }
