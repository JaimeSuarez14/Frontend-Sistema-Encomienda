import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-tarifas',
  imports: [CommonModule],
  templateUrl: './tarifas.html',
  styleUrl: './tarifas.css',
})
export class Tarifas {
  tabs = signal([true, false, false])
  moveTab(i: number){
    this.tabs.update(t => t.map((_, index) => i==index ? true: false))
  }

  modal = signal(false)
  openBox(){
    this.modal.update(m => !m)
  }

  tabsModal = signal([true, false, false, false])
  moveTabsModal(i: number){
    this.tabsModal.update(t => t.map((_, index) => i==index ? true: false))
  }
}
