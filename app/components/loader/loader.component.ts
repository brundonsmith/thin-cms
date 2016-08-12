import { Component, HostBinding } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.css'],
  inputs: ['active', 'mode']
})
export class LoaderComponent {
  public active: boolean = false;
  public mode: string = 'radial';

  @HostBinding('class.active') get isActive() { return this.active };
  @HostBinding('class.radial') get isRadial() { return this.mode === 'radial' };
  @HostBinding('class.up') get isUp() { return this.mode === 'up' };
  @HostBinding('class.down') get isDown() { return this.mode === 'down' };


}
