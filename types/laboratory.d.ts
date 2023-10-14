export interface INewLaboratory {
  name: string;
  code: string;
  teacher?: string;
  area?: string;
  building?: string;
}

export interface ILaboratory extends INewLaboratory {
  _id?: ObjectId;
  qtyItems: number;
}
