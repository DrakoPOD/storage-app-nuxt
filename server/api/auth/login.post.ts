import bcrypt from 'bcrypt';

import { getCollection } from '../../utils/database';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { coll, client, err } = await getCollection('test', 'users');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  const user = await coll.findOne({ email: body.email });

  if (!user) {
    setResponseStatus(event, 404);
    return { message: 'User or password are incorrect' };
  }

  bcrypt.compare(body.password, user.hash, (err, result) => {
    if (err) {
      setResponseStatus(event, 500);
      return { message: 'Something went wrong' };
    }

    if (!result) {
      setResponseStatus(event, 404);
      return { message: 'User or password are incorrect' };
    }

    client.close();

    setResponseStatus(event, 200);
    return { message: 'User logged in' };
  });
});
