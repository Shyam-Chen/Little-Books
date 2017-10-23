# Redis

### Reference Resources (參考資源)

* https://github.com/NodeRedis/node_redis

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### Table of Contents (目錄)

***

```js
import redis from 'redis';

app.set('redis-port', process.env.REDIS_PORT || 6379);
app.set('redis-host', process.env.REDIS_HOST || '127.0.0.1');

const client = redis.createClient(
  app.get('redis-port'),
  app.get('redis-host')
);

client.on('connect', () => console.log('Connected'));
client.on('error', err => console.error(err));
```

```js
client.set('thing', 'foo');

client.get('thing', (err, reply) => {
  console.log(reply);
});
```

Storing Hash (存儲雜湊)

```js
client.hmset('thing', 'foo', 'js', 'bar', 'html', 'baz', 'css');

client.hgetall('thing', (err, object) => {
  console.log(object);
});

// object syntax (物件語法)
client.hmset('thing', {
  foo: 'js',
  bar: 'html',
  baz: 'css'
});
```
