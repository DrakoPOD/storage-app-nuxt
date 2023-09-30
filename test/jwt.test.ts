import { describe, test, expect } from 'vitest';
import { setup } from '@nuxt/test-utils';

import { createToken, checkToken } from '../server/utils/checkToken';

describe('JWT Test', async () => {
  await setup({
    // test context options
  });

  var token: string;
  test('test-token-generator', () => {
    token = createToken({ email: 'testEmail' }, { expiresIn: '1h' });
    expect(token).toBeDefined();
  });

  test('test-token-check', () => {
    const payload = checkToken(token);
    expect(payload.email).toBe('testEmail');
  });

  test('test-token-check-fail', () => {
    expect(() => {
      checkToken('invalidToken');
    }).toThrow();
  });
});
