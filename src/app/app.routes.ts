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
        loadComponent: () => import('@cliente/envio-terrestre/envio-terrestre').then(
            (m) => m.EnvioTerrestre
          )
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
