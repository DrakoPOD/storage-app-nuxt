import { Collection, MongoClient } from 'mongodb';

import { databaseNames } from './constantVars';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

export const connectMongo = async () => {
  return new Promise<MongoClient>((resolve, reject) => {
    try {
      const client = new MongoClient(uri);
      resolve(client);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCollection = async (
  database: string,
  collection: string
): Promise<{ coll: Collection; client: MongoClient; err?: Error }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await connectMongo();

      const mongoDB = await client.db(database);
      const coll = await mongoDB.collection(collection);

      resolve({ coll, client });
    } catch (error) {
      reject({ err: error });
    }
  });
};
