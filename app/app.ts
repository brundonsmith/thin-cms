
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { MainComponent } from './components/_main/main.component';

import { appRouterProviders } from './app.routes';

bootstrap(MainComponent, [
  appRouterProviders,
  disableDeprecatedForms(),
  provideForms()
]);
