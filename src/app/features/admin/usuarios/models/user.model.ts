export type UserRole = 'admin' | 'vendedor' | 'chofer' | 'cliente';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string | null;
}

export interface UserFormPayload {
  name: string;
  email: string;
  role: UserRole;
}

export interface RoleOption {
  value: UserRole;
  label: string;
}
