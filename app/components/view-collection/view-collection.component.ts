import { Component } from '@angular/core';
import { CanActivate, Router,
         ActivatedRoute,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { CollectionsService } from '../../services/collections.service';
import { CrudService } from '../../services/crud.service';

@Component({
  moduleId: module.id,
  selector: 'view-collection',
  templateUrl: 'view-collection.component.html',
  styleUrls: ['view-collection.component.css'],
  directives: [ ],
  providers: [ CollectionsService, CrudService ]
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
        .then( objects => this.objects = objects );;

    });
  }

  public get pathsArray() {
    let paths = [];

    if(this.modelSchema) {
      for(var val in this.modelSchema.paths) {
        paths.push(val);
      }
    }

    return paths;
  }
}
