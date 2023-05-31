import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

export default defineEventHandler(async (event) => {
  const client = new MongoClient(uri);
  const query = getQuery(event);

  const [database, collection, findQuery] = [
    query.database,
    query.collection,
    JSON.parse(query.query as string),
  ] as [string, string, object];

  try {
    const db = await client.db(database);
    const coll = await db.collection(collection);
    let result = await coll.findOne(findQuery);

    return Promise.resolve(result);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  } finally {
    await client.close();
  }
});
