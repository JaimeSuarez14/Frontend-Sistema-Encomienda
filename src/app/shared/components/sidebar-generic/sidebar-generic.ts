import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar-generic',
  imports: [RouterLink],
  templateUrl: './sidebar-generic.html',
  styleUrl: './sidebar-generic.css',
})
export class SidebarGeneric {
  public itemsSidebar = [
    {
      ruta: '/',
      icono: '/iconos/retroceso.svg',
      name: 'Home',
    },
    {
      ruta: '/terrestre/pasos',
      icono: '',
      name: 'Pasos',
    },
    {
      ruta: '/terrestre/beneficios',
      icono: '',
      name: 'Beneficios',
    },
    {
      ruta: '/agencia',
      icono: '/iconos/map-pin.svg',
      name: 'Agencias',
    },
  ];
}
