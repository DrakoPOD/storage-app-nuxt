import { Role } from '@/types/user.d';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) return;

  const { checkToken } = await import('../server/utils/checkToken');

  const token = useCookie('token');

  const { payload } = checkToken(token.value);

  if (payload!.role !== Role.ADMIN) {
    // Role.ADMIN is NOT undefined
    return abortNavigation();
  }

  return;
});
