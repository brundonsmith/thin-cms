import { Component, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'nav-link',
  templateUrl: 'nav-link.component.html',
  styleUrls: ['nav-link.component.css'],
  inputs: ['title', 'icon', 'routerLink'],
  directives: [ROUTER_DIRECTIVES]
})
export class NavLinkComponent {
  public title: string;
  public icon: string;
  public routerLink: string = '#';
}
