import type { Permission, EnumRole } from '@/types/user.d';
import { H3Event } from 'h3';

import { Role } from '@/utils/userPermits';

export const authUser = async (
  event: H3Event,
  role: EnumRole[] = [Role.ADMIN, Role.USER],
  permissions: Permission | null = null,
  allowUser: string | string[] | null = null
) => {
  const { user, valid } = event.context;

  if (!user) {
    return false;
  }

  if (!valid) {
    return false;
  }

  if (role) {
    if (!role.includes(user.role)) {
      return false;
    }
  }

  if (permissions) {
    if (!user.permissions.includes(permissions)) {
      return false;
    }
  }

  if (allowUser) {
    if (Array.isArray(allowUser)) {
      if (!allowUser.includes(user.id)) {
        return false;
      }
    } else {
      if (allowUser !== user.id) {
        return false;
      }
    }
  }

  return true;
};
