import { Component } from '@angular/core';
import { InputBooleanComponent } from '../input-boolean/input-boolean.component';
import { InputNumberComponent } from '../input-number/input-number.component';
import { InputStringShortComponent } from '../input-string-short/input-string-short.component';

@Component({
  moduleId: module.id,
  selector: 'view-home',
  templateUrl: 'view-home.component.html',
  styleUrls: ['view-home.component.css'],
  directives: [InputBooleanComponent, InputNumberComponent, InputStringShortComponent]
})
export class ViewHomeComponent {

  public testBoolean: boolean = true;

  public testNumber: number = 12;

  public testString: string = 'foo';

}
