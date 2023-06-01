import { describe, test, expect, it } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';

describe('My test', async () => {
  await setup({
    // test context options
  });

  test('test GET', async () => {
    const response = await $fetch(
      '/api/item?collection=test&database=test&query={"name":"Pedro"}'
    );

    expect(response.name).toBe('Pedro');
  });
});
