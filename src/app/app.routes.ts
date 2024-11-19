import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(
        (m) => m.ContactComponent
      ) },
  { path: 'policy',
    loadComponent: () =>
      import('./features/policy/policy.component').then(
        (m) => m.PolicyComponent
      ) },
  { path: 'gift-list',
    loadComponent: () =>
      import('./features/gift-list/gift-list.component').then(
        (m) => m.GiftListComponent) },
  { path: '', redirectTo: '/gift-list', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      )
  },
];
