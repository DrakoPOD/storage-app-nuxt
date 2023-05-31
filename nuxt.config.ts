// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
  },
});
