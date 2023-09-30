import { Collection, MongoClient } from 'mongodb';

import { databaseNames } from './constantVars';
import { log } from '@/utils/utils';
// const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';

let uri = '';

try {
  if (process.env.CONN === 'local') {
    uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/';
  } else {
    uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@atlascluster.mliprfz.mongodb.net/`;
  }
} catch (err) {
  console.log(err);
  uri = 'mongodb://127.0.0.1:27017/';
}

export const connectMongo = async () => {
  return new Promise<MongoClient>(async (resolve, reject) => {
    try {
      const client = await MongoClient.connect(uri);
      resolve(client);
    } catch (error) {
      log('ERROR', 'server/utils/database.ts', error);
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
