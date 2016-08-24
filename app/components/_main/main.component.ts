import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavTopComponent } from '../nav-top/nav-top.component';
import { NavLeftComponent } from '../nav-left/nav-left.component';
import { NavSectionComponent } from '../nav-section/nav-section.component';
import { NavLinkComponent } from '../nav-link/nav-link.component';
import { NavDividerComponent } from '../nav-divider/nav-divider.component';
import { LoaderComponent } from '../loader/loader.component';
import { CollectionsService } from '../../services/collections.service';
import { AuthService } from '../../services/auth.service';
import { PluralizePipe } from '../../pipes/pluralize.pipe';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  directives: [ ROUTER_DIRECTIVES, NavTopComponent, NavLeftComponent, NavSectionComponent, NavLinkComponent, NavDividerComponent, LoaderComponent ],
  providers: [ CollectionsService, AuthService ],
  pipes: [ PluralizePipe ]
})
export class MainComponent implements OnInit {

  collections: any;

  constructor(
    private router: Router,
    private collectionsService: CollectionsService,
    private authService: AuthService
  ) {
    router.events.subscribe((event) => {
      this.refreshCollections();
    });
  }

  ngOnInit() {
    this.refreshCollections();
  }

  refreshCollections() {
    console.log('refreshCollections()');
    this.collectionsService.getAllCollections()
      .then( collections => this.collections = collections );
  }

  logout() {
    this.authService.logout()
      .then( response => {
        this.router.navigate(['/login']);
      });
  }
}
