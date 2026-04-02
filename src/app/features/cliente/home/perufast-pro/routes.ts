import { Routes } from "@angular/router";

export const routes: Routes = [
  {
  path: '',
  title: 'Perufast Pro',
  loadComponent:  () => import('@cliente/home/perufast-pro/perufast-pro').then(m => m.PerufastPro),
  },

]
