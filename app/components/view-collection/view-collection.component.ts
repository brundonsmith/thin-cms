import { Component, ViewChild } from '@angular/core';
import { CanActivate, Router,
         ActivatedRoute,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { CollectionsService } from '../../services/collections.service';
import { CrudService } from '../../services/crud.service';
import { NotificationService } from '../../services/notification.service';
import { PluralizePipe } from '../../pipes/pluralize.pipe';
import { UnCamelPipe } from '../../pipes/un-camel.pipe';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  moduleId: module.id,
  selector: 'view-collection',
  templateUrl: 'view-collection.component.html',
  styleUrls: ['view-collection.component.css'],
  directives: [ ROUTER_DIRECTIVES, LoaderComponent ],
  providers: [ CollectionsService, CrudService ],
  pipes: [ PluralizePipe, UnCamelPipe ]
})
export class ViewCollectionComponent {

  public modelName: string;
  public modelSchema: any;
  public objects: Array<any>;

  @ViewChild('loader') loader: LoaderComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionsService: CollectionsService,
    private crudService: CrudService,
    private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.loader.active = true;
    this.loader.mode = 'down';

    this.route.params.subscribe(params => {
      this.modelName = params['modelName'];


      this.crudService.readSchema(this.modelName)
        .then( modelSchema => this.modelSchema = modelSchema );

      this.collectionsService.search(this.modelName, {})
        .then( objects => {
          this.objects = objects;
          this.loader.active = false;
        });

    });
  }

  delete(objectId) {
    this.crudService.delete(this.modelName, objectId)
      .then(() => {
        this.notificationService.showNotification('Item deleted', 'neutral');
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
