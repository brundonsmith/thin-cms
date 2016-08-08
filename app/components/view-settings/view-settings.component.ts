import { Component } from '@angular/core';
import { InputStringShortComponent } from '../input-string-short/input-string-short.component';
import { ButtonPrimaryComponent } from '../button-primary/button-primary.component';
import { ButtonNeutralComponent } from '../button-neutral/button-neutral.component';

@Component({
  moduleId: module.id,
  selector: 'view-settings',
  templateUrl: 'view-settings.component.html',
  styleUrls: ['view-settings.component.css'],
  directives: [InputStringShortComponent, ButtonPrimaryComponent, ButtonNeutralComponent]
})
export class ViewSettingsComponent {
  public siteTitle: string = "My Site";
}
