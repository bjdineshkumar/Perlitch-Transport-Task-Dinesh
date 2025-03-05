import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { ContactsComponent } from './components/contacts/contacts.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent },
  { path: 'shipments', component: ShipmentsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

export const appRouting = provideRouter(routes);
