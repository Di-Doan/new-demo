import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '**', component: NotFoundComponent}
];
