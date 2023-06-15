import { MongoClient } from 'mongodb';
import { databaseNames } from '../utils/constantVars';

import type { IQuery } from '@/types/api';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

export default defineEventHandler(async (event) => {
  const client = new MongoClient(uri);
  const findQuery = getQuery(event) as IQuery;

  const { database, collection } = databaseNames['item'];

  try {
    const mongoDB = await client.db(database);
    const coll = await mongoDB.collection(collection);

    let result = await coll.find(findQuery).toArray();

    return Promise.resolve(result);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  } finally {
    await client.close();
  }
});
