import { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId;
  email: string;
  password?: string;
  salt?: string;
  hash?: string;
  firstName: string;
  lastName: string;
  role: string;
  laboratory: string[];
}
