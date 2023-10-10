import { set } from 'mongoose';
import { databaseNames } from '../../utils/constantVars';

import type { IQuery } from '@/types/api';

//const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

// TODO edit old api files to new API

export default defineEventHandler(async (event) => {
  const findQuery = getQuery(event) as IQuery;

  const { coll, client, err } = await getCollection('test', 'items');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  let result = await coll!.find(findQuery).toArray();
  client!.close();

  setResponseStatus(event, 200);
  return result;
});
