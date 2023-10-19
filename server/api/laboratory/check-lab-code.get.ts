import { IQueryCheckLabCode } from '@/types/laboratory';
import { Role } from '@/types/user.d';

export default defineEventHandler(async (event) => {
  const query: IQueryCheckLabCode = getQuery(event);
  const { code } = query;

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }

  if (!(await authUser(event, [Role.ADMIN]))) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { coll, client, err } = await getCollection('test', 'laboratories');

  if (err) {
    console.log('Error connecting to database');
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }

  const exist = await coll!.findOne({
    code: { $regex: code, $options: 'i' },
    deleted: { $eq: false },
  });

  if (exist) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Laboratory already exists',
    });
  }

  client?.close();

  setResponseStatus(event, 200);
  return { message: 'Laboratory code is available' };
});
