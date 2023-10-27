import type { ObjectId } from 'mongodb';
import { UnitType, UnitTypesNames, AllUnits } from './units';

import { ItemTypes, ItemStatus } from '../utils/itemsEnums';

export type EnumItemType = (typeof ItemTypes)[keyof typeof ItemTypes];
interface a {
  [key: keyof typeof ItemTypes]: String[];
}

export type EnumItemStatus = (typeof ItemStatus)[keyof typeof ItemStatus];

type TypeItemQuantity = {
  [key in EnumItemType]: Readonly<
    Array<Readonly<{ title: string; key: UnitTypesNames }>>
  >;
};

export interface Manufacturer {
  _id?: string;
  logo?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

interface StorageCondition {
  temperature: { min: number; max: number };
  humidity: { min: number; max: number };
  pressure?: { min: number; max: number };
  light?: number;
  description: string;
  caution: string;
  protection: string[];
}

interface Item {
  _id?: string;
  name: string;
  description: string;
  itemType: EnumItemType;
  quantity: {
    value: number;
    unit: AllUnits;
    unitType: UnitTypesNames;
  };
  cost: number;
  addedDate: Date | string | number;
  lastUpdated: Date | string | number;
  category: string;
  laboratory: string;
  topics: string[];
  tags: string[];
  experiments: {
    title: string;
    description: string;
  }[];
  expiryDate?: Date | string | null;
  serialNumber: string;
  code: string;
  image?: string | null;
  brand?: string | null;
  manufacturer?: string | null;
  storageConditions?: StorageCondition | object | null;
  images?: string[];
  notes?: string | null;
}

export interface PhysicsItem extends Item {
  functional: boolean;
  broken: boolean;
  brokenDescription?: string;
  brokenDate?: Date | string | null;
  brokenBy?: string;
}
