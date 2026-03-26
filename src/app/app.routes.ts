import { Routes } from '@angular/router';
import { ClienteLayout } from '@layout/cliente-layout/cliente-layout';
import { Home } from '@cliente/home/home';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: ClienteLayout,
    children: [
      {
        path: '',
        title: 'Home',
        component: Home,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
