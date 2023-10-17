import bcrypt from 'bcrypt';

import { UserPayload, Role } from '@/types/user.d';

export default defineEventHandler(async (event) => {
  // get Ip address
  if (event.context.error) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    });
  }
  const user = event.context.user;

  if (user.role !== Role.ADMIN) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { coll, client, err } = await getCollection('test', 'users');

  if (err) {
    console.logI('Error connecting to database');
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }

  const body = await readBody(event);

  if (!validateNewUser(body)) {
    console.log(body);
    console.log('invalid body');
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }

  const exist = await coll.findOne({
    email: { $regex: body.email, $options: 'i' },
  });

  if (exist) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User already exists',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(
    body.password || process.env.DEFAULT_USER_PASSWORD || 'Pass1234',
    salt
  );

  const userDoc = {
    ...body,
    salt,
    hash,
  };

  const result = await coll.insertOne(userDoc);

  client.close();

  setResponseStatus(event, 201);
  return { message: 'User created' };
});
