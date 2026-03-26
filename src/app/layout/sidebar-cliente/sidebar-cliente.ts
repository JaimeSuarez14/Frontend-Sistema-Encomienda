import { Component, signal } from '@angular/core';

@Component({
  selector: 'sidebar-cliente',
  imports: [],
  templateUrl: './sidebar-cliente.html',
  styleUrl: './sidebar-cliente.css',
})
export class SidebarCliente {
  public itemstoogle =  signal([true, true, true, true, true])

  open(index: number){
    this.itemstoogle.update(t => t.map((v, i) => i === index ? !v : true));
  }


}
