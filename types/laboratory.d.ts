import { QueryObject } from 'ufo';
import { ObjectId } from 'mongodb';

export interface INewLaboratory {
  name: string;
  code: string;
  teacher?: string;
  area?: string;
  building?: string;
}

export interface ILaboratory extends INewLaboratory {
  _id?: ObjectId;
  qtyItems?: number;
}

export interface IQueryCheckLabCode extends QueryObject {
  code: string;
}

export interface IQueryGetLaboratory extends QueryObject {
  id?: string;
  code?: string;
  name?: string;
  teacher?: string;
}

export interface IBodyAddLaboratory extends INewLaboratory {
  _id: ObjectId;
  deleted?: boolean;
  qtyItems?: number;
  inserted_user_id: ObjectId;
}
