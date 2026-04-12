import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path:"",
    title: 'Dashboard',
    loadComponent: () => import('@admin/home/home').then( m => m.Home),
  },
  {
    path:"encomiendas",
    title: 'Encomiendas',
    loadComponent: () => import('@admin/encomiendas/encomiendas').then( m => m.Encomiendas),
  },
  {
    path:"clientes",
    title: 'Clientes',
    loadComponent: () => import('@admin/clientes/clientes').then( m => m.Clientes),
  }
]
