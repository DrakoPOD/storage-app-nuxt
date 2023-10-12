import { Collection, MongoClient, ObjectId } from 'mongodb';

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

export const customID = ObjectId;

export const connectMongo = async () => {
  return new Promise<{ client?: MongoClient; error?: any }>(
    async (resolve, reject) => {
      try {
        const client = await MongoClient.connect(uri);
        resolve({ client });
      } catch (error) {
        console.log(
          'ERROR, server/utils/database.ts -- Connecting to database'
        );
        resolve({ error });
      }
    }
  );
};

type IGetCollection =
  | {
      coll: Collection;
      client: MongoClient;
      err?: never;
    }
  | {
      err: Error | unknown;
      coll?: never;
      client?: never;
    };

export const getCollection = async (
  database: string,
  collection: string
): Promise<IGetCollection> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { client, error } = await connectMongo();

      if (error) {
        console.log('Error in getCollection');
        resolve({ err: error });
      }
      if (client) {
        const mongoDB = await client.db(database);
        const coll = await mongoDB.collection(collection);

        resolve({ coll, client });
      }
    } catch (error) {
      console.log('Error in getCollection');
      resolve({ err: error });
    }
  });
};
