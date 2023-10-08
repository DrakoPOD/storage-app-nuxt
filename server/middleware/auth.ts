export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  const { payload, error } = checkToken(cookies.token);
  const valid = await checkBlacklist(cookies.token);

  if (error || !valid) {
    event.context.error = {
      msg: error || 'Invalid token',
    };
  } else {
    event.context.user = payload;
    event.context.token = cookies.token;
    //console.log(payload);
  }
});
