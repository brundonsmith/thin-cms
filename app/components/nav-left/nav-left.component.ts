import { Component, OnInit } from '@angular/core';
import { NavSectionComponent } from '../nav-section/nav-section.component';
import { CollectionsService } from '../../services/collections.service';

@Component({
  moduleId: module.id,
  selector: 'nav-left',
  templateUrl: 'nav-left.component.html',
  styleUrls: ['nav-left.component.css'],
  directives: [ NavSectionComponent ],
  providers: [ CollectionsService ]
})
export class NavLeftComponent implements OnInit {
  collections: any;

  constructor(private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.collectionsService.getAllCollections()
      .then( collections => this.collections = collections );
  }

}
