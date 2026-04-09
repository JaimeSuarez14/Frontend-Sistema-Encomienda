import { Injectable, signal } from '@angular/core';

import {
  Encomienda,
  EncomiendaFormPayload,
  StatusOption,
} from '../models/encomienda.model';

@Injectable({
  providedIn: 'root',
})
export class EncomiendasService {
  private readonly statusOptions: StatusOption[] = [
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'En tránsito', label: 'En tránsito' },
    { value: 'Entregado', label: 'Entregado' },
  ];

  private readonly encomiendasState = signal<Encomienda[]>([
    {
      id: 'ENC-1001',
      customerName: 'María Gómez',
      shippingAddress: 'Av. Primavera 215, Surco',
      status: 'Pendiente',
      sentDate: '2026-04-03',
      deliveredDate: null,
    },
    {
      id: 'ENC-1002',
      customerName: 'Luis Cárdenas',
      shippingAddress: 'Jr. Ayacucho 814, Cercado de Lima',
      status: 'En tránsito',
      sentDate: '2026-04-02',
      deliveredDate: null,
    },
    {
      id: 'ENC-1003',
      customerName: 'Andrea Paredes',
      shippingAddress: 'Calle Los Cipreses 420, San Isidro',
      status: 'Entregado',
      sentDate: '2026-03-30',
      deliveredDate: '2026-04-01',
    },
    {
      id: 'ENC-1004',
      customerName: 'Carlos Quispe',
      shippingAddress: 'Av. Universitaria 1910, Los Olivos',
      status: 'En tránsito',
      sentDate: '2026-04-01',
      deliveredDate: null,
    },
    {
      id: 'ENC-1005',
      customerName: 'Paola Núñez',
      shippingAddress: 'Jr. Tacna 532, Huancayo',
      status: 'Pendiente',
      sentDate: '2026-04-04',
      deliveredDate: null,
    },
    {
      id: 'ENC-1006',
      customerName: 'Jorge Mendoza',
      shippingAddress: 'Av. Grau 1250, Piura',
      status: 'Entregado',
      sentDate: '2026-03-28',
      deliveredDate: '2026-03-31',
    },
  ]);

  private nextSequence = 1007;

  readonly encomiendas = this.encomiendasState.asReadonly();

  getStatusOptions(): StatusOption[] {
    return [...this.statusOptions];
  }

  getById(id: string): Encomienda | undefined {
    return this.encomiendasState().find((item) => item.id === id);
  }

  create(payload: EncomiendaFormPayload): Encomienda {
    const newEncomienda: Encomienda = {
      id: this.generateId(),
      ...payload,
    };

    this.encomiendasState.update((items) => [newEncomienda, ...items]);
    return newEncomienda;
  }

  update(id: string, payload: EncomiendaFormPayload): void {
    this.encomiendasState.update((items) =>
      items.map((item) => (item.id === id ? { ...item, ...payload } : item))
    );
  }

  remove(id: string): void {
    this.encomiendasState.update((items) => items.filter((item) => item.id !== id));
  }

  private generateId(): string {
    const id = `ENC-${String(this.nextSequence).padStart(4, '0')}`;
    this.nextSequence += 1;
    return id;
  }
}
