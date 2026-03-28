import { Component } from '@angular/core';
import { SidebarCliente } from "@layout/sidebar-cliente/sidebar-cliente";

@Component({
  selector: 'app-home',
  imports: [SidebarCliente],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
