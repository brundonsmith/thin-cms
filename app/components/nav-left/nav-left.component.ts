import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { NavSectionComponent } from '../nav-section/nav-section.component';
import { CollectionsService } from '../../services/collections.service';
import { PluralizePipe } from '../../pipes/pluralize.pipe';

@Component({
  moduleId: module.id,
  selector: 'nav-left',
  templateUrl: 'nav-left.component.html',
  styleUrls: ['nav-left.component.css'],
  directives: [ ROUTER_DIRECTIVES, NavSectionComponent ],
  providers: [ CollectionsService ],
  pipes: [ PluralizePipe ]
})
export class NavLeftComponent implements OnInit {
  collections: any;

  constructor(private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.refreshCollections();
  }

  public refreshCollections() {
    this.collectionsService.getAllCollections()
      .then( collections => this.collections = collections );
  }

}
