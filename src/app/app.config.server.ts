import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), // ✅ ONLY server-specific provider
    provideHttpClient(withFetch()) // ✅ SSR-safe HTTP
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
