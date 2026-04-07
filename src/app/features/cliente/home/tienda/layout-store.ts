import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarGeneric } from "@shared/components/sidebar-generic/sidebar-generic";

@Component({
  selector: 'layout-store',
  imports: [RouterOutlet, SidebarGeneric],
  template: `
    <main class="h-screen lg:py-4 animate-fade-in-up ">
      <section class="flex items-stretch h-screen overflow-hidden lg:px-18">
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
export class LayoutStore {
  public itemsSidebar = [
    {
      ruta: '/',
      icono: '/iconos/retroceso.svg',
      name: 'Tienda PeruFast',
    },
    {
      ruta: '/store/embalajes',
      icono: '',
      name: 'Embalajes',
    },
    {
      ruta: '/store/cajas',
      icono: '',
      name: 'Cajas',
    },
    {
      ruta: '/store/otrosproductos',
      icono: '',
      name: 'Mas Productos',
    },
  ];
}
