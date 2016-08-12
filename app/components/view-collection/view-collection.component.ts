import { Component } from '@angular/core';
import { CanActivate, Router,
         ActivatedRoute,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { CollectionsService } from '../../services/collections.service';
import { CrudService } from '../../services/crud.service';
import { PluralizePipe } from '../../pipes/pluralize.pipe';
import { UnCamelPipe } from '../../pipes/un-camel.pipe';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'view-collection',
  templateUrl: 'view-collection.component.html',
  styleUrls: ['view-collection.component.css'],
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ CollectionsService, CrudService ],
  pipes: [ PluralizePipe, UnCamelPipe ]
})
export class ViewCollectionComponent {

  public modelName: string;
  public modelSchema: any;
  public objects: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionsService: CollectionsService,
    private crudService: CrudService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.modelName = params['modelName'];


      this.crudService.readSchema(this.modelName)
        .then( modelSchema => this.modelSchema = modelSchema );

      this.collectionsService.search(this.modelName, {})
        .then( objects => this.objects = objects );

    });
  }

  delete(objectId) {
    this.crudService.delete(this.modelName, objectId)
      .then(() => {
        this.collectionsService.search(this.modelName, {})
          .then( objects => this.objects = objects );
      });
  }

  public get pathsArray() {
    let paths = [];

    if(this.modelSchema) {
      for(var val in this.modelSchema.paths) {
        if(val !== '__v' && val !== '_id') {
          paths.push(this.modelSchema.paths[val]);
        }
      }
    }

    return paths;
  }
}
