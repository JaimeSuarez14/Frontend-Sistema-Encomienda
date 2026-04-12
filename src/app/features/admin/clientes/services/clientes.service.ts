import { Injectable, signal } from '@angular/core';

import {
  Cliente,
  ClienteFormPayload,
  StatusOption,
  TipoDocumentoOption,
} from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly statusOptions: StatusOption[] = [
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' },
  ];

  private readonly tipoDocumentoOptions: TipoDocumentoOption[] = [
    { value: 'DNI', label: 'DNI' },
    { value: 'RUC', label: 'RUC' },
  ];

  private readonly clientesState = signal<Cliente[]>([
    {
      id: 'CLI-1001',
      nombre: 'María Elena Gómez López',
      email: 'maria.gomez@email.com',
      telefono: '987654321',
      direccion: 'Av. Primavera 215, Surco, Lima',
      tipoDocumento: 'DNI',
      numeroDocumento: '45678912',
      status: 'Activo',
      fechaRegistro: '2025-08-15',
    },
    {
      id: 'CLI-1002',
      nombre: 'Luis Alberto Cárdenas Mendoza',
      email: 'luis.cardenas@email.com',
      telefono: '912345678',
      direccion: 'Jr. Ayacucho 814, Cercado de Lima',
      tipoDocumento: 'DNI',
      numeroDocumento: '47896523',
      status: 'Activo',
      fechaRegistro: '2025-09-20',
    },
    {
      id: 'CLI-1003',
      nombre: 'Andrea Patricia Paredes Flores',
      email: 'andrea.paredes@email.com',
      telefono: '956321478',
      direccion: 'Calle Los Cipreses 420, San Isidro',
      tipoDocumento: 'DNI',
      numeroDocumento: '41236589',
      status: 'Inactivo',
      fechaRegistro: '2025-06-10',
    },
    {
      id: 'CLI-1004',
      nombre: 'Carlos Eduardo Quispe Torres',
      email: 'carlos.quispe@email.com',
      telefono: '934567891',
      direccion: 'Av. Universitaria 1910, Los Olivos',
      tipoDocumento: 'DNI',
      numeroDocumento: '44561237',
      status: 'Activo',
      fechaRegistro: '2025-11-05',
    },
    {
      id: 'CLI-1005',
      nombre: 'Paola Andrea Núñez Rodríguez',
      email: 'paola.nunez@email.com',
      telefono: '978456123',
      direccion: 'Jr. Tacna 532, Huancayo',
      tipoDocumento: 'DNI',
      numeroDocumento: '48975632',
      status: 'Activo',
      fechaRegistro: '2025-07-22',
    },
    {
      id: 'CLI-1006',
      nombre: 'Jorge Luis Mendoza Silva',
      email: 'jorge.mendoza@email.com',
      telefono: '945612378',
      direccion: 'Av. Grau 1250, Piura',
      tipoDocumento: 'DNI',
      numeroDocumento: '42369874',
      status: 'Inactivo',
      fechaRegistro: '2025-05-18',
    },
    {
      id: 'CLI-1007',
      nombre: 'Distribuciones del Norte S.A.C.',
      email: 'contacto@distribucionesnorte.com',
      telefono: '987123456',
      direccion: 'Av. Argentina 2560, Callao',
      tipoDocumento: 'RUC',
      numeroDocumento: '20548796321',
      status: 'Activo',
      fechaRegistro: '2025-10-01',
    },
    {
      id: 'CLI-1008',
      nombre: 'Rosa María Huamán Vega',
      email: 'rosa.huaman@email.com',
      telefono: '961234578',
      direccion: 'Calle Libertad 145, Arequipa',
      tipoDocumento: 'DNI',
      numeroDocumento: '43698521',
      status: 'Activo',
      fechaRegistro: '2025-12-12',
    },
  ]);

  private nextSequence = 1009;

  readonly clientes = this.clientesState.asReadonly();

  getStatusOptions(): StatusOption[] {
    return [...this.statusOptions];
  }

  getTipoDocumentoOptions(): TipoDocumentoOption[] {
    return [...this.tipoDocumentoOptions];
  }

  getById(id: string): Cliente | undefined {
    return this.clientesState().find((item) => item.id === id);
  }

  create(payload: ClienteFormPayload): Cliente {
    const newCliente: Cliente = {
      id: this.generateId(),
      ...payload,
    };

    this.clientesState.update((items) => [newCliente, ...items]);
    return newCliente;
  }

  update(id: string, payload: ClienteFormPayload): void {
    this.clientesState.update((items) =>
      items.map((item) => (item.id === id ? { ...item, ...payload } : item))
    );
  }

  remove(id: string): void {
    this.clientesState.update((items) => items.filter((item) => item.id !== id));
  }

  private generateId(): string {
    const id = `CLI-${String(this.nextSequence).padStart(4, '0')}`;
    this.nextSequence += 1;
    return id;
  }
}
