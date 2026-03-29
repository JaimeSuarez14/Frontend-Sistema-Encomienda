import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import {LucideIconNode, LucideHouse } from "@lucide/angular"

@Component({
  selector: 'header-cliente',
  imports: [RouterLink ],
  templateUrl: './header-cliente.html',
  styleUrl: './header-cliente.css',
})
export class HeaderCliente {

  public itemsNavbar = [
    {
      ruta: "/",
      icono: "/iconos/house.svg",
      name: "Home"
    },
    {
      ruta: "/tarifa",
      icono: "/iconos/book-copy.svg",
      name: "Tarifa"
    },
    {
      ruta: "/pagalo",
      icono: "/iconos/circle-dollar-sign.svg",
      name: "Pagalo"
    },
    {
      ruta: "/agencia",
      icono: "/iconos/map-pin.svg",
      name: "Agencias"
    }
  ]

  dropdownOpen = signal(false);

  toggleDropdown() {
    this.dropdownOpen.update((isOpen) => !isOpen);
  }

  itemsdropdown = [
    {
      ruta: "/login",
      icono: "bi-box-arrow-in-right",
      name: "Iniciar Sesion"
    }
  ]

}
