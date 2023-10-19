import { IQueryGetLaboratory } from '@/types/laboratory';
import { ObjectId } from 'mongodb';
import { Role } from '@/types/user.d';

export default defineEventHandler(async (event) => {
  const query: IQueryGetLaboratory = getQuery(event);

  const { id } = query;

  if (!id) {
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

  const result = await coll!.findOneAndUpdate(
    { _id: new ObjectId(id), deleted: { $eq: false } },
    { $set: { deleted: true } }
  );

  client?.close();

  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Laboratory not found',
    });
  } else {
    setResponseStatus(event, 200);
    return { message: 'Laboratory deleted' };
  }
});
