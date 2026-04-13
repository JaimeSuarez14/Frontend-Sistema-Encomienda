import { Injectable, signal } from '@angular/core';

import {
  RutaEncomienda,
  RutaEncomiendaFormPayload,
  StatusOption,
} from '../models/ruta-encomienda.model';

@Injectable({
  providedIn: 'root',
})
export class RutasEncomiendasService {
  private readonly statusOptions: StatusOption[] = [
    { value: 'Programada', label: 'Programada' },
    { value: 'En curso', label: 'En curso' },
    { value: 'Completada', label: 'Completada' },
    { value: 'Cancelada', label: 'Cancelada' },
  ];

  private readonly rutasState = signal<RutaEncomienda[]>([
    {
      id: 'RUT-1001',
      origin: 'Lima',
      destination: 'Huancayo',
      departureDate: '2026-04-05',
      arrivalDate: null,
      status: 'Programada',
      vehicle: 'Camión A-001',
      driver: 'Juan Pérez',
    },
    {
      id: 'RUT-1002',
      origin: 'Lima',
      destination: 'Piura',
      departureDate: '2026-04-03',
      arrivalDate: '2026-04-04',
      status: 'Completada',
      vehicle: 'Camión A-002',
      driver: 'Carlos Mendoza',
    },
    {
      id: 'RUT-1003',
      origin: 'Lima',
      destination: 'Cusco',
      departureDate: '2026-04-04',
      arrivalDate: null,
      status: 'En curso',
      vehicle: 'Camión A-003',
      driver: 'Miguel Torres',
    },
    {
      id: 'RUT-1004',
      origin: 'Arequipa',
      destination: 'Tacna',
      departureDate: '2026-04-02',
      arrivalDate: '2026-04-03',
      status: 'Completada',
      vehicle: 'Camión A-004',
      driver: 'Luis García',
    },
    {
      id: 'RUT-1005',
      origin: 'Lima',
      destination: 'Trujillo',
      departureDate: '2026-04-06',
      arrivalDate: null,
      status: 'Programada',
      vehicle: 'Camión A-005',
      driver: 'Jorge Díaz',
    },
    {
      id: 'RUT-1006',
      origin: 'Chiclayo',
      destination: 'Lima',
      departureDate: '2026-04-01',
      arrivalDate: null,
      status: 'Cancelada',
      vehicle: 'Camión A-001',
      driver: 'Juan Pérez',
    },
  ]);

  private nextSequence = 1007;

  readonly rutas = this.rutasState.asReadonly();

  getStatusOptions(): StatusOption[] {
    return [...this.statusOptions];
  }

  getById(id: string): RutaEncomienda | undefined {
    return this.rutasState().find((item) => item.id === id);
  }

  create(payload: RutaEncomiendaFormPayload): RutaEncomienda {
    const newRuta: RutaEncomienda = {
      id: this.generateId(),
      ...payload,
    };

    this.rutasState.update((items) => [newRuta, ...items]);
    return newRuta;
  }

  update(id: string, payload: RutaEncomiendaFormPayload): void {
    this.rutasState.update((items) =>
      items.map((item) => (item.id === id ? { ...item, ...payload } : item))
    );
  }

  remove(id: string): void {
    this.rutasState.update((items) => items.filter((item) => item.id !== id));
  }

  private generateId(): string {
    const id = `RUT-${String(this.nextSequence).padStart(4, '0')}`;
    this.nextSequence += 1;
    return id;
  }
}
