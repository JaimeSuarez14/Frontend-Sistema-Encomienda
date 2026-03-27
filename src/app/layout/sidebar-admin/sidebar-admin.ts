import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  imports: [],
  templateUrl: './sidebar-admin.html',
  styleUrl: './sidebar-admin.css',
})
export class SidebarAdmin {
  public itemstoogle = signal([true, true, true, true, true]);

  open(index: number) {
    this.itemstoogle.update((t) => t.map((v, i) => (i === index ? !v : v)));
  }
}
