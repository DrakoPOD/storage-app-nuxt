import type { IDatabaseNames } from '@/types/api';

export { Role } from '@/utils/userPermits';

export const databaseNames: IDatabaseNames = {
  manufacturer: {
    database: process.env.MONGO_DB ?? 'test',
    collection: process.env.COLLECTION_MANUFACTURER ?? 'Manufacturer',
  },

  item: {
    database: process.env.MONGO_DB ?? 'test',
    collection: process.env.COLLECTION_ITEM ?? 'Item',
  },
};
