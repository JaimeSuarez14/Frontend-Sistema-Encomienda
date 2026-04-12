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
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { startWith } from 'rxjs';

import {
  Cliente,
  ClienteFormPayload,
  ClienteStatus,
  StatusOption,
  TipoDocumentoOption,
} from './models/cliente.model';
import { ClientesService } from './services/clientes.service';

type ModalType = 'create' | 'edit' | 'view' | null;
type FilterStatus = ClienteStatus | 'Todos';
type FormControlName =
  | 'nombre'
  | 'email'
  | 'telefono'
  | 'direccion'
  | 'tipoDocumento'
  | 'numeroDocumento'
  | 'status';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly clientesService = inject(ClientesService);

  readonly statusOptions: StatusOption[] = this.clientesService.getStatusOptions();
  readonly tipoDocumentoOptions: TipoDocumentoOption[] = this.clientesService.getTipoDocumentoOptions();
  readonly filterStatusOptions: FilterStatus[] = [
    'Todos',
    ...this.statusOptions.map((status) => status.value),
  ];
  readonly clientes = this.clientesService.clientes;

  readonly activeModal = signal<ModalType>(null);
  readonly isModalClosing = signal(false);
  readonly selectedCliente = signal<Cliente | null>(null);

  private closeModalTimer: ReturnType<typeof setTimeout> | null = null;

  readonly filterForm = this.formBuilder.nonNullable.group({
    search: '',
    status: 'Todos' as FilterStatus,
    tipoDocumento: 'Todos' as 'Todos' | 'DNI' | 'RUC',
  });

  readonly clienteForm = this.formBuilder.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      direccion: ['', [Validators.required, Validators.minLength(8)]],
      tipoDocumento: ['DNI' as 'DNI' | 'RUC', Validators.required],
      numeroDocumento: ['', [Validators.required]],
      status: ['Activo' as ClienteStatus, Validators.required],
      fechaRegistro: ['', Validators.required],
    },
    {
      validators: [this.documentValidator.bind(this)],
    }
  );

  private readonly filterValue = toSignal(
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.getRawValue())),
    {
      initialValue: this.filterForm.getRawValue(),
    }
  );

  readonly filteredClientes = computed(() => {
    const filters = this.filterValue();
    const searchTerm = filters.search!.trim().toLowerCase();
    const selectedStatus = filters.status;
    const selectedTipoDocumento = filters.tipoDocumento;

    return this.clientes().filter((cliente) => {
      const matchesSearch =
        !searchTerm ||
        cliente.nombre.toLowerCase().includes(searchTerm) ||
        cliente.email.toLowerCase().includes(searchTerm) ||
        cliente.numeroDocumento.includes(searchTerm);
      const matchesStatus =
        selectedStatus === 'Todos' || cliente.status === selectedStatus;
      const matchesTipoDocumento =
        selectedTipoDocumento === 'Todos' ||
        cliente.tipoDocumento === selectedTipoDocumento;

      return matchesSearch && matchesStatus && matchesTipoDocumento;
    });
  });

  readonly modalTitle = computed(() => {
    const currentModal = this.activeModal();
    if (currentModal === 'create') {
      return 'Nuevo cliente';
    }
    if (currentModal === 'edit') {
      return 'Editar cliente';
    }
    if (currentModal === 'view') {
      return 'Detalle de cliente';
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
    this.selectedCliente.set(null);
    const today = new Date().toISOString().split('T')[0];
    this.clienteForm.reset({
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      status: 'Activo',
      fechaRegistro: today,
    });
    this.clienteForm.markAsPristine();
    this.clienteForm.markAsUntouched();
    this.activeModal.set('create');
  }

  openEditModal(cliente: Cliente): void {
    this.selectedCliente.set(cliente);
    this.clienteForm.reset({
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      tipoDocumento: cliente.tipoDocumento,
      numeroDocumento: cliente.numeroDocumento,
      status: cliente.status,
      fechaRegistro: cliente.fechaRegistro,
    });
    this.clienteForm.markAsPristine();
    this.clienteForm.markAsUntouched();
    this.activeModal.set('edit');
  }

  openViewModal(cliente: Cliente): void {
    this.selectedCliente.set(cliente);
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
      this.selectedCliente.set(null);
      this.closeModalTimer = null;
    }, 220);
  }

  submitForm(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

    const formValue = this.clienteForm.getRawValue();
    const payload: ClienteFormPayload = {
      nombre: formValue.nombre?.trim() ?? '',
      email: formValue.email?.trim() ?? '',
      telefono: formValue.telefono ?? '',
      direccion: formValue.direccion?.trim() ?? '',
      tipoDocumento: formValue.tipoDocumento as 'DNI' | 'RUC',
      numeroDocumento: formValue.numeroDocumento ?? '',
      status: formValue.status as ClienteStatus,
      fechaRegistro: formValue.fechaRegistro ?? '',
    };

    if (this.activeModal() === 'create') {
      this.clientesService.create(payload);
    } else if (this.activeModal() === 'edit' && this.selectedCliente()) {
      this.clientesService.update(this.selectedCliente()!.id, payload);
    }

    this.closeModal();
  }

  deleteCliente(cliente: Cliente): void {
    const shouldDelete = confirm(
      `¿Eliminar al cliente ${cliente.nombre}?`
    );

    if (!shouldDelete) {
      return;
    }

    this.clientesService.remove(cliente.id);
  }

  clearFilters(): void {
    this.filterForm.reset({
      search: '',
      status: 'Todos',
      tipoDocumento: 'Todos',
    });
  }

  getStatusClasses(status: ClienteStatus): string {
    if (status === 'Activo') {
      return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
    }
    return 'bg-rose-100 text-rose-700 ring-1 ring-rose-200';
  }

  getTipoDocumentoLabel(tipo: 'DNI' | 'RUC'): string {
    return tipo === 'DNI' ? 'DNI' : 'RUC';
  }

  hasControlError(controlName: string, errorCode: string): boolean {
    //const control = this.clienteForm.controls[controlName];
    //return !!control?.hasError(errorCode) && (control.dirty || control.touched);
    return false;
  }

  hasFormError(errorCode: 'documentInvalid' | 'documentLength'): boolean {
    return (
      !!this.clienteForm.errors?.[errorCode] &&
      (this.clienteForm.dirty || this.clienteForm.touched)
    );
  }

  private documentValidator(control: AbstractControl) {
    const tipoDocumento = control.get('tipoDocumento')?.value as 'DNI' | 'RUC';
    const numeroDocumento = control.get('numeroDocumento')?.value as string;

    if (!numeroDocumento) {
      return null;
    }

    if (tipoDocumento === 'DNI' && numeroDocumento.length !== 8) {
      return { documentLength: true };
    }

    if (tipoDocumento === 'RUC' && numeroDocumento.length !== 11) {
      return { documentLength: true };
    }

    const documentRegex = /^\d+$/;
    if (!documentRegex.test(numeroDocumento)) {
      return { documentInvalid: true };
    }

    return null;
  }
}
