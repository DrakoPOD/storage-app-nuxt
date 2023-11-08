import type { IBodyAddLaboratory, ILaboratory } from '@/types/laboratory';
import { ObjectId } from 'mongodb';

export default defineEventHandler(async (event) => {
  const body = await readBody<IBodyAddLaboratory>(event);

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

  const { _id, qtyItems, deleted, inserted_user_id, ...rest } = body;

  const { validBody } = await validateBodyLaboratory(rest);

  if (!validBody || !_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid data',
    });
  }

  const result = await coll!.findOneAndUpdate(
    { _id: new ObjectId(_id), deleted: { $eq: false } },
    { $set: rest }
  );

  client?.close();

  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Laboratory not found',
    });
  } else {
    setResponseStatus(event, 200);
    return { message: 'Laboratory updated' };
  }
});
