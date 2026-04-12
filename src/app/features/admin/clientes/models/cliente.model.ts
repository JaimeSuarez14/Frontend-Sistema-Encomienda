export type ClienteStatus = 'Activo' | 'Inactivo';
export type TipoDocumento = 'DNI' | 'RUC';

export interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  status: ClienteStatus;
  fechaRegistro: string;
}

export interface ClienteFormPayload {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  status: ClienteStatus;
  fechaRegistro: string;
}

export interface StatusOption {
  value: ClienteStatus;
  label: string;
}

export interface TipoDocumentoOption {
  value: TipoDocumento;
  label: string;
}
