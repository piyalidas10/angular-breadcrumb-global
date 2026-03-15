import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';

import { datadogRum } from '@datadog/browser-rum';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  // Disable all console.log, warn, error, info, debug methods in production
  const methods = ['log', 'debug', 'info', 'warn', 'error'];
  methods.forEach((method) => {
    (window.console as any)[method] = () => {};
  });
}

/**
 * Now Datadog captures:
    ✔ page load performance
    ✔ API calls
    ✔ JS errors
    ✔ user sessions
 */

datadogRum.init({
  applicationId: 'angular-breadcrumb-global',
  clientToken: 'CLIENT_TOKEN',
  site: 'google.com',
  service: 'angular-breadcrumb-global',
  env: 'production',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
