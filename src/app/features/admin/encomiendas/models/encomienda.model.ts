export type EncomiendaStatus = 'Pendiente' | 'En tránsito' | 'Entregado';

export interface Encomienda {
  id: string;
  customerName: string;
  shippingAddress: string;
  status: EncomiendaStatus;
  sentDate: string;
  deliveredDate: string | null;
}

export interface EncomiendaFormPayload {
  customerName: string;
  shippingAddress: string;
  status: EncomiendaStatus;
  sentDate: string;
  deliveredDate: string | null;
}

export interface StatusOption {
  value: EncomiendaStatus;
  label: string;
}
