import { Component, input, output } from '@angular/core';

@Component({
  selector: 'button-ui',
  imports: [],
  templateUrl: './button-ui.html',
  styleUrl: './button-ui.css',
})
export class ButtonUi {
  name = input<string>('Conoce Más');
  icon = input<string>('/iconos/arrow-right.svg');
  action = output<void>();

  emitir(){
    this.action.emit();
  }
}
