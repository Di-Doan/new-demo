import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { LoginComponent } from './features/login/login.component';
import { ContactComponent } from './features/contact/contact.component';
import { PolicyComponent } from './features/policy/policy.component';
import { GiftListComponent } from './features/gift-list/gift-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'policy', component: PolicyComponent},
  { path: 'gift-list', component: GiftListComponent},
  { path: '', redirectTo: '/gift-list', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent}
];
