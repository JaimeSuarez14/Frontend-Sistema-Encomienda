import { Injectable, signal } from '@angular/core';

import {
  User,
  UserFormPayload,
  UserRole,
  RoleOption,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private readonly roleOptions: RoleOption[] = [
    { value: 'admin', label: 'Administrador' },
    { value: 'vendedor', label: 'Vendedor' },
    { value: 'chofer', label: 'Chofer' },
    { value: 'cliente', label: 'Cliente' },
  ];

  private readonly usuariosState = signal<User[]>([
    {
      id: 'USR-001',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      createdAt: '2026-01-15',
      updatedAt: null,
    },
    {
      id: 'USR-002',
      name: 'Vendedor Uno',
      email: 'vendedor1@example.com',
      role: 'vendedor',
      createdAt: '2026-02-01',
      updatedAt: null,
    },
    {
      id: 'USR-003',
      name: 'Chofer Dos',
      email: 'chofer2@example.com',
      role: 'chofer',
      createdAt: '2026-02-10',
      updatedAt: null,
    },
    {
      id: 'USR-004',
      name: 'Cliente Frecuente',
      email: 'cliente@example.com',
      role: 'cliente',
      createdAt: '2026-03-01',
      updatedAt: null,
    },
  ]);

  private nextSequence = 5; // Starting from 5 as we have 4 mock users

  readonly usuarios = this.usuariosState.asReadonly();

  getRoleOptions(): RoleOption[] {
    return [...this.roleOptions];
  }

  getById(id: string): User | undefined {
    return this.usuariosState().find((item) => item.id === id);
  }

  create(payload: UserFormPayload): User {
    const newUser: User = {
      id: this.generateId(),
      ...payload,
      createdAt: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      updatedAt: null,
    };

    this.usuariosState.update((items) => [newUser, ...items]);
    return newUser;
  }

  update(id: string, payload: UserFormPayload): void {
    this.usuariosState.update((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, ...payload, updatedAt: new Date().toISOString().split('T')[0] }
          : item
      )
    );
  }

  remove(id: string): void {
    this.usuariosState.update((items) => items.filter((item) => item.id !== id));
  }

  private generateId(): string {
    const id = `USR-${String(this.nextSequence).padStart(3, '0')}`;
    this.nextSequence += 1;
    return id;
  }
}
