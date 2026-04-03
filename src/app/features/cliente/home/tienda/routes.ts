import {  Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    title: 'Store',
    loadComponent:  () => import('@cliente/home/tienda/tienda').then(m => m.Tienda)
  }
]
