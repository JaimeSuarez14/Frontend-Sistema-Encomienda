import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path:"",
    title: 'Dashboard',
    loadComponent: () => import('@admin/home/home').then( m => m.Home),
  }
]
