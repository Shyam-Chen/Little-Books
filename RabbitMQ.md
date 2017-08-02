# Socket

### 練習來源

* https://github.com/squaremo/amqp.node

### 實作執行

* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄

***

```js
import amqp from 'amqplib';

amqp.connect('amqp://gnnwevxx:V1PhfxZSO_-CJ6agZGipEBVmFX508N0P@black-boar.rmq.cloudamqp.com/gnnwevxx')
  .then(conn => {
    process.once('SIGINT', () => conn.close());

    return conn.createChannel().then(channel => {
      let ok = channel.assertQueue('hello', { durable: false });

      ok = ok.then(() => {
        return channel.consume('hello', msg => {
          console.log(" [x] Received '%s'", msg.content.toString());
        }, { noAck: true });
      });

      return ok.then(() => {
        console.log(' [*] Waiting for messages. To exit press CMD + C.');
      });
    });
  })
  .catch(console.warn);
```
