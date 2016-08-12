import { Component, ViewChild } from '@angular/core';
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
import { LoaderComponent } from '../loader/loader.component';

@Component({
  moduleId: module.id,
  selector: 'view-new-object',
  templateUrl: 'view-new-object.component.html',
  styleUrls: ['view-new-object.component.css'],
  directives: [ InputBooleanComponent, InputNumberComponent, InputStringShortComponent, ButtonPrimaryComponent, ButtonNeutralComponent, LoaderComponent ],
  providers: [ CollectionsService, CrudService ],
  pipes: [ UnCamelPipe ]
})
export class ViewNewObjectComponent {

  public modelName: string;
  public objectId: string;
  public modelSchema: any;
  public object: any = {};

  @ViewChild('loader') loader: LoaderComponent;

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
    });
  }

  save() {
    this.loader.active = true;
    this.loader.mode = 'up';

    this.crudService.create(this.modelName)
      .then( newObject => {
        this.objectId = (<any>newObject)._id;

        // merge user-created properties into new object, then keep the result
        for(var key in this.object) {
          newObject[key] = this.object[key];
        }
        this.object = newObject;

        this.crudService.update(this.modelName, this.objectId, this.object).then( () => {
          this.loader.active = false;
          this.router.navigate([this.modelName, this.objectId]);
        });
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
