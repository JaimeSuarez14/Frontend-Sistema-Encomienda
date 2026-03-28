import { Component, input } from '@angular/core';

@Component({
  selector: 'aap-button-ui',
  imports: [],
  template: `
    <button
      class="flex mt-4 justify-center items-center font-bold p-3 rounded-lg bg-red-600 text-white border-2 border-red-700 gap-5 hover:border-orange-600 shadow-md shadow-red-800 hover:bg-orange-600 hover:scale-105 transition duration-300 ease-in-out"
    >
      <span>{{ name() }}</span
      ><img [src]="icon()" alt="icono" />
    </button>
  `,
  styles: [],
  standalone: true,
})
export class ButtonUiComponent {
  name = input<string>('Conoce Más');
  icon = input<string>('/iconos/arrow-rigth.svg');
}
