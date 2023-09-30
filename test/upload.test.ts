import { describe, test, expect } from 'vitest';
import { setup } from '@nuxt/test-utils';

import { useUploadFile } from '../composables/fileMethods.client';

// describe('Test Files', async () => {
//   await setup({
//     // test context options
//     server: true,
//   });

//   const file = new File(['hello'], 'hello.jpg', { type: 'image/jpeg' });

//   test('upload file', async () => {
//     const response = await useUploadFile(file, '/api/upload');

//     expect(response.status).toBe(200);
//   });
// }, 60000);
