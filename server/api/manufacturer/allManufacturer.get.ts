import type { IQuery } from '@/types/api';

export default defineEventHandler(async (event) => {
  const findQuery = getQuery(event) as IQuery;

  const { coll, client, err } = await getCollection('test', 'manufacturers');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  let result = await coll!.find(findQuery).toArray();
  await client!.close();

  setResponseStatus(event, 200);
  return result;
});
