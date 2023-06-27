# Task Scheduling

## Installation

```sh
$ pnpm install @fastify/schedule toad-scheduler
```

```ts
import { fastifySchedulePlugin as schedule } from '@fastify/schedule';

app.register(schedule);
```

```ts
import { SimpleIntervalJob, AsyncTask } from 'toad-scheduler';

const task = new AsyncTask(
  'simple task',
  () => {
    return db.pollForSomeData().then((result) => {
      /* continue the promise chain */
    });
  },
  (err) => {
    /* handle errors here */
  },
);
const job = new SimpleIntervalJob({ seconds: 20 }, task);

app.scheduler.addSimpleIntervalJob(job);
```
