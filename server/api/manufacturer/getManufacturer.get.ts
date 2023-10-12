import type { IQuery } from '@/types/api';
import { set } from 'mongoose';

//const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as IQuery;

  let findQuery: object;

  //check if query is empty
  if (Object.keys(query).length === 0) {
    return Promise.reject('Invalid query');
  }

  // check if query has id
  if (query.id) {
    findQuery = { _id: query.id };
  } else {
    findQuery = query;
  }

  const { coll, client, err } = await getCollection('test', 'manufacturers');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  let result = await coll!.findOne(findQuery);
  await client!.close();

  setResponseStatus(event, 200);
  return result;
});
