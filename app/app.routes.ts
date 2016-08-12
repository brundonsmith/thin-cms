import { provideRouter, RouterConfig }  from '@angular/router';
import { ViewHomeComponent } from './components/view-home/view-home.component';
import { ViewSettingsComponent } from './components/view-settings/view-settings.component';
import { ViewCollectionComponent } from './components/view-collection/view-collection.component';

const routes: RouterConfig = [
  {
    path: '',
    component: ViewHomeComponent
  },
  {
    path: 'settings',
    component: ViewSettingsComponent
  },
  {
    path: ':modelName',
    component: ViewCollectionComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
