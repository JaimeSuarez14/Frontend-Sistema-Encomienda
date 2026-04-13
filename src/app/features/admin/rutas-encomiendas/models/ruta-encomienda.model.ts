export type RutaStatus = 'Programada' | 'En curso' | 'Completada' | 'Cancelada';

export interface RutaEncomienda {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string | null;
  status: RutaStatus;
  vehicle: string;
  driver: string;
}

export interface RutaEncomiendaFormPayload {
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string | null;
  status: RutaStatus;
  vehicle: string;
  driver: string;
}

export interface StatusOption {
  value: RutaStatus;
  label: string;
}
