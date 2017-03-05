import {Component, Input} from '@angular/core';

@Component({
  selector: 'cs-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  @Input()
  public name: string;
}
