import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavTopComponent } from '../nav-top/nav-top.component';
import { NavLeftComponent } from '../nav-left/nav-left.component';
import { NavSectionComponent } from '../nav-section/nav-section.component';
import { NavLinkComponent } from '../nav-link/nav-link.component';
import { NavDividerComponent } from '../nav-divider/nav-divider.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  directives: [ ROUTER_DIRECTIVES, NavTopComponent, NavLeftComponent, NavSectionComponent, NavLinkComponent, NavDividerComponent ]
})
export class MainComponent { }
