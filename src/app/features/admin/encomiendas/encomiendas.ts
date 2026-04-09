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
  Encomienda,
  EncomiendaFormPayload,
  EncomiendaStatus,
  StatusOption,
} from './models/encomienda.model';
import { EncomiendasService } from './services/encomiendas.service';

type ModalType = 'create' | 'edit' | 'view' | null;
type FilterStatus = EncomiendaStatus | 'Todos';
type FormControlName =
  | 'customerName'
  | 'shippingAddress'
  | 'status'
  | 'sentDate'
  | 'deliveredDate';

@Component({
  selector: 'app-encomiendas',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './encomiendas.html',
  styleUrl: './encomiendas.css',
})
export class Encomiendas implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly encomiendasService = inject(EncomiendasService);

  readonly statusOptions: StatusOption[] = this.encomiendasService.getStatusOptions();
  readonly filterStatusOptions: FilterStatus[] = [
    'Todos',
    ...this.statusOptions.map((status) => status.value),
  ];
  readonly encomiendas = this.encomiendasService.encomiendas;

  readonly activeModal = signal<ModalType>(null);
  readonly isModalClosing = signal(false);
  readonly selectedEncomienda = signal<Encomienda | null>(null);

  private closeModalTimer: ReturnType<typeof setTimeout> | null = null;

  readonly filterForm = this.formBuilder.nonNullable.group({
    customer: '',
    status: 'Todos' as FilterStatus,
    startDate: '',
    endDate: '',
  });

  readonly orderForm = this.formBuilder.group(
    {
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      shippingAddress: ['', [Validators.required, Validators.minLength(8)]],
      status: ['Pendiente' as EncomiendaStatus, Validators.required],
      sentDate: ['', Validators.required],
      deliveredDate: [''],
    },
    {

    }
  );

  private readonly filterValue = toSignal(
    this.filterForm.valueChanges.pipe(startWith(this.filterForm.getRawValue())),
    {
      initialValue: this.filterForm.getRawValue(),
    }
  );

  private readonly formStatusValue = toSignal(
    this.orderForm.controls.status.valueChanges.pipe(
      startWith(this.orderForm.controls.status.value ?? 'Pendiente')
    ),
    {
      initialValue: this.orderForm.controls.status.value ?? 'Pendiente',
    }
  );

  readonly isDeliveredStatus = computed(() => this.formStatusValue() === 'Entregado');

  readonly filteredEncomiendas = computed(() => {
    const filters = this.filterValue();
    const searchTerm = filters.customer!.trim().toLowerCase();
    const selectedStatus = filters.status;
    const startDate = this.toDateBoundary(filters.startDate, false);
    const endDate = this.toDateBoundary(filters.endDate, true);

    return this.encomiendas().filter((encomienda) => {
      const matchesSearch =
        !searchTerm || encomienda.customerName.toLowerCase().includes(searchTerm);
      const matchesStatus =
        selectedStatus === 'Todos' || encomienda.status === selectedStatus;
      const sentDate = this.toDateBoundary(encomienda.sentDate, false);
      const matchesStartDate = startDate === null || (sentDate !== null && sentDate >= startDate);
      const matchesEndDate = endDate === null || (sentDate !== null && sentDate <= endDate);

      return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
    });
  });

  readonly modalTitle = computed(() => {
    const currentModal = this.activeModal();
    if (currentModal === 'create') {
      return 'Nueva encomienda';
    }
    if (currentModal === 'edit') {
      return 'Editar encomienda';
    }
    if (currentModal === 'view') {
      return 'Detalle de encomienda';
    }
    return '';
  });

  readonly isFormModal = computed(() => {
    const currentModal = this.activeModal();
    return currentModal === 'create' || currentModal === 'edit';
  });

  constructor() {
    this.orderForm.controls.status.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        if (status !== 'Entregado') {
          this.orderForm.controls.deliveredDate.setValue('');
        }
        this.orderForm.updateValueAndValidity({ emitEvent: false });
      });
  }

  ngOnDestroy(): void {
    if (this.closeModalTimer) {
      clearTimeout(this.closeModalTimer);
    }
  }

  openCreateModal(): void {
    this.selectedEncomienda.set(null);
    this.orderForm.reset({
      customerName: '',
      shippingAddress: '',
      status: 'Pendiente',
      sentDate: '',
      deliveredDate: '',
    });
    this.orderForm.markAsPristine();
    this.orderForm.markAsUntouched();
    this.activeModal.set('create');
  }

  openEditModal(encomienda: Encomienda): void {
    this.selectedEncomienda.set(encomienda);
    this.orderForm.reset({
      customerName: encomienda.customerName,
      shippingAddress: encomienda.shippingAddress,
      status: encomienda.status,
      sentDate: encomienda.sentDate,
      deliveredDate: encomienda.deliveredDate ?? '',
    });
    this.orderForm.markAsPristine();
    this.orderForm.markAsUntouched();
    this.activeModal.set('edit');
  }

  openViewModal(encomienda: Encomienda): void {
    this.selectedEncomienda.set(encomienda);
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
      this.selectedEncomienda.set(null);
      this.closeModalTimer = null;
    }, 220);
  }

  submitForm(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const formValue = this.orderForm.getRawValue();
    const payload: EncomiendaFormPayload = {
      customerName: formValue.customerName?.trim() ?? '',
      shippingAddress: formValue.shippingAddress?.trim() ?? '',
      status: formValue.status as EncomiendaStatus,
      sentDate: formValue.sentDate ?? '',
      deliveredDate: this.normalizeDate(formValue.deliveredDate),
    };

    if (this.activeModal() === 'create') {
      this.encomiendasService.create(payload);
    } else if (this.activeModal() === 'edit' && this.selectedEncomienda()) {
      this.encomiendasService.update(this.selectedEncomienda()!.id, payload);
    }

    this.closeModal();
  }

  deleteEncomienda(encomienda: Encomienda): void {
    const shouldDelete = confirm(
      `¿Eliminar la encomienda ${encomienda.id} de ${encomienda.customerName}?`
    );

    if (!shouldDelete) {
      return;
    }

    this.encomiendasService.remove(encomienda.id);
  }

  clearFilters(): void {
    this.filterForm.reset({
      customer: '',
      status: 'Todos',
      startDate: '',
      endDate: '',
    });
  }

  getStatusClasses(status: EncomiendaStatus): string {
    if (status === 'Entregado') {
      return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
    }

    if (status === 'En tránsito') {
      return 'bg-sky-100 text-sky-700 ring-1 ring-sky-200';
    }

    return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
  }

  hasControlError(controlName: FormControlName, errorCode: string): boolean {
    const control = this.orderForm.controls[controlName];
    return !!control?.hasError(errorCode) && (control.dirty || control.touched);
  }

  hasFormError(errorCode: 'deliveredDateRequired' | 'dateOrderInvalid'): boolean {
    return (
      !!this.orderForm.errors?.[errorCode] &&
      (this.orderForm.dirty || this.orderForm.touched)
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

  private readonly deliveryDateValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const sentDate = control.get('sentDate')?.value as string | null;
    const deliveredDate = control.get('deliveredDate')?.value as string | null;
    const status = control.get('status')?.value as EncomiendaStatus | null;

    if (status === 'Entregado' && !deliveredDate) {
      return { deliveredDateRequired: true };
    }

    if (sentDate && deliveredDate) {
      const sentTimestamp = this.toDateBoundary(sentDate, false);
      const deliveredTimestamp = this.toDateBoundary(deliveredDate, false);

      if (
        sentTimestamp !== null &&
        deliveredTimestamp !== null &&
        deliveredTimestamp < sentTimestamp
      ) {
        return { dateOrderInvalid: true };
      }
    }

    return null;
  };

}
