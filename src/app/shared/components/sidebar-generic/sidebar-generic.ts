import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar-generic',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-generic.html',
  styleUrl: './sidebar-generic.css',
})
export class SidebarGeneric {
  public itemsSidebar = [
    {
      ruta: '/',
      icono: '/iconos/retroceso.svg',
      name: 'Terrestre',
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
      ruta: '/terrestre/tarifas',
      icono: '',
      name: 'Tarifas',
    },
  ];
}
