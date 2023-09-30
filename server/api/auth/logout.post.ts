import { parseCookies } from 'h3';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  const token = cookies.token;

  if (!token) {
    setResponseStatus(event, 400);
    return { message: 'Bad request' };
  }

  const { payload, error } = checkToken(token);

  if (error === 'expired') {
    setResponseStatus(event, 400);
    return { message: 'Token expired' };
  }

  if (!payload) {
    setResponseStatus(event, 400);
    return { message: 'Bad request' };
  }

  const data = {
    token,
    user: payload.email,
    expires: payload.exp,
    expireAt: new Date(payload.exp! * 1000),
  };

  const { coll, err } = await getCollection('test', 'revoked-tokens');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  const docToken = await coll.findOne({ token });

  if (docToken) {
    setResponseStatus(event, 400);
    return { message: 'Bad request' };
  }

  await coll.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });

  const result = await coll.insertOne(data);

  setResponseStatus(event, 200);
  return { message: 'User logged out' };
});
