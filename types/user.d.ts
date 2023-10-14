import { ObjectId } from 'mongodb';
import { JwtPayload } from 'jsonwebtoken';

export enum Role {
  ADMIN = 0,
  USER = 1,
}

export enum Permission {
  READ,
  WRITE,
  DELETE,
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
  id: string;
  email: string;
  role: Role;
}

export interface userFetched {
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
  lastSession: string;
}

export type IQueryUser =
  | { id: string; all: never }
  | { id: never; all: string }
  | { id: never; all: never; checkUserName: string | boolean; email: string };

export interface INewUser {
  name: string;
  lastName: string;
  profilePicture?: string;
  email: string;
  role: Role;
  permissions: Permission[];
}

export interface IUserSession {
  id: string;
  profilePicture: string | null;
  name: string;
  email: string;
  role: Role | null;
  permissions: Permission[];
}
