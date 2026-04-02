import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

type ItemSidebar = {
  ruta: string;
  icono: string;
  name: string;
};

@Component({
  selector: 'app-sidebar-generic',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-generic.html',
  styleUrl: './sidebar-generic.css',
})
export class SidebarGeneric {

  itemsSidebar = input<ItemSidebar[]>()


}
