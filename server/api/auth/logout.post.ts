import { parseCookies } from 'h3';

export default defineEventHandler(async (event) => {
  if (event.context.error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }

  const payload = event.context.user;
  const token = event.context.token;

  const data = {
    token,
    email: payload.email,
    id: payload.id,
    expires: payload.exp,
    expireAt: new Date(payload.exp! * 1000),
  };

  const { coll, client, err } = await getCollection('test', 'revoked-tokens');

  if (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }

  const docToken = await coll.findOne({ token });

  if (docToken) {
    setResponseStatus(event, 400);
    return { message: 'Bad request' };
  }

  coll.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });

  const result = await coll.insertOne(data);

  client.close();

  setResponseStatus(event, 200);
  return { message: 'User logged out' };
});
