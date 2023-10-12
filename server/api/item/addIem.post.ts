import type { Body } from '@/types/api';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

export default defineEventHandler(async (event) => {
  const body = await readBody<any>(event);
  const data = body as Body;

  const valid = await validateItem(data);

  if (!valid) {
    setResponseStatus(event, 400);
    return { message: 'Invalid data' };
  }

  const { coll, client, err } = await getCollection('test', 'items');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  let result = await coll!.insertOne(data);

  client!.close();

  setResponseStatus(event, 200);
  return { message: 'Item added successfully' };
});
