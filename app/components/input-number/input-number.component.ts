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

  public step: any;
  public size: number = 8;
  public isMoney: boolean;

  @HostBinding('class.is-money') get money() { return this.isMoney };

  onClickUp() {
    if(typeof this.step !== 'undefined') {
      this.value = Number(this.value) + Number(this.step);
    } else {
      this.value = Number(this.value) + 1;
    }
  }
  onClickDown() {
    if(typeof this.step !== 'undefined') {
      this.value = Number(this.value) - Number(this.step);
    } else {
      this.value = Number(this.value) - 1;
    }
  }

  ngOnInit() {
    if(this.isMoney) {
      this.step = '0.01';
    }
  }

  countDecimalDigits(num) {
    if(!num || Math.floor(num) == num) {
      return 0;
    } else {
      return num.toString().split(".")[1].length || 0;
    }
  }

  ////// To make ngModel work

  //The internal data model
  private innerValue: any;

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    if(typeof this.innerValue === 'undefined') {
      this.innerValue = '0';
    }

    if(typeof this.step !== 'undefined') {
      return Number(this.innerValue).toFixed(this.countDecimalDigits(this.step));
    } else {
      return this.innerValue;
    }
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
    if(typeof this.step !== 'undefined') {
      v = Math.floor((v / this.step) + .5) * this.step;
      this.innerValue = v.toFixed(this.countDecimalDigits(this.step));
    } else {
      this.innerValue = v;
    }

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
