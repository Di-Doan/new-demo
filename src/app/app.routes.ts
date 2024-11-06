import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LoginComponent } from './features/login/login.component';
import { ContactComponent } from './features/contact/contact.component';
import { PolicyComponent } from './features/policy/policy.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'policy', component: PolicyComponent},
  { path: '**', component: NotFoundComponent}
];
