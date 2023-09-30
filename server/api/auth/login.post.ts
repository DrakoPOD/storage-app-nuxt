import { Role } from '@/types/user.d';
import bcrypt from 'bcrypt';

//import { getCollection } from '../../utils/database';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!validateBody(body)) {
    setResponseStatus(even, 400);
    return { message: 'Bad request' };
  }

  const { coll, client, err } = await getCollection('test', 'users');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  const user = await coll.findOne({ email: body.email });

  if (!user) {
    setResponseStatus(event, 400);
    return { message: 'User or password are incorrect' };
  }

  const result = await comparePassword(body.password, user.hash);

  if (result === 500) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  if (result === 400) {
    setResponseStatus(event, 400);
    return { message: 'User or password are incorrect' };
  }

  client.close();

  const token = createToken(
    { email: user.email, role: Role.ADMIN },
    { expiresIn: '1h' }
  );

  // header expires in 1 hour
  setCookie(event, 'token', token, { httpOnly: true, maxAge: 3600 });
  setResponseStatus(event, 200);

  event.respondWith();
  return { message: 'User logged in' };
});
