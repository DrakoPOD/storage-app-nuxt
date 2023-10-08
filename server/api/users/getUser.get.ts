import { Role } from '@/types/user.d';
import { IQuery } from '@/types/api.d';

export default defineEventHandler(async (event) => {
  if (event.context.error) {
    console.log('Error in event context');
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }

  const user = event.context.user;

  if (user.role !== Role.ADMIN) {
    console.log('Unauthorized');
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const query = getQuery(event) as IQuery;

  if (!validateQueryUser(query)) {
    console.log('Bad request');
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }

  const { coll, client, err } = await getCollection('test', 'users');

  if (err) {
    console.log('Error in getCollection');
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }

  if (query.all === 'true') {
    const users = await coll.find().project({ hash: 0, salt: 0 }).toArray();

    client.close();

    setResponseStatus(event, 200);
    return { users };
  }

  if (query.checkUserName == 'true') {
    const userName = await coll.findOne({
      email: { $regex: query.email, $options: 'i' },
    });

    client.close();

    if (userName) {
      console.log('userName already exists');
      setResponseStatus(event, 409);
      return { message: 'userName already exists' };
    }

    console.log('userName does not exist');
    setResponseStatus(event, 200);
    return { message: 'userName does not exist' };
  }

  const docUser = await coll
    .findOne({ id: query.id })
    .project({ hash: 0, salt: 0 });

  client.close();

  if (!docUser) {
    console.log('User not found');
    setResponseStatus(event, 404);
    return { message: 'User not found' };
  }

  setResponseStatus(event, 200);
  return { user: docUser };
});
