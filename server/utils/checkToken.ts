import type { UserPayload } from '@/types/user';
import { getCollection } from './database';
import { default as jwt } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export const checkToken = (token: string) => {
  try {
    const payload = jwt.verify(token, secret) as UserPayload;

    return { payload };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return { error: 'expired' };
    } else if (err instanceof jwt.JsonWebTokenError) {
      return { error: 'invalid' };
    } else {
      throw err;
    }
  }
};

export const createToken = (payload: any, options?: jwt.SignOptions) => {
  return jwt.sign(payload, secret, options);
};

export const checkBlacklist = async (token: string) => {
  const { coll, err } = await getCollection('test', 'revoked-tokens');

  if (err) {
    return { valid: false, error: 'internal server error' };
  }

  const doc = await coll!.findOne({ token });

  if (doc) return { valid: false };

  return { valid: true };
};
