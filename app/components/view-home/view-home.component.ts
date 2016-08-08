import { Component } from '@angular/core';
import { InputBooleanComponent } from '../input-boolean/input-boolean.component';
import { InputNumberComponent } from '../input-number/input-number.component';

@Component({
  moduleId: module.id,
  selector: 'view-home',
  templateUrl: 'view-home.component.html',
  styleUrls: ['view-home.component.css'],
  directives: [InputBooleanComponent, InputNumberComponent]
})
export class ViewHomeComponent {

  public testBoolean: boolean = true;

  public testNumber: number = 12;

}
