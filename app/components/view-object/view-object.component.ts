import { Component } from '@angular/core';
import { CanActivate, Router,
         ActivatedRoute,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { CollectionsService } from '../../services/collections.service';
import { CrudService } from '../../services/crud.service';
import { InputBooleanComponent } from '../input-boolean/input-boolean.component';
import { InputNumberComponent } from '../input-number/input-number.component';
import { InputStringShortComponent } from '../input-string-short/input-string-short.component';
import { UnCamelPipe } from '../../pipes/un-camel.pipe';
import { ButtonPrimaryComponent } from '../button-primary/button-primary.component';
import { ButtonNeutralComponent } from '../button-neutral/button-neutral.component';

@Component({
  moduleId: module.id,
  selector: 'view-object',
  templateUrl: 'view-object.component.html',
  styleUrls: ['view-object.component.css'],
  directives: [ InputBooleanComponent, InputNumberComponent, InputStringShortComponent, ButtonPrimaryComponent, ButtonNeutralComponent ],
  providers: [ CollectionsService, CrudService ],
  pipes: [ UnCamelPipe ]
})
export class ViewObjectComponent {

  public modelName: string;
  public objectId: string;
  public modelSchema: any;
  public object: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectionsService: CollectionsService,
    private crudService: CrudService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.modelName = params['modelName'];
      this.objectId = params['objectId'];

      this.crudService.readSchema(this.modelName)
        .then( modelSchema => this.modelSchema = modelSchema );

      this.crudService.read(this.modelName, this.objectId)
        .then( object => this.object = object );;

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
