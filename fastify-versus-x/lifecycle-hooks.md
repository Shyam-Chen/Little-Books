# Lifecycle Hooks

```ts
app.addHook('onRequest', async (request, reply) => {
  await asyncMethod();
});

app.addHook('preParsing', async (request, reply, payload) => {
  await asyncMethod();
  return newPayload;
});

app.addHook('preValidation', async (request, reply) => {
  const importantKey = await generateRandomString();
  request.body = { ...request.body, importantKey };
});

app.addHook('preHandler', async (request, reply) => {
  await asyncMethod();
});

app.get('/foo', async (request, reply) => {
  return reply.send('foo');
});

app.get('/bar', async (request, reply) => {
  return reply.send('bar');
});
```
