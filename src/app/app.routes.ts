import { LayoutTerrestre } from './features/cliente/envio-terrestre/layout-terrestre';
import { Routes } from '@angular/router';
import { ClienteLayout } from '@layout/cliente-layout/cliente-layout';
import { Home } from '@cliente/home/home';
import { EnvioTerrestre } from '@cliente/envio-terrestre/envio-terrestre';
import { Login } from '@cliente/login/login';
import { Register } from '@cliente/register/register';

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
      {
        path: 'login',
        title: 'Login',
        component: Login,
      },
      {
        path: 'register',
        title: 'Registro',
        component: Register,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
