export default defineNuxtRouteMiddleware((to, from) => {
  return;

  if (to.path === '/auth/login') return;

  return navigateTo('/auth/login');
});
