export default defineCachedEventHandler(async (event) => {
  if (!(await authUser(event))) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { coll, client, err } = await getCollection('test', 'laboratories');

  if (err) {
    console.log('Error connecting to database');
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
    });
  }

  const labs = await coll!
    .find({ deleted: { $eq: false } }, { projection: { deleted: 0 } })
    .toArray();

  client?.close();

  setResponseStatus(event, 200);
  return labs;
});
