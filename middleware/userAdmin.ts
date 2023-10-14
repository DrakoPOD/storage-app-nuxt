import { Role } from '@/types/user.d';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const userSession = useUserSession();
    if (userSession.role == 0) return;
    else {
      return navigateTo('/');
    }
  }

  const { checkToken } = await import('../server/utils/checkToken');

  const token = useCookie('token');

  const { payload } = checkToken(token.value!);

  if (payload!.role !== Role.ADMIN) {
    // Role.ADMIN is NOT undefined
    return abortNavigation();
  }

  return;
});
