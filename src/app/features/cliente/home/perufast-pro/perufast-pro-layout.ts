import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarGeneric } from "@shared/components/sidebar-generic/sidebar-generic";

@Component({
  selector: 'layout-perufast-pro',
  imports: [RouterOutlet, SidebarGeneric],
  template: `
    <main class="h-screen py-4 animate-fade-in-up ">
      <section class="flex items-stretch h-screen overflow-hidden px-18">
        <app-sidebar-generic [itemsSidebar]="itemsSidebar" />
        <div class="flex-1">
          <router-outlet />
        </div>
      </section>
    </main>
  `,
  styles: [],
  standalone: true,
})
export class PerufastProLayout {
  public itemsSidebar = [
    {
      ruta: '/',
      icono: '/iconos/retroceso.svg',
      name: 'Envio',
    },
    {
      ruta: '/login',
      icono: '',
      name: 'Peru fast Pro',
    },
  ];
}
