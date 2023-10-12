import type { Body } from '@/types/api';

export default defineEventHandler(async (event) => {
  const data = await readBody<any>(event);

  const valid = await validateManufacturer(data);

  if (!valid) {
    setResponseStatus(event, 400);
    return { message: 'Invalid data' };
  }

  const { coll, client, err } = await getCollection('test', 'manufacturers');

  let result = await coll!.insertOne(data);
  await client!.close();

  setResponseStatus(event, 200);
  return { message: 'Manufacturer added successfully' };
});
