import { Routes } from '@angular/router';
import { RouteGuard } from './core/route.guard';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [RouteGuard],
    loadChildren: () => import('./layout/app-layout/app-layout.route'),
  },
  {
    path: 'login',
    // canActivate: [RouteGuard],
    loadComponent: () =>
      import('./features/auth-management/login/login').then((res) => res.Login),
  },
  {
    path: 'navbar',
    loadComponent: () =>
      import('../app/components/navbar/navbar').then((res) => res.Navbar),
  },
  {
    path: 'register-officer',
    loadComponent: () =>
      import(
        './features/auth-management/register-officer/register-officer'
      ).then((res) => res.RegisterOfficer),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
