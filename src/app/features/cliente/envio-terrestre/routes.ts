import { PasosTerrestre } from './pasos-terrestre/pasos-terrestre';
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    title: 'terrestre',
    loadComponent: () => import('@cliente/envio-terrestre/envio-terrestre').then((m) => m.EnvioTerrestre),

  },
  {
    path: 'pasos',
    title: 'pasos',
    loadComponent: () => import('@cliente/envio-terrestre/pasos-terrestre/pasos-terrestre').then((m) => m.PasosTerrestre),

  }
]
