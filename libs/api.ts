async function getItems(
  database: string,
  collection: string,
  query: object
): Promise<any> {
  let result: any;
  try {
    result = await fetch('localhost:3000', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        database,
        collection,
        query,
      }),
    });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }

  return Promise.resolve(result);
}
