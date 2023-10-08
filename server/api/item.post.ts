import { databaseNames } from '../utils/constantVars';
import { connectMongo } from '../utils/database';

import type { Body } from '@/types/api';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

export default defineEventHandler(async (event) => {
  const body = await readBody<any>(event);
  const client = await connectMongo();

  const data = body.data;
  const { database, collection } = databaseNames['item'];

  try {
    const mongoDB = await client.db(database);
    const coll = await mongoDB.collection(collection);
    let result = await coll.insertOne(data);

    return Promise.resolve(result);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  } finally {
    await client.close();
  }
});
