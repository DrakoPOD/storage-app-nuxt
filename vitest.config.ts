import { defineConfig } from 'vitest/config';

export default defineConfig({
  // test context options
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
