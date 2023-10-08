import bcrypt from 'bcrypt';

import { getCollection } from '../../utils/database';

import type { IUser } from '@/types/user';
import { checkBody, checkData } from '../../utils/checkFunctions';

export default defineEventHandler(async (event) => {
  let body = await readBody<IUser>(event);

  if (!checkBody(body, ['email', 'password']) || !checkData(body)) {
    setResponseStatus(event, 400);
    return { message: 'Missing required fields' };
  }

  const { coll, client, err } = await getCollection('test', 'users');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  const userExist = await coll.findOne({ email: body.email });

  if (userExist) {
    setResponseStatus(event, 409);
    return { message: 'User already exists' };
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(body.password!, salt);

  delete body.password;
  body = { ...body, salt, hash };
  await coll.insertOne(body);

  await client.close();
  console.log('User created');
  setResponseStatus(event, 201);
  return { message: 'User created' };
});
