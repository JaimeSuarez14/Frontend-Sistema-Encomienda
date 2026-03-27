import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'sidebar-cliente',
  imports: [RouterLink],
  templateUrl: './sidebar-cliente.html',
  styleUrl: './sidebar-cliente.css',
})
export class SidebarCliente {
  public itemstoogle =  signal([true, true, true, true, true])

  open(index: number){
    this.itemstoogle.update(t => t.map((v, i) => i === index ? !v : v));
  }


}
