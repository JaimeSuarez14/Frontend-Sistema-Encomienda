import { LayoutTerrestre } from './features/cliente/envio-terrestre/layout-terrestre';
import { Routes } from '@angular/router';
import { ClienteLayout } from '@layout/cliente-layout/cliente-layout';
import { Home } from '@cliente/home/home';
import { EnvioTerrestre } from '@cliente/envio-terrestre/envio-terrestre';

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
      {
        path: 'terrestre',
        title: 'Terrestre',
        loadComponent: () =>
          import('@cliente/envio-terrestre/layout-terrestre').then((m) => m.LayoutTerrestre),
        loadChildren: () => import('@cliente/envio-terrestre/routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
