import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavTopComponent } from '../nav-top/nav-top.component';
import { NavLeftComponent } from '../nav-left/nav-left.component';
import { NavSectionComponent } from '../nav-section/nav-section.component';
import { NavLinkComponent } from '../nav-link/nav-link.component';
import { NavDividerComponent } from '../nav-divider/nav-divider.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  directives: [ ROUTER_DIRECTIVES, NavTopComponent, NavLeftComponent, NavSectionComponent, NavLinkComponent, NavDividerComponent, LoaderComponent ]
})
export class MainComponent {

  public loggedIn: boolean;

  @ViewChild('navLeft')
  navLeft: NavLeftComponent;

  constructor(
    private router: Router
  ) {
    router.events.subscribe((event) => {
      this.onViewChange();
    });
  }

  onViewChange() {
    this.navLeft.refreshCollections();
  }
}
