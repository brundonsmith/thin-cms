import { Component } from '@angular/core';
import { NavTopComponent } from 'app/components/nav-top/nav-top.component';
import { NavLeftComponent } from 'app/components/nav-left/nav-left.component';
import { NavSectionComponent } from 'app/components/nav-section/nav-section.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
  directives: [ NavTopComponent, NavLeftComponent, NavSectionComponent ]
})
export class MainComponent { }
