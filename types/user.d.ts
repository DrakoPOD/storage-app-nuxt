import { ObjectId } from 'mongodb';
import { JwtPayload } from 'jsonwebtoken';
import { Role } from './role';

export enum Role {
  ADMIN,
  USER,
}

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

export interface UserPayload extends JwtPayload {
  email: string;
  role: Role;
}
