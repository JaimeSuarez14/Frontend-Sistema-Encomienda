import { Component } from '@angular/core';
import { HeaderCliente } from "../header-cliente/header-cliente";
import { RouterOutlet } from "@angular/router";
import { SidebarCliente } from "@layout/sidebar-cliente/sidebar-cliente";

@Component({
  selector: 'app-cliente-layout',
  imports: [HeaderCliente, RouterOutlet, SidebarCliente],
  templateUrl: './cliente-layout.html',
  styleUrl: './cliente-layout.css',
})
export class ClienteLayout {

}
