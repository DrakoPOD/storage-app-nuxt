import { MongoClient } from 'mongodb';
import { databaseNames } from '../utils/constantVars';

// TODO: edit this type
import type { Body } from '@/types/api';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

export default defineEventHandler(async (event) => {
  const data = await readBody<any>(event);
  const client = new MongoClient(uri);

  const { database, collection } = databaseNames['manufacturer'];

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
