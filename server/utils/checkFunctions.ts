import { IUser } from '@/types/user';

export const checkBody = (body: IUser, requiredFields: string[]): boolean => {
  const bodyKeys = Object.keys(body);

  return requiredFields.every((field) => bodyKeys.includes(field));
};

export const checkData = (body: IUser) => {
  const bodyValues = Object.values(body);

  return bodyValues.every((value) => value !== '');
};
