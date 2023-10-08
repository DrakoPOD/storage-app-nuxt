import type { QueryObject } from 'ufo';

import type { PhysicsItem } from './item';

export interface Body {
  db: { type: string };
  data: PhysicsItem;
}

export interface IDatabaseNames {
  [key: string]: {
    database: string;
    collection: string;
  };
}

export interface IQuery extends QueryObject {
  id?: string;
  all?: boolean;
}
