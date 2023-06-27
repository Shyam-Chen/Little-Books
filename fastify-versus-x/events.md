# Events

```sh
$ pnpm install mqemitter
```

```ts
import mqemitter from 'mqemitter';

const emitter = mqemitter({ matchEmptyLevels: true });

emitter.on('hello/+/world', function (message, cb) {
  // will capture { topic: 'hello/my/world', 'something': 'more' }
  // and capture { topic: 'hello//world', 'something': 'more' }
  console.log(message);
  cb();
});

emitter.on('hello/+', function (message, cb) {
  // will not be called
  console.log(message);
  cb();
});

emitter.emit({ topic: 'hello/my/world', something: 'more' });
emitter.emit({ topic: 'hello//world', something: 'more' });
```
