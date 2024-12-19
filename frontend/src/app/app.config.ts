import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations' 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      NgbModule,
      ReactiveFormsModule,
      NgbCarouselConfig,
      FormBuilder,
      CommonModule,
      PrimeNGConfig, 
    ),
    provideAnimations()
  ],
};
