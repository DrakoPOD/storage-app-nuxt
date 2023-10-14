import { useStorage, StorageSerializers } from '@vueuse/core';

import { IUserSession } from '@/types/user';

export const useUserSession = () =>
  useStorage<IUserSession>(
    'user-session',
    {
      email: '',
      id: '',
      name: '',
      permissions: [],
      profilePicture: null,
      role: null,
    },
    undefined,
    {
      serializer: StorageSerializers.object,
    }
  );

export const useTitle = () => useState<string>('app-bar-title', () => 'My App');
