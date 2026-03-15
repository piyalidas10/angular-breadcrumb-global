import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // Disable all console.log, warn, error, info, debug methods in production
  const methods = ['log', 'debug', 'info', 'warn', 'error'];
  methods.forEach((method) => {
    (window.console as any)[method] = () => {};
  });
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
