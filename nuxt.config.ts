// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // modules: ['nuxt-vitest'],

  routeRules: {
    // '/test': { ssr: false },
  },
  css: ['@/assets/css/main.css'],
  vite: {
    server: {
      fs: {
        strict: false,
      },
      cors: true,
    },
  },
});
