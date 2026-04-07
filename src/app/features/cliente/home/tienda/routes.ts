import {  Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    title: 'Store',
    loadComponent:  () => import('@cliente/home/tienda/tienda').then(m => m.Tienda)
  },
  {
    path: 'cajas',
    title: 'Cajas',
    loadComponent:  () => import('@cliente/home/tienda/cajas/cajas').then(m => m.Cajas)
  }
]
