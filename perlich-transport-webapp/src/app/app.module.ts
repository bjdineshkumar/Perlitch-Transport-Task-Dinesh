import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule, withInterceptorsFromDi  } from '@angular/common/http';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    ...[importProvidersFrom(HttpClientModule)]
  ]
});
