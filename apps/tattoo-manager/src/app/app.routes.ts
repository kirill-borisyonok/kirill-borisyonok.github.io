import { Route } from "@angular/router";
import {tabTree} from "@tattoo-manager/shared/constants/common.constants";

export const appRoutes: Route[] = [
    {
        path: tabTree.dashboard.path,
		loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent),
        title: tabTree.dashboard.title,
    },
    {
		path: '**',
		redirectTo: '',
	},
];
