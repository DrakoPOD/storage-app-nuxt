import { IBodyAddLaboratory } from '@/types/laboratory';
import { ObjectId } from 'mongodb';
import { Role } from '@/types/user.d';

export default defineEventHandler(async (event) => {
  const body = await readBody<IBodyAddLaboratory>(event);

  const user = event.context.user;

  if (await authUser(event, [Role.ADMIN])) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { validBody } = await validateBodyLaboratory(body);

  if (!validBody) {
    setResponseStatus(event, 400);
    return { message: 'Invalid data' };
  }

  const { coll, client, err } = await getCollection('test', 'laboratories');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  body.qtyItems = undefined;
  body.deleted = false;
  body.inserted_user_id = new ObjectId(user.id);

  let result = await coll!.insertOne(body);

  client!.close();

  setResponseStatus(event, 200);
  return { message: 'Laboratory added successfully' };
});
