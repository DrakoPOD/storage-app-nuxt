import type { Permission, EnumRole, SpecialPermission } from '@/types/user';

export const userPermits = {
  READ: 0,
  CREATE: 1,
  DELETE: 2,
  UPDATE: 3,
} as const;

export const userPermitsNames: { readonly [key in Permission]: string } = {
  0: 'Leer',
  1: 'Crear',
  2: 'Eliminar',
  3: 'Actualizar',
} as const;

export const specialPermits = {} as const;

export const specialPermitsNames: {
  [key in SpecialPermission]: string;
} = {} as const;

export const Role = {
  ADMIN: 0,
  USER: 1,
} as const;

export const roleNames: { readonly [key in EnumRole]: string } = {
  0: 'Admin',
  1: 'Usuario',
} as const;
