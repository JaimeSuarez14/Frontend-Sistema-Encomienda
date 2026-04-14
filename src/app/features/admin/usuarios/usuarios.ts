import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnDestroy,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  toSignal,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { startWith } from 'rxjs';

import {
  User,
  UserFormPayload,
  UserRole,
  RoleOption,
} from './models/user.model';
import { UsuariosService } from './services/usuarios.service';

type ModalType = 'create' | 'edit' | 'view' | null;
type FilterRole = UserRole | 'Todos';
type FormControlName =
  | 'name'
  | 'email'
  | 'role';

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly usuariosService = inject(UsuariosService);

  readonly roleOptions: RoleOption[] = this.usuariosService.getRoleOptions();
  readonly filterRoleOptions: FilterRole[] = [
    'Todos',
    ...this.roleOptions.map((role) => role.value),
  ];
  readonly usuarios = this.usuariosService.usuarios;

  readonly activeModal = signal<ModalType>(null);
  readonly isModalClosing = signal(false);
  readonly selectedUser = signal<User | null>(null);

  private closeModalTimer: ReturnType<typeof setTimeout> | null = null;

  readonly filterForm = this.formBuilder.nonNullable.group({
    name: '',
    role: 'Todos' as FilterRole,
  });

  readonly userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['cliente' as UserRole, Validators.required],
  });

  private readonly filterValue = toSignal(
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.getRawValue())),
    {
      initialValue: this.filterForm.getRawValue(),
    }
  );

  readonly filteredUsuarios = computed(() => {
    const filters = this.filterValue();
    const searchTerm = filters.name!.trim().toLowerCase();
    const selectedRole = filters.role;

    return this.usuarios().filter((user) => {
      const matchesSearch =
        !searchTerm || user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
      const matchesRole =
        selectedRole === 'Todos' || user.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  });

  readonly modalTitle = computed(() => {
    const currentModal = this.activeModal();
    if (currentModal === 'create') {
      return 'Nuevo usuario';
    }
    if (currentModal === 'edit') {
      return 'Editar usuario';
    }
    if (currentModal === 'view') {
      return 'Detalle de usuario';
    }
    return '';
  });

  readonly isFormModal = computed(() => {
    const currentModal = this.activeModal();
    return currentModal === 'create' || currentModal === 'edit';
  });

  ngOnDestroy(): void {
    if (this.closeModalTimer) {
      clearTimeout(this.closeModalTimer);
    }
  }

  openCreateModal(): void {
    this.selectedUser.set(null);
    this.userForm.reset({
      name: '',
      email: '',
      role: 'cliente',
    });
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.activeModal.set('create');
  }

  openEditModal(user: User): void {
    this.selectedUser.set(user);
    this.userForm.reset({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.activeModal.set('edit');
  }

  openViewModal(user: User): void {
    this.selectedUser.set(user);
    this.activeModal.set('view');
  }

  closeModal(): void {
    if (!this.activeModal()) {
      return;
    }

    this.isModalClosing.set(true);

    if (this.closeModalTimer) {
      clearTimeout(this.closeModalTimer);
    }

    this.closeModalTimer = setTimeout(() => {
      this.activeModal.set(null);
      this.isModalClosing.set(false);
      this.selectedUser.set(null);
      this.closeModalTimer = null;
    }, 220);
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const formValue = this.userForm.getRawValue();
    const payload: UserFormPayload = {
      name: formValue.name?.trim() ?? '',
      email: formValue.email?.trim() ?? '',
      role: formValue.role as UserRole,
    };

    if (this.activeModal() === 'create') {
      this.usuariosService.create(payload);
    } else if (this.activeModal() === 'edit' && this.selectedUser()) {
      this.usuariosService.update(this.selectedUser()!.id, payload);
    }

    this.closeModal();
  }

  deleteUser(user: User): void {
    const shouldDelete = confirm(
      `¿Eliminar el usuario ${user.name} (${user.email})?`
    );

    if (!shouldDelete) {
      return;
    }

    this.usuariosService.remove(user.id);
  }

  clearFilters(): void {
    this.filterForm.reset({
      name: '',
      role: 'Todos',
    });
  }

  getRoleClasses(role: UserRole): string {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700 ring-1 ring-purple-200';
      case 'vendedor':
        return 'bg-blue-100 text-blue-700 ring-1 ring-blue-200';
      case 'chofer':
        return 'bg-orange-100 text-orange-700 ring-1 ring-orange-200';
      case 'cliente':
        return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';
    }
  }

  hasControlError(controlName: FormControlName, errorCode: string): boolean {
    const control = this.userForm.controls[controlName];
    return !!control?.hasError(errorCode) && (control.dirty || control.touched);
  }
}