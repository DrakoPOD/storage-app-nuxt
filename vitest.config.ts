import { defineConfig } from 'vitest/config';

export default defineConfig({
  // test context options
  test: {
    globals: true,
    environment: 'jsdom',
  },
  // add tsconfig-paths to resolve
  resolve: {
    alias: {
      '@/server/utils': './server/utils/',
    },
  },
});
