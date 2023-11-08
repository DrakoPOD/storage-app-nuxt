import type {
  IBodyAddLaboratory,
  IQueryGetLaboratory,
} from '@/types/laboratory';
import { ObjectId, FindOptions, Filter, Document } from 'mongodb';

export default defineEventHandler(async (event) => {
  const query: IQueryGetLaboratory = getQuery(event);
  const { code, id } = query;

  if (!code && !id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad request',
    });
  }

  if (!(await authUser(event))) {
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

  const filter: Filter<IBodyAddLaboratory> = {
    $or: [{ _id: new ObjectId(id) }, { code: { $regex: code, $options: 'i' } }],
    deleted: { $eq: false },
  };

  const projection: FindOptions<IBodyAddLaboratory>['projection'] = {
    deleted: 0,
  };

  const lab = await coll!.findOne<IBodyAddLaboratory>(
    filter as Filter<Document>,
    { projection }
  );

  client?.close();

  if (!lab) {
    setResponseStatus(event, 404);
    return { message: 'Laboratory not found' };
  }

  setResponseStatus(event, 200);
  return lab;
});
