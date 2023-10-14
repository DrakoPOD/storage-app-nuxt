export default defineEventHandler(async (event) => {
  const body = await readBody<any>(event);

  const user = event.context.user;

  if (user.role !== 0) {
    setResponseStatus(event, 401);
    return { message: 'Unauthorized' };
  }

  const { validBody } = await validateBodyLaboratory(body);

  if (!validBody) {
    setResponseStatus(event, 400);
    return { message: 'Invalid data' };
  }

  body.qtyItems = null;

  const { coll, client, err } = await getCollection('test', 'laboratories');

  if (err) {
    setResponseStatus(event, 500);
    return { message: 'Something went wrong' };
  }

  let result = await coll!.insertOne(body);

  client!.close();

  setResponseStatus(event, 200);
  return { message: 'Laboratory added successfully' };
});
