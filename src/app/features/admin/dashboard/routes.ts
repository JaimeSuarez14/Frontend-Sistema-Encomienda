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
  },
  {
    path:"rutas-encomiendas",
    title: 'Rutas Encomiendas',
    loadComponent: () => import('@admin/rutas-encomiendas/rutas-encomiendas').then( m => m.RutasEncomiendas),
  },
  {
    path:"usuarios",
    title: 'Usuarios',
    loadComponent: () => import('@admin/usuarios/usuarios').then( m => m.Usuarios),
  }
]
