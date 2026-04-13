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
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { startWith } from 'rxjs';

import {
  RutaEncomienda,
  RutaEncomiendaFormPayload,
  RutaStatus,
  StatusOption,
} from './models/ruta-encomienda.model';
import { RutasEncomiendasService } from './services/rutas-encomiendas.service';

type ModalType = 'create' | 'edit' | 'view' | null;
type FilterStatus = RutaStatus | 'Todos';
type FormControlName =
  | 'origin'
  | 'destination'
  | 'departureDate'
  | 'arrivalDate'
  | 'status'
  | 'vehicle'
  | 'driver';

@Component({
  selector: 'app-rutas-encomiendas',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rutas-encomiendas.html',
  styleUrl: './rutas-encomiendas.css',
})
export class RutasEncomiendas implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly rutasEncomiendasService = inject(RutasEncomiendasService);

  readonly statusOptions: StatusOption[] = this.rutasEncomiendasService.getStatusOptions();
  readonly filterStatusOptions: FilterStatus[] = [
    'Todos',
    ...this.statusOptions.map((status) => status.value),
  ];
  readonly rutas = this.rutasEncomiendasService.rutas;

  readonly activeModal = signal<ModalType>(null);
  readonly isModalClosing = signal(false);
  readonly selectedRuta = signal<RutaEncomienda | null>(null);

  private closeModalTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly routeValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const departureDate = control.get('departureDate')?.value as string | null;
    const arrivalDate = control.get('arrivalDate')?.value as string | null;
    const status = control.get('status')?.value as RutaStatus | null;

    if (status === 'Completada' && !arrivalDate) {
      return { arrivalDateRequired: true };
    }

    if (departureDate && arrivalDate) {
      const departureTimestamp = this.toDateBoundary(departureDate, false);
      const arrivalTimestamp = this.toDateBoundary(arrivalDate, false);

      if (
        departureTimestamp !== null &&
        arrivalTimestamp !== null &&
        arrivalTimestamp < departureTimestamp
      ) {
        return { dateOrderInvalid: true };
      }
    }

    return null;
  };

  readonly filterForm = this.formBuilder.nonNullable.group({
    search: '',
    status: 'Todos' as FilterStatus,
    startDate: '',
    endDate: '',
  });

  readonly routeForm = this.formBuilder.group(
    {
      origin: ['', [Validators.required, Validators.minLength(3)]],
      destination: ['', [Validators.required, Validators.minLength(3)]],
      departureDate: ['', Validators.required],
      arrivalDate: [''],
      status: ['Programada' as RutaStatus, Validators.required],
      vehicle: ['', [Validators.required, Validators.minLength(3)]],
      driver: ['', [Validators.required, Validators.minLength(3)]],
    }
  );

  private readonly filterValue = toSignal(
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.getRawValue())),
    {
      initialValue: this.filterForm.getRawValue(),
    }
  );

  private readonly formStatusValue = toSignal(
    this.routeForm.controls.status.valueChanges.pipe(
      startWith(this.routeForm.controls.status.value ?? 'Programada')
    ),
    {
      initialValue: this.routeForm.controls.status.value ?? 'Programada',
    }
  );

  readonly isCompletedStatus = computed(() => this.formStatusValue() === 'Completada');

  readonly filteredRutas = computed(() => {
    const filters = this.filterValue();
    const searchTerm = filters.search!.trim().toLowerCase();
    const selectedStatus = filters.status;
    const startDate = this.toDateBoundary(filters.startDate, false);
    const endDate = this.toDateBoundary(filters.endDate, true);

    return this.rutas().filter((ruta) => {
      const matchesSearch =
        !searchTerm ||
        ruta.origin.toLowerCase().includes(searchTerm) ||
        ruta.destination.toLowerCase().includes(searchTerm) ||
        ruta.vehicle.toLowerCase().includes(searchTerm) ||
        ruta.driver.toLowerCase().includes(searchTerm);
      const matchesStatus =
        selectedStatus === 'Todos' || ruta.status === selectedStatus;
      const departureDate = this.toDateBoundary(ruta.departureDate, false);
      const matchesStartDate = startDate === null || (departureDate !== null && departureDate >= startDate);
      const matchesEndDate = endDate === null || (departureDate !== null && departureDate <= endDate);

      return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
    });
  });

  readonly modalTitle = computed(() => {
    const currentModal = this.activeModal();
    if (currentModal === 'create') {
      return 'Nueva ruta';
    }
    if (currentModal === 'edit') {
      return 'Editar ruta';
    }
    if (currentModal === 'view') {
      return 'Detalle de ruta';
    }
    return '';
  });

  readonly isFormModal = computed(() => {
    const currentModal = this.activeModal();
    return currentModal === 'create' || currentModal === 'edit';
  });

  constructor() {
    this.routeForm.controls.status.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        if (status !== 'Completada') {
          this.routeForm.controls.arrivalDate.setValue('');
        }
        this.routeForm.updateValueAndValidity({ emitEvent: false });
      });
  }

  ngOnDestroy(): void {
    if (this.closeModalTimer) {
      clearTimeout(this.closeModalTimer);
    }
  }

  openCreateModal(): void {
    this.selectedRuta.set(null);
    this.routeForm.reset({
      origin: '',
      destination: '',
      departureDate: '',
      arrivalDate: '',
      status: 'Programada',
      vehicle: '',
      driver: '',
    });
    this.routeForm.markAsPristine();
    this.routeForm.markAsUntouched();
    this.activeModal.set('create');
  }

  openEditModal(ruta: RutaEncomienda): void {
    this.selectedRuta.set(ruta);
    this.routeForm.reset({
      origin: ruta.origin,
      destination: ruta.destination,
      departureDate: ruta.departureDate,
      arrivalDate: ruta.arrivalDate ?? '',
      status: ruta.status,
      vehicle: ruta.vehicle,
      driver: ruta.driver,
    });
    this.routeForm.markAsPristine();
    this.routeForm.markAsUntouched();
    this.activeModal.set('edit');
  }

  openViewModal(ruta: RutaEncomienda): void {
    this.selectedRuta.set(ruta);
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
      this.selectedRuta.set(null);
      this.closeModalTimer = null;
    }, 220);
  }

  submitForm(): void {
    if (this.routeForm.invalid) {
      this.routeForm.markAllAsTouched();
      return;
    }

    const formValue = this.routeForm.getRawValue();
    const payload: RutaEncomiendaFormPayload = {
      origin: formValue.origin?.trim() ?? '',
      destination: formValue.destination?.trim() ?? '',
      departureDate: formValue.departureDate ?? '',
      arrivalDate: this.normalizeDate(formValue.arrivalDate),
      status: formValue.status as RutaStatus,
      vehicle: formValue.vehicle?.trim() ?? '',
      driver: formValue.driver?.trim() ?? '',
    };

    if (this.activeModal() === 'create') {
      this.rutasEncomiendasService.create(payload);
    } else if (this.activeModal() === 'edit' && this.selectedRuta()) {
      this.rutasEncomiendasService.update(this.selectedRuta()!.id, payload);
    }

    this.closeModal();
  }

  deleteRuta(ruta: RutaEncomienda): void {
    const shouldDelete = confirm(
      `¿Eliminar la ruta ${ruta.id} de ${ruta.origin} a ${ruta.destination}?`
    );

    if (!shouldDelete) {
      return;
    }

    this.rutasEncomiendasService.remove(ruta.id);
  }

  clearFilters(): void {
    this.filterForm.reset({
      search: '',
      status: 'Todos',
      startDate: '',
      endDate: '',
    });
  }

  getStatusClasses(status: RutaStatus): string {
    if (status === 'Completada') {
      return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
    }

    if (status === 'En curso') {
      return 'bg-sky-100 text-sky-700 ring-1 ring-sky-200';
    }

    if (status === 'Cancelada') {
      return 'bg-red-100 text-red-700 ring-1 ring-red-200';
    }

    return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
  }

  hasControlError(controlName: FormControlName, errorCode: string): boolean {
    const control = this.routeForm.controls[controlName];
    return !!control?.hasError(errorCode) && (control.dirty || control.touched);
  }

  hasFormError(errorCode: 'arrivalDateRequired' | 'dateOrderInvalid'): boolean {
    return (
      !!this.routeForm.errors?.[errorCode] &&
      (this.routeForm.dirty || this.routeForm.touched)
    );
  }

  private normalizeDate(value: string | null | undefined): string | null {
    return value && value.trim().length > 0 ? value : null;
  }

  private toDateBoundary(
    value: string | null | undefined,
    endOfDay: boolean
  ): number | null {
    if (!value) {
      return null;
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return null;
    }

    if (endOfDay) {
      date.setHours(23, 59, 59, 999);
    } else {
      date.setHours(0, 0, 0, 0);
    }

    return date.getTime();
  }

}
