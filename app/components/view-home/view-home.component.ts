import { Component } from '@angular/core';
import { InputBooleanComponent } from '../input-boolean/input-boolean.component';

@Component({
  moduleId: module.id,
  selector: 'view-home',
  templateUrl: 'view-home.component.html',
  styleUrls: ['view-home.component.css'],
  directives: [InputBooleanComponent]
})
export class ViewHomeComponent {

  public testBoolean: boolean = true;

}
