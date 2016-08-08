import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'button-negative',
  templateUrl: 'button-negative.component.html',
  styleUrls: ['button-negative.component.css'],
  inputs: ['label']
})
export class ButtonNegativeComponent {
  public label: string;
}
