import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarGeneric } from "@shared/components/sidebar-generic/sidebar-generic";

@Component({
  selector: 'layout-terrestre',
  imports: [RouterOutlet, SidebarGeneric],
  template: `
    <main class="h-screen py-4 animate-fade-in-up ">
      <section class="flex items-stretch h-screen overflow-hidden px-18">
        <app-sidebar-generic />
        <div class="flex-1">
          <router-outlet />
        </div>
      </section>
    </main>
  `,
  styles: [],
  standalone: true,
})
export class LayoutTerrestre {}
