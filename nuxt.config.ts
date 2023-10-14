// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // modules: ['nuxt-vitest'],

  routeRules: {
    // '/test': { ssr: false },
  },
  css: [
    '@/assets/css/main.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@vueuse/nuxt'],
  vite: {
    server: {
      fs: {
        strict: false,
      },
      cors: true,
    },
  },
});
