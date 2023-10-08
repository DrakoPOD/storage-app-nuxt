import { Role } from '@/types/user.d';
import type { UserPayload } from '@/types/user';

//import { checkToken } from '@/server/utils/checkToken';
/**
 * Uncaught TypeError: Cannot read properties of undefined (reading 'from')
    at node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('token');

  if (process.client) {
    if (!token.value) {
      if (to.path === '/auth/login') return;
      return navigateTo('/auth/login');
    }
    return;
  }

  const { checkToken } = await import('../server/utils/checkToken');
  const { checkBlacklist } = await import('../server/utils/checkToken');

  if (token.value) {
    try {
      const { payload } = checkToken(token.value);
      if (!payload) {
        if (to.path === '/auth/login') return;
        return navigateTo('/auth/login');
      }
      const valid = await checkBlacklist(token.value);

      if (!valid) {
        if (to.path === '/auth/login') return;
        return navigateTo('/auth/login');
      }

      if (to.path === '/auth/login') return navigateTo('/');
      return;
    } catch (err) {
      console.log('---------- error in middleware ---------');
      if (to.path === '/auth/login') return;
      return navigateTo('/auth/login');
    }
  }

  if (to.path === '/auth/login') return;

  return navigateTo('/auth/login');
});
