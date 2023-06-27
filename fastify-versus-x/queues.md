# Queues

## In-memory Work Queue

```sh
$ pnpm install fastq
```

```ts
import fastq from 'fastq';

const queue = fastq.promise(worker, 1);

async function worker(arg: number) {
  return arg * 2;
}

app.get('/', async (req, reply) => {
  await queue.push(42);
  return reply.send({ hello: 'world' });
});
```
