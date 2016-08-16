import { Component, HostBinding, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputStringEnumComponent),
    multi: true
};

@Component({
  moduleId: module.id,
  selector: 'input-string-enum',
  templateUrl: 'input-string-enum.component.html',
  styleUrls: ['input-string-enum.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  inputs: [ 'options' ]
})
export class InputStringEnumComponent implements ControlValueAccessor {

  public isOpen: boolean;
  public options: string[];

  @HostBinding('class.is-open') get open() { return this.isOpen };

  openOptions() {
    this.isOpen = !this.isOpen;
  }
  selectOption(option) {
    this.value = option;
    this.isOpen = false;
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
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
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
