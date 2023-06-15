import type { ObjectId } from 'mongodb';

export interface Manufacturer {
  _id?: ObjectId;
  logo?: string;
  name: string;
  description: string;
  country: string;
  city: string;
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
  _id?: ObjectId;
  serialNumber?: string;
  image?: string;
  name: string;
  description: string;
  quantity: number;
  cost: number;
  addedDate: Date;
  brand: string;
  manufacturer: Manufacturer | object | string | null;
  storageCondition?: StorageCondition | object;
  category: string;
  laboratory: string;
  topic: string;
  experiments: string[];
  code?: string;
}

export interface PhysicsItem extends Item {
  functional: boolean;
  broken: boolean;
  brokenDescription?: string;
  brokenDate?: Date;
  brokenBy?: string;
}
