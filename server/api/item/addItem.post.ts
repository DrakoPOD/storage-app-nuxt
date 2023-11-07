import type { INewItem } from '@/types/item';
import moment from 'moment';
import { type } from 'os';

export default defineEventHandler(async (event) => {
  const body = await readBody<INewItem>(event);

  const { valid, errors } = await validateNewItem(body);

  if (!valid) {
    setResponseStatus(event, 400);
    console.log(body);
    return { message: 'Invalid data' };
  }

  if (typeof body.acquisitionDate === 'string') {
    body.acquisitionDate = moment(body.acquisitionDate, 'YYYY-MM-DD').toDate();
  }

  const { coll, client, err } = await getCollection('test', 'items');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  let result = await coll!.insertOne(body);

  client!.close();

  setResponseStatus(event, 200);
  return { message: 'Item added successfully' };
});
