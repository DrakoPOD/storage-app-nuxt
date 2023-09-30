import { databaseNames } from '../utils/constantVars';

import type { IQuery } from '@/types/api';

//const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

export default defineEventHandler(async (event) => {
  //const client = new MongoClient(uri);
  const client = await connectMongo();

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

  const { database, collection } = databaseNames['manufacturer'];

  try {
    const mongoDB = await client.db(database);
    const coll = await mongoDB.collection(collection);
    let result = await coll.findOne(findQuery);

    return Promise.resolve(result);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  } finally {
    await client.close();
  }
});
