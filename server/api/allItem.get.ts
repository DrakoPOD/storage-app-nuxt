import { set } from 'mongoose';
import { databaseNames } from '../utils/constantVars';

import type { IQuery } from '@/types/api';

//const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

// TODO edit old api files to new API

export default defineEventHandler(async (event) => {
  //const client = new MongoClient(uri);
  const client = await connectMongo();

  const findQuery = getQuery(event) as IQuery;

  const { database, collection } = databaseNames['item'];

  try {
    const mongoDB = await client.db(database);
    const coll = await mongoDB.collection(collection);

    let result = await coll.find(findQuery).toArray();
    setResponseStatus(event, 200);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await client.close();
  }
});
