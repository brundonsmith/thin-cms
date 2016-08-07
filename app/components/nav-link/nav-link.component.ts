import { Component, HostBinding } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'nav-link',
  templateUrl: 'nav-link.component.html',
  styleUrls: ['nav-link.component.css'],
  inputs: ['title', 'icon', 'href']
})
export class NavLinkComponent {
  public title: string;
  public icon: string;
  public href: string;
}
