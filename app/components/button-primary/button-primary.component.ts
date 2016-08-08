import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'button-primary',
  templateUrl: 'button-primary.component.html',
  styleUrls: ['button-primary.component.css'],
  inputs: ['label']
})
export class ButtonPrimaryComponent {
  public label: string;
}
