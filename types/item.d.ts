import type { ObjectId } from 'mongodb';
import { UnitType, UnitTypesNames, AllUnits, UnitTemperature } from './units';

import { ItemTypes, ItemStatus } from '../utils/itemsEnums';

import { EnumLaboratoryType } from './enums';

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

interface StorageConditions {
  temperature: { min: number; max: number; unit: UnitTemperature };
  humidity: { min: number; max: number };
  pressure?: { min: number; max: number };
  light?: number;
  caution: string;
  protection: string[];
}

export interface INewItem {
  name: string;
  description: string;
  category: EnumItemType;
  quantity: number;
  unit: AllUnits;
  unitType: UnitTypesNames;
  cost: number;
  acquisitionDate?: string | Date | null;
  laboratory: EnumLaboratoryType;
  topics: string[];
  tags: string[];
  experiments: {
    title: string;
    description: string;
  }[];
  expiryDate?: Date | string | null;
  brand?: string | null;
  manufacturer?: string | null;
  storageConditions?: StorageConditions | null;
  notes?: string | null;
}

interface Item extends INewItem {
  _id?: string;
  serialNumber: string;
  addedDate: Date | string | number;
  lastUpdated: Date | string | number;
  code: string;
  image?: string | null;
  images?: string[];
  added_by: string;
}

export interface PhysicsItem extends Item {
  functional: boolean;
  broken: boolean;
  brokenDescription?: string;
  brokenDate?: Date | string | null;
  brokenBy?: string;
}
