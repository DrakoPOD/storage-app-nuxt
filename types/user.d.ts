import { ObjectId } from 'mongodb';
import { JwtPayload } from 'jsonwebtoken';

import { Role, userPermits, specialPermits } from '../utils/userPermits';

export type EnumRole = (typeof Role)[keyof typeof Role];

export type Permission = (typeof userPermits)[keyof typeof userPermits];

export type SpecialPermission =
  (typeof specialPermits)[keyof typeof specialPermits];

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
  role: EnumRole;
}

export interface userFetched {
  name: string;
  email: string;
  role: EnumRole;
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
  role: EnumRole;
  permissions: Permission[];
}

export interface IUserSession {
  id: string;
  profilePicture: string | null;
  name: string;
  email: string;
  role: EnumRole | null;
  permissions: Permission[];
}
