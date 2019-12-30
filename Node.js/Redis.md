# Redis

### Reference Resources (參考資源)

* https://github.com/NodeRedis/node_redis

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### Table of Contents (目錄)

***

Types: String (字串), List (列表), Set (無序集合), Hash, ZSet (有序集合)

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

Storing Strings (儲存字串)

```js
client.set('thing', 'foo');
// or
client.set(['thing', 'foo']);

client.get('thing', (err, reply) => {
  console.log(reply);  // foo
});

// this key will expire after 10 seconds (此密鑰將在 10 秒後過期)
client.set('<KEY>', '<VALUE>', 'EX', 10);
/**
 * options:
 *   EX - Set the specified expire time, in seconds.
 *   PX - Set the specified expire time, in milliseconds.
 *   NX - Only set the key if it does not already exist. (只有在密鑰不存在的情況下才能設置)
 *   XX - Only set the key if it already exist. (只有在已經存在的情況下才能設置密鑰)
 */
```

Storing Hash (儲存雜湊)

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

Storing Lists (儲存列表)

```js
client.rpush(
  ['thing', 'foo', 'bar'],
  (err, reply) => {
    console.log(reply);  // 2
  }
);

client.lrange('thing', 0, -1, (err, reply) => {
  console.log(reply);  // ['foo', 'bar']
});
```
