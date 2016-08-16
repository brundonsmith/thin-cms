import { Component, HostBinding, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputNumberComponent),
    multi: true
};

@Component({
  moduleId: module.id,
  selector: 'input-number',
  templateUrl: 'input-number.component.html',
  styleUrls: ['input-number.component.css'],
  inputs: ['step', 'size', 'isMoney'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputNumberComponent implements ControlValueAccessor {

  public step: number;
  public size: number = 8;
  public isMoney: boolean;

  @HostBinding('class.is-money') get money() { return this.isMoney };

  onClickUp() {
    this.value = Number(this.value) + Number(this.step);
  }
  onClickDown() {
    this.value = Number(this.value) - Number(this.step);
  }

  ngOnInit() {
    if(this.isMoney) {
      this.step = '0.01';
    }
  }

  countDecimalDigits(num) {
    if(Math.floor(num) === num) {
      return 0;
    } else {
      return num.toString().split(".")[1].length || 0;
    }
  }

  ////// To make ngModel work

  //The internal data model
  private innerValue: string;

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    if(!this.innerValue) {
      this.innerValue = '0';
    }
    return Number(this.innerValue).toFixed(this.countDecimalDigits(this.step));
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v != this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {

    var v = Number(this.innerValue);

    // round to step
    v = Math.floor((v / this.step) + .5) * this.step;

    this.innerValue = v.toFixed(this.countDecimalDigits(this.step));

    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
