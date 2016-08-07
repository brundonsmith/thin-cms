import { Component, HostBinding } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'nav-section',
  templateUrl: 'nav-section.component.html',
  styleUrls: ['nav-section.component.css'],
  inputs: ['title', 'expanded']
})
export class NavSectionComponent {
  public title: string;
  public expanded: boolean;

  @HostBinding('class.expanded') get isExpanded() { return this.expanded };

  onLabelClicked() {
    this.expanded = !this.expanded;
  }
}
