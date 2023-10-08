import { Role } from '@/types/user.d';
import bcrypt from 'bcrypt';

//import { getCollection } from '../../utils/database';

export default defineEventHandler(async (event) => {
  if (event.context.user) {
    throw createError({
      statusCode: 409,
      statusMessage: 'User already logged in',
    });
  }

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

  const user = await coll.findOne({
    email: { $regex: body.email, $options: 'i' },
  });

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

  const sessionID = new customID();

  const token = createToken(
    { id: user._id.toString(), email: user.email, role: Role.ADMIN, sessionID },
    { expiresIn: '1h' }
  );

  const headers = event.node.req.headers;

  const ip = event.node.req.headers['x-forwarded-for'];
  const browser = headers['sec-ch-ua'];
  const geoLocation = await getGeoLocation(ip);

  const loginData = {
    _id: sessionID,
    id_user: user._id.toString(),
    ip,
    browser,
    userAgent: headers['user-agent'],
    geoLocation,
    token,
    date: new Date().getTime(),
  };

  const logColl = await client.db('test').collection('login-log');

  await logColl.insertOne(loginData);
  // header expires in 1 hour
  setCookie(event, 'token', token, { maxAge: 3600 });
  // setCookie(event, 'test', 'a test cookie');
  setResponseStatus(event, 200);

  client.close();

  return { message: 'User logged in', role: user.role, sessionID };
});
