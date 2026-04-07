import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type BoxSize = 'XXS' | 'XS' | 'S' | 'M' | 'L';

interface BoxOption {
  size: BoxSize;
  length: number;
  width: number;
  height: number;
  price: number;
}

@Component({
  selector: 'app-cajas',
  imports: [CommonModule],
  templateUrl: './cajas.html',
  styleUrl: './cajas.css',
})
export class Cajas {
  readonly boxOptions: BoxOption[] = [
    {
      size: 'XXS',
      length: 15,
      width: 10,
      height: 10,
      price: 1.5,
    },
    {
      size: 'XS',
      length: 20,
      width: 15,
      height: 12,
      price: 2.2,
    },
    {
      size: 'S',
      length: 25,
      width: 18,
      height: 14,
      price: 2.9,
    },
    {
      size: 'M',
      length: 30,
      width: 22,
      height: 16,
      price: 3.8,
    },
    {
      size: 'L',
      length: 35,
      width: 25,
      height: 20,
      price: 4.6,
    },
  ];

  readonly selectedSize = signal<BoxSize>('XXS');

  readonly selectedBox = computed(() => {
    const current = this.boxOptions.find((box) => box.size === this.selectedSize());
    return current ?? this.boxOptions[0];
  });

  readonly dimensionsLabel = computed(() => {
    const box = this.selectedBox();
    return `${box.length} x ${box.width} x ${box.height} cm`;
  });

  readonly formattedPrice = computed(() => `S/ ${this.selectedBox().price.toFixed(2)}`);

  selectSize(size: BoxSize): void {
    this.selectedSize.set(size);
  }

}
