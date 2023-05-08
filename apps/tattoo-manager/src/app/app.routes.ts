import { Route } from '@angular/router';
import { tabTree } from '@tattoo-manager/shared/constants/common.constants';
import { authGuard } from '@tattoo-manager/shared/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: tabTree.dashboard.path,
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    title: tabTree.dashboard.title,
    canActivate: [authGuard],
  },
  {
    path: tabTree.login.path,
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
    title: tabTree.dashboard.title,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
