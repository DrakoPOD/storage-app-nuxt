import { describe, test, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';

import { useGet } from '../composables/apiMethods';

describe('My test', async () => {
  await setup({
    // test context options
  });

  test('test GET', async () => {
    const response = await $fetch('/api/item', {
      method: 'GET',
      query: {
        name: 'asdsd',
      },
    });

    expect(response.name).toBe('asdsd');
  });
});
