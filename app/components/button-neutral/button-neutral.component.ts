import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'button-neutral',
  templateUrl: 'button-neutral.component.html',
  styleUrls: ['button-neutral.component.css'],
  inputs: ['label']
})
export class ButtonNeutralComponent {
  public label: string;
}
