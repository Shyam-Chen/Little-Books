# ReactiveX

### 練習來源
* https://github.com/ReactiveX/rxjs
* https://github.com/btroncone/learn-rxjs
* https://github.com/miguelmota/rxjs-examples

### 實作執行
* https://github.com/Shyam-Chen/Frontend-Starter-Kit
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄
* [Observable](#observable)
  * -> [Subject](#subject)
    * -> [AsyncSubject](#asyncsubject)
    * -> [BehaviorSubject](#behaviorsubject)
    * -> [ReplaySubject](#replaysubject)
* [Scheduler](#scheduler)
  * [animationFrame](#animationframe)
  * [asap](#asap)
  * [async](#async)
  * [queue](#queue)
* [Combination (組合)](#組合)
  * [combineAll](#combineall)
  * [combineLatest](#combinelatest) :star:
  * [concat](#concat) :star:
  * [concatAll](#concatall)
  * [forkJoin](#forkjoin)
  * [merge](#merge) :star:
  * [mergeAll](#mergeall)
  * [race](#race)
  * [startWith](#startwith) :star:
  * [withLatestFrom](#withlatestfrom) :star:
  * [zip](#zip)
* [Conditional (附條件)](#附條件)
  * [defaultIfEmpty](#defaultifempty)
  * [every](#every)
* [Creation (建立)](#建立)
  * [bindCallback](#bindcallback)
  * [bindNodeCallback](#bindnodecallback)
  * [create](#create)
  * [defer](#defer)
  * [empty](#empty)
  * [from](#from) :star:
  * [fromEvent](#fromevent)
  * [fromEventPattern](#fromeventpattern)
  * [fromPromise](#frompromise) :star:
  * [interval](#interval)
  * [never](#never)
  * [of](#of) :star:
  * [range](#range)
  * [throw](#throw)
  * [timer](#timer)
* [Error Handling (錯誤處理)](#錯誤處理)
  * [catch](#catch) :star:
  * retry
  * retryWhen
* [Filtering (過濾)](#過濾)
  * [debounce](#debounce)
  * debounceTime :star:
  * distinctUntilChanged :star:
  * [filter](#filter) :star:
  * [first](#first)
  * [ignoreElements](#ignoreelements)
  * [last](#last)
  * [sample](#sample)
  * [single](#single)
  * skip
  * skipUntil
  * skipWhile
  * [take](#take) :star:
  * takeUntil :star:
  * takeWhile
  * throttle
  * throttleTime
* [Multicasting (組播)](#組播)
  * multicast
  * publish
  * [share](#share) :star:
* [Transformation (轉化)](#轉化)
  * [buffer](#buffer)
  * [bufferCount](#buffercount)
  * [bufferTime](#buffertime) :star:
  * bufferToggle
  * bufferWhen
  * concatMap :star:
  * concatMapTo
  * expand
  * groupBy
  * [map](#map) :star:
  * [mapTo](#mapto)
  * [mergeMap](#mergemap) :star:
  * partition
  * pluck
  * scan :star:
  * switchMap :star:
  * window
  * windowCount
  * windowTime
  * windowToggle
  * windowWhen
* [Utility (公用)](#公用)
  * [do](#do) :star:
  * [delay](#delay)
  * delayWhen
  * dematerialize
  * let
  * materialize
  * observeOn
  * toPromise

:star: - 常用

***

## Observable

```js
import { Observable } from 'rxjs/Observable';

// 一個 Observer (觀察者)
new Observable(observer => {
    // 回呼方法: next()、error() 和 complete()
    setTimeout(() => observer.next('foo'), 0);
    setTimeout(() => observer.next('bar'), 1000);
    setTimeout(() => observer.next('baz'), 2000);
    setTimeout(() => observer.complete(), 3000);
  })
  .subscribe(  // 訂閱一個或多個 Observable (可觀察的物件)
    value => console.log(value),
    error => console.error(error),
    () => console.log('done')
  );
  // foo
  // bar
  // baz
  // done
```

### Subject

```js
import { Subject } from 'rxjs/Subject';

const subject = new Subject();

subject.subscribe(
  value => console.log(value),
  error => console.error(error),
  () => console.log('done')
);

subject.next('foo');
subject.next('bar');
subject.next('baz');
subject.complete();
// foo
// bar
// baz
// done
```

#### AsyncSubject

```js
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { from } from 'rxjs/observable/from';

import { delay } from 'rxjs/operator/delay';

const from$ = Observable::from([1, 2, 3])::delay(1000);
const subject = new AsyncSubject();

from$.subscribe(subject);

subject.subscribe(
  value => console.log(value),
  error => console.error(error),
  () => console.log('done')
);
// 3
// done
```

#### BehaviorSubject

```js
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const subject = new BehaviorSubject('foo');

subject.subscribe(
  value => console.log(value),
  error => console.error(error),
  () => console.log('done')
);

subject.next('bar');
subject.complete();
// foo
// bar
// done
```

#### ReplaySubject

可以是可觀察的序列，也可以是觀察者的物件。

每個通知被推播給所有訂閱和未來的觀察者，並尊從緩衝區修整的策略。

```js
import { ReplaySubject } from 'rxjs/ReplaySubject';

const subject = new ReplaySubject(2);  // 緩衝區域大小為 2

subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe(
  value => console.log(value),
  error => console.error(error),
  () => console.log('done')
);

subject.next(2);
subject.next(1);
subject.next(0);
subject.complete();
// 2
// 3
// 2
// 1
// 0
// done
```

## Scheduler

```js
import { Scheduler } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { observeOn } from 'rxjs/operator/observeOn';

const observable$ = new Observable(observer => /* ... */);

console.log('before subscribe');

observable$::observeOn(Scheduler.<animationFrame|asap|async|queue>)
  .subscribe(
    value => console.log(value),
    error => console.error(error),
    () => console.log('done')
  );

console.log('after subscribe');
```

### animationFrame

即 `requestAnimationFrame` 的進階版

```js
import { Scheduler } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { observeOn } from 'rxjs/operator/observeOn';

const observable$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

console.log('before subscribe');

observable$::observeOn(Scheduler.animationFrame)
  .subscribe(
    value => console.log(value),
    error => console.error(error),
    () => console.log('done')
  );

console.log('after subscribe');
// before subscribe
// after subscribe
// 1
// 2
// 3
// done
```

### asap

跟 `async` 相似，但會比 `async` 先出現

```js
import { Scheduler } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { observeOn } from 'rxjs/operator/observeOn';

const observable$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

console.log('before subscribe');

observable$::observeOn(Scheduler.asap)
  .subscribe(
    value => console.log(value),
    error => console.error(error),
    () => console.log('done')
  );

console.log('after subscribe');
// before subscribe
// after subscribe
// 1
// 2
// 3
// done
```

```js
import { Scheduler } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { range } from 'rxjs/observable/range';

import { observeOn } from 'rxjs/operator/observeOn';
import { _do } from 'rxjs/operator/do';

const timeStart = Date.now();
const range$ = Observable::range(1, 5)
  ::_do(value => console.log(`processing value ${value}`))
  ::observeOn(Scheduler.asap)

console.log('before subscribe');

range$.subscribe(
  value => console.log(`next ${value}`),
  error => console.error(error),
  () => console.log(`Total time: ${Date.now() - timeStart}ms`)
);

console.log(`after subscribe`);
// before subscribe
// processing value 1
// processing value 2
// processing value 3
// processing value 4
// processing value 5
// after subscribe
// next 1
// next 2
// next 3
// next 4
// next 5
// Total time: 92ms
```

### async

比 `asap` 還晚出現

```js
import { Scheduler } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { observeOn } from 'rxjs/operator/observeOn';

const observable$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

console.log('before subscribe');

observable$::observeOn(Scheduler.async)
  .subscribe(
    value => console.log(value),
    error => console.error(error),
    () => console.log('done')
  );

console.log('after subscribe');
// before subscribe
// after subscribe
// 1
// 2
// 3
// done
```

```js
import { Scheduler } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { range } from 'rxjs/observable/range';

import { observeOn } from 'rxjs/operator/observeOn';
import { _do } from 'rxjs/operator/do';

const timeStart = Date.now();
const range$ = Observable::range(1, 5)
  ::_do(value => console.log(`processing value ${value}`))
  ::observeOn(Scheduler.async)

console.log('before subscribe');

range$.subscribe(
  value => console.log(`next ${value}`),
  error => console.error(error),
  () => console.log(`Total time: ${Date.now() - timeStart}ms`)
);

console.log(`after subscribe`);
// before subscribe
// processing value 1
// processing value 2
// processing value 3
// processing value 4
// processing value 5
// after subscribe
// next 1
// next 2
// next 3
// next 4
// next 5
// Total time: 88ms
```

### queue

```js
import { Scheduler } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { observeOn } from 'rxjs/operator/observeOn';

const observable$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});

console.log('before subscribe');

observable$::observeOn(Scheduler.queue)
  .subscribe(
    value => console.log(value),
    error => console.error(error),
    () => console.log('done')
  );

console.log('after subscribe');
// before subscribe
// 1
// 2
// 3
// done
// after subscribe
```

```js
import { Scheduler } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { range } from 'rxjs/observable/range';

import { observeOn } from 'rxjs/operator/observeOn';
import { _do } from 'rxjs/operator/do';

const timeStart = Date.now();
const range$ = Observable::range(1, 5)
  ::_do(value => console.log(`processing value ${value}`))
  ::observeOn(Scheduler.queue)

console.log('before subscribe');

range$.subscribe(
  value => console.log(`next ${value}`),
  error => console.error(error),
  () => console.log(`Total time: ${Date.now() - timeStart}ms`)
);

console.log('after subscribe');
// before subscribe
// processing value 1
// next 1
// processing value 2
// next 2
// processing value 3
// next 3
// processing value 4
// next 4
// processing value 5
// next 5
// Total time: 7ms
// after subscribe
```

## 組合

### combineAll

當外部的觀察者完成時，輸出內部觀者的最新值。

```js
import { Observable } from 'rxjs/Observable';

import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';

import { mapTo } from 'rxjs/operator/mapTo';
import { combineAll } from 'rxjs/operator/combineAll';

const timer$ = Observable::timer(2000);

timer$::mapTo(
    Observable::of('Hello', 'World')
  )
  ::combineAll()
  .subscribe(value => console.log(value));
  // ["Hello"]
  // ["World"]

timer$::mapTo(
    Observable::of('Hello', 'Goodbye')
  )
  ::combineAll(value => `${value} Friend!`)
  .subscribe(value => console.log(value));
  // Hello Friend!
  // Goodbye Friend!
```

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

import { take } from 'rxjs/operator/take';
import { map } from 'rxjs/operator/map';
import { combineAll } from 'rxjs/operator/combineAll';

Observable::interval(1000)
  ::take(3)
  ::map(value => Observable::interval(value + 500)::take(2))
  ::combineAll()
  .subscribe(value => console.log(value));
  // [0, 0, 0]
  // [1, 0, 0]
  // [1, 1, 0]
  // [1, 1, 1]
```

### combineLatest

當任何的觀察者發射一個值時，從每個值發射出最新的值。

```js
import { Observable } from 'rxjs/Observable';

import { timer } from 'rxjs/observable/timer';
import { combineLatest } from 'rxjs/observable/combineLatest';

const timerOne$ = Observable::timer(1000, 4000);
const timerTwo$ = Observable::timer(2000, 4000);
const timerThree$ = Observable::timer(3000, 4000);

Observable::combineLatest(timerOne$, timerTwo$, timerThree$)
  .subscribe((values) => {
    const [valueOne, valueTwo, valueThree] = values;
    console.log(`${valueOne}, ${valueTwo}, ${valueThree}`);
  });
  // 0, 0, 0
  // 1, 0, 0
  // 1, 1, 0
  // 1, 1, 1
  // 2, 1, 1
  // 2, 2, 1
  // 2, 2, 2
  // ...
```

使用函式投射

```js
import { Observable } from 'rxjs/Observable';

import { timer } from 'rxjs/observable/timer';
import { combineLatest } from 'rxjs/observable/combineLatest';

const timerOne$ = Observable::timer(1000, 4000);
const timerTwo$ = Observable::timer(2000, 4000);
const timerThree$ = Observable::timer(3000, 4000);

Observable::combineLatest(
    timerOne$, timerTwo$, timerThree$,
    (valueOne, valueTwo, valueThree) => `${valueOne}, ${valueTwo}, ${valueThree}`
  )
  .subscribe(values => console.log(values));
  // 0, 0, 0
  // 1, 0, 0
  // 1, 1, 0
  // 1, 1, 1
  // 2, 1, 1
  // 2, 2, 1
  // 2, 2, 2
  // ...
```

```js
import { Observable } from 'rxjs/Observable';

import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';

import { combineLatest } from 'rxjs/operator/combineLatest';

const timerOne$ = Observable::timer(1000, 4000);
const timerTwo$ = Observable::timer(2000, 4000);
const timerThree$ = Observable::timer(3000, 4000);

Observable::interval(1000)
  ::combineLatest(timerOne$, timerTwo$, timerThree$)
  .subscribe((values) => {
    const [valueOne, valueTwo, valueThree] = values;
    console.log(`${valueOne}, ${valueTwo}, ${valueThree}`);
  });
  // 2, 0, 0
  // 3, 0, 0
  // 4, 0, 0
  // 4, 1, 0
  // 5, 1, 0
  // 5, 1, 1
  // 6, 1, 1
  // 6, 1, 1
  // 7, 1, 1
  // 8, 1, 1
  // 8, 2, 1
  // 9, 2, 1
  // 9, 2, 2
  // ...
```

### concat

Creates an output Observable which sequentially emits all values from every given input Observable after the current Observable.

建立一個輸出 Observable，它從當前 Observable 後的每個給定輸入 Observable 中順序發出所有值。

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';

Observable::concat(
    Observable::of(1, 2, 3),
    Observable::of(4, 5, 6)
  )
  .subscribe(value => console.log(value));
  // 1
  // 2
  // 3
  // 4
  // 5
  // 6
```

```js
import { Observable } from 'rxjs/Observable';

import { concat } from 'rxjs/observable/concat';
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';

Observable::concat(
    Observable::interval(1000),
    Observable::of('This', 'Never', 'Runs')  // 這個不會被執行
  )
  .subscribe(value => console.log(value));
  // 每秒打印
  // 0
  // 1
  // 2
  // 3
  // ...
```

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { concat } from 'rxjs/operator/concat';

Observable::of(1, 2, 3)
  ::concat(Observable::of(4, 5, 6))
  .subscribe(value => console.log(value));
  // 1
  // 2
  // 3
  // 4
  // 5
  // 6
```

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { delay } from 'rxjs/operator/delay';
import { concat } from 'rxjs/operator/concat';

Observable::of(1, 2, 3)
  ::delay(2000)
  ::concat(Observable::of(4, 5, 6))
  .subscribe(value => console.log(value));
  // 延遲兩秒
  // 1
  // 2
  // 3
  // 4
  // 5
  // 6
```

### concatAll

Converts a higher-order Observable into a first-order Observable by concatenating the inner Observables in order.

通過按順序連接內部 Observable，將高階 Observable 轉換為一階 Observable。

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';

import { map } from 'rxjs/operator/map';
import { concatAll } from 'rxjs/operator/concatAll';

Observable::interval(1000)
  ::map(value => Observable::of(value + 10))
  ::concatAll()
  .subscribe(value => console.log(value));
  // 每秒打印
  // 10
  // 11
  // 12
  // 13
  // ...
```

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

import { map } from 'rxjs/operator/map';
import { concatAll } from 'rxjs/operator/concatAll';

Observable::interval(1000)
  ::map(value => new Promise(resolve => resolve(value)))
  ::concatAll()
  .subscribe(value => console.log(value));
  // 每秒打印
  // 0
  // 1
  // 2
  // 3
  // ...
```

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import { take } from 'rxjs/operator/take';
import { concatAll } from 'rxjs/operator/concatAll';

Observable::of(
    Observable::interval(1000)::take(5),  // 0, 1, 2, 3, 4 (完成)
    Observable::interval(500)::take(2),  // 0, 1 (完成)
    Observable::interval(2000)::take(1)  // 0 (完成)
  )
  ::concatAll()
  .subscribe(value => console.log(value));
  // 0
  // 1
  // 2
  // 3
  // 4
  // 0
  // 1
  // 0
```

### forkJoin

```js
import { Observable } from 'rxjs/Observable';

import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import { delay } from 'rxjs/operator/delay';
import { take } from 'rxjs/operator/take';

const p = value => new Promise(resolve => setTimeout(() => resolve(`Resolved: ${value}`), 5000));

Observable::forkJoin(
    Observable::of('Hello'),
    Observable::of('World')::delay(1000),
    Observable::interval(1000)::take(1),
    Observable::interval(1000)::take(2),
    p('RESULT')
  )
  .subscribe(value => console.log(value));
  // 五秒後印出
  // [ "Hello", "World", 0, 1, "Resolved: RESULT" ]
```

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { mergeMap } from 'rxjs/operator/mergeMap';

const p = value => new Promise(resolve => setTimeout(() => resolve(`Resolved: ${value}`), 5000));

Observable::of([1, 2, 3, 4, 5])
  ::mergeMap(q => Observable::forkJoin(...q.map(p)))
  .subscribe(value => console.log(value));
  // 五秒後印出
  // [ "Resolved: 1", "Resolved: 2", "Resolved: 3", "Resolved: 4", "Resolved: 5" ]
```

### merge

Creates an output Observable which concurrently emits all values from every given input Observable.

建立一個輸出 Observable，它從每個給定的輸入 Observable 同時發射所有的值。

```js
import { Observable } from 'rxjs/Observable';

import { merge } from 'rxjs/observable/merge';
import { interval } from 'rxjs/observable/interval';

import { mapTo } from 'rxjs/operator/mapTo';

Observable::merge(
    Observable::interval(3000)::mapTo('FIRST'),
    Observable::interval(2000)::mapTo('SECOND'),
    Observable::interval(1000)::mapTo('THIRD')
  )
  .subscribe(value => console.log(value));
  // THIRD
  // SECOND
  // THIRD
  // FIRST
  // THIRD
  // SECOND
  // ...
```

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

import { merge } from 'rxjs/operator/merge';

Observable::interval(2000)
  ::merge(Observable::interval(1000))
  .subscribe(value => console.log(value));
  // 0
  // 0
  // 1
  // 2
  // 1
  // 3
  // ...
```

### mergeAll

Converts a higher-order Observable into a first-order Observable which concurrently delivers all values that are emitted on the inner Observables.

將高階 Observable 轉換為一階 Observable，它同時傳遞在內部 Observables 上發出的所有值。

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

import { take } from 'rxjs/operator/take';
import { map } from 'rxjs/operator/map';
import { delay } from 'rxjs/operator/delay';
import { mergeAll } from 'rxjs/operator/mergeAll';

const interval$ = Observable::interval(1000)::take(3);

interval$
	::map(() => interval$::delay(1000)::take(2))
  ::mergeAll(2)
  .subscribe(value => console.log(value));
  // 0
  // 1
  // 0
  // 1
  // 0
  // 1
```

### race

Returns an Observable that mirrors the first source Observable to emit an item from the combination of this Observable and supplied Observables.

```js
import { Observable } from 'rxjs/Observable';

import { timer } from 'rxjs/observable/timer';

import { race } from 'rxjs/operator/race';
import { mapTo } from 'rxjs/operator/mapTo';

Observable::timer(5000)
  ::race(
    Observable::timer(2000)::mapTo('foo'),
    Observable::timer(1000)::mapTo('bar'),
    Observable::timer(3000)::mapTo('baz')
  )
  .subscribe(value => console.log(value));
  // bar
```

### startWith

Returns an Observable that emits the items you specify as arguments before it begins to emit items emitted by the source Observable.

返回一個 Observable，在開始發射來自 Observable 射出的項目之前發射所指定為參數的項目。

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { startWith } from 'rxjs/operator/startWith';

Observable::of(1, 2, 3)
  ::startWith(0)
  .subscribe(value => console.log(value));
  // 0
  // 1
  // 2
  // 3
```

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { startWith } from 'rxjs/operator/startWith';
import { scan } from 'rxjs/operator/scan';

Observable::of('World!', 'Goodbye', 'World!')
  ::startWith('Hello')
  ::scan((acc, value) => `${acc} ${value}`)
  .subscribe(value => console.log(value));
  // Hello
  // Hello World!
  // Hello World! Goodbye
  // Hello World! Goodbye World!
```

### withLatestFrom

Combines the source Observable with other Observables to create an Observable whose values are calculated from the latest values of each, only when the source emits.

將源 Observable 與其他 Observables 組合，以建立一個 Observable，其值根據每個的最新值計算，只有當源發出時。

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { map } from 'rxjs/operator/map';

const first$ = Observable::interval(2000);
const second$ = Observable::interval(1000);

first$::withLatestFrom(second$)
  ::map(([first, second]) => `first$: ${first}, second$: ${second}`)
  .subscribe(value => console.log(value));
  // 兩秒後打印
  // first$: 0, second$: 0
  // first$: 1, second$: 2
  // first$: 2, second$: 4
  // ...
```

### zip

Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each of its input Observables.

組合多個 Observables 以建立一個 Observable，其值根據每個輸入 Observable 的順序計算。

```js
import { Observable } from 'rxjs/Observable';

import { zip } from 'rxjs/observable/zip';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operator/delay';

Observable::zip(
    Observable::of('Foo'),
    Observable::of('Bar')::delay(1000),
    Observable::of('Baz')::delay(2000)
  )
  .subscribe(value => console.log(value));
  // [ 'Foo', 'Bar', 'Baz' ]
```

## 附條件

### defaultIfEmpty

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { defaultIfEmpty } from 'rxjs/operator/defaultIfEmpty';

Observable::of()  // 空白
  ::defaultIfEmpty('Observable::of() Empty!')
  .subscribe(value => console.log(value));
  // Observable::of() Empty!
```

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { defaultIfEmpty } from 'rxjs/operator/defaultIfEmpty';

Observable::of(1, 2, 3)
  ::defaultIfEmpty('Observable::of() Empty!')
  .subscribe(value => console.log(value));
  // 1
  // 2
  // 3
```

### every

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { every } from 'rxjs/operator/every';

Observable::of(1, 2, 3, 4, 5)
  ::every(value => value % 2 === 0)  // 每個值都是偶數嗎？
  .subscribe(value => console.log(value));
  // false
```

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { every } from 'rxjs/operator/every';

Observable::of(2, 4, 6, 8, 10)
  ::every(value => value % 2 === 0)  // 每個值都是偶數嗎？
  .subscribe(value => console.log(value));
  // true
```

## 建立

### bindCallback

將回呼 API 轉換成返回 Observable 函式。

```js
import { Observable } from 'rxjs/Observable';

import { bindCallback } from 'rxjs/observable/bindCallback';

const bindCallback$ = Observable::bindCallback(
  (value, callback) => callback(`Hello ${value}`)
);

bindCallback$('World')
  .subscribe(value => console.log(value));
  // Hello World
```

### bindNodeCallback

將 Node.js 風格的回呼 API 轉換成返回 Observable 函式。

```js
import { readdir } from 'fs';

import { Observable } from 'rxjs/Observable';

import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';

const bindNodeCallback$ = Observable::bindNodeCallback(readdir);

bindNodeCallback$(process.cwd())
  .subscribe(value => console.log(value));
  // $ ls -a
```

### create

Creates a new Observable that will execute the specified function when a Subscriber subscribes to it.

建立一個新的 Observable，當 Subscriber 訂閱時，它將執行指定的函式。

```js
import * as Rx from 'rxjs/Rx';

Rx.Observable.create(observer => {
    observer.next('Hello');
    observer.next('World');
  })
  .subscribe(value => console.log(value));
  // Hello
  // World
```

### defer

Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.

建立一個 Observable，在 subscribe 上，調用一個 Observable 工廠為每個新的 Observer 做一個 Observable。

```js
import { Observable } from 'rxjs/Observable';

import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

Observable::defer(() => Observable::of(1, 2, 3))
  .subscribe(value => console.log(value + 1));
  // 2
  // 3
  // 4
```

### empty

Creates an Observable that emits no items to the Observer and immediately emits a complete notification.

建立一個不向 Observer 發送項的 Observable，並立即發出一個完整的通知。

```js
import { Observable } from 'rxjs/Observable';

import { empty } from 'rxjs/observable/empty';

Observable::empty()  // 直接完成
  .subscribe(
    result => console.log(result, 'Next...'),
    error => console.error(error),
    () => console.log('Complete!')
  );
  // Complete!
```

### from

Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.

從陣列，像陣列的物件，Promise，可迭代物件或像 Observable 的物件建立一個 Observable。

```js
import { Map } from 'immutable';

import { Observable } from 'rxjs/Observable';

import { from } from 'rxjs/observable/from';

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set('b', 4);

Observable::from(map2)
  .subscribe(value => console.log(value));
  // ["a", 1]
  // ["b", 4]
  // ["c", 3]
```

### fromEvent

Creates an Observable that emits events of a specific type coming from the given event target.

建立一個 Observable，發出來自給定事件目標的特定類型的事件。

```js
import { Observable } from 'rxjs/Observable';

import { fromEvent } from 'rxjs/observable/fromEvent';

Observable::fromEvent(document, 'click')  // 點擊頁面
  .subscribe(value => console.log(value.pageX, value.pageY));
  // 打印出點擊的座標
```

### fromEventPattern

Creates an Observable from an API based on addHandler/removeHandler functions.

基於 addHandler/removeHandler 函式從 API 建立一個 Observable。

```js
import { Observable } from 'rxjs/Observable';

import { fromEvent } from 'rxjs/observable/fromEvent';

const addClickHandler = handler => document.addEventListener('click', handler);
const removeClickHandler = handler => document.removeEventListener('click', handler);

Observable::fromEventPattern(
    addClickHandler,
    removeClickHandler
  )
  .subscribe(value => console.log(value.screenX, value.screenY));
  // xxx, xxx
```

### fromPromise

將 Promise 轉化為 Observable。

```js
import { Observable } from 'rxjs/Observable';

import { fromPromise } from 'rxjs/observable/fromPromise';

const promise = new Promise(resolve => resolve('Hello World'));

Observable::fromPromise(promise)
  .subscribe(value => console.log(value));
  // Hello World
```

### interval

Creates an Observable that emits sequential numbers every specified interval of time, on a specified IScheduler.

建立一個 Observable，它在指定的 IScheduler 上每隔指定的時間間隔發出序列號。

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

Observable::interval(1000)
  .subscribe(value => console.log(value));
  // 0
  // 1
  // 2
  // 3
  // ...
```

### never

Creates an Observable that emits no items to the Observer.

建立一個不向 Observer 發射任何項目的 Observable。

```js
import { Observable } from 'rxjs/Observable';

import { never } from 'rxjs/observable/never';

import { startWith } from 'rxjs/operator/startWith';

const info = () => console.log('這不會被呼叫');

Observable::never()
  ::startWith(11)
  .subscribe(value => console.log(value), info, info);
  // 11
```

### of

為觀察者發射給予指定的參數做為一個值，然後再一個接著一個，最後再一次發射出去。

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

Observable::of(1, 2, 3)
  .subscribe(value => console.log(value));
  // 1
  // 2
  // 3
```

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

Observable::of(
    { a: 'A' },
    [2, 'b'],
    () => 'C'
  )
  .subscribe(value => console.log(value));
  // {a: "A"}
  // [2, "b"]
  // function () {
  //   return 'C';
  // }
```

### range

Creates an Observable that emits a sequence of numbers within a specified range.

建立一個 Observable，它發射指定範圍內的一系列數字。

```js
import { Observable } from 'rxjs/Observable';

import { range } from 'rxjs/observable/range';

Observable:range(1, 5)
  .subscribe(value => console.log(value));
  // 1
  // 2
  // 3
  // 4
  // 5
```

### throw

Creates an Observable that emits no items to the Observer and immediately emits an error notification.

建立一個 Observable，它不向 Observer 發送任何項目，並立即發出錯誤通知。

```js
import { Observable } from 'rxjs/Observable';

import { _throw } from 'rxjs/observable/throw';

Observable::_throw('This is an error!')
  .subscribe(
    value => console.log(value),
    error => console.error(error),
    () => console.log('done')
  );
  // This is an error!
```

### timer

Creates an Observable that starts emitting after an `initialDelay` and emits ever increasing numbers after each `period` of time thereafter.

```js
import { Observable } from 'rxjs/Observable';

import { timer } from 'rxjs/observable/timer';

Observable::timer(1000)
  .subscribe(value => console.log(value));
  // 0
```

```js
import { Observable } from 'rxjs/Observable';

import { timer } from 'rxjs/observable/timer';

Observable::timer(1000, 2000)
  .subscribe(value => console.log(value));
  // 一秒後打印
  // 0
  // 再來都是兩秒後打印
  // 1
  // 2
```

## 錯誤處理

### catch

```js
import { Observable } from 'rxjs/Observable';

import { _throw } from 'rxjs/observable/throw';
import { of } from 'rxjs/observable/of';

import { _catch } from 'rxjs/operator/catch';

Observable::_throw('一個錯誤！')
  ::_catch(value => Observable::of(`錯誤訊息: ${value}`))
  .subscribe(value => console.log(value));
  // 錯誤訊息: 一個錯誤！
```

### retry

### retryWhen

## 過濾

### debounce

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';

import { debounce } from 'rxjs/operator/debounce';

Observable::of(1, 2, 3)
  ::debounce(() => Observable::timer(1000))
  .subscribe(value => console.log(value));
  // 3
```

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';
import { timer } from 'rxjs/observable/timer';

import { debounce } from 'rxjs/operator/debounce';

Observable::interval(1000)
  ::debounce(value => Observable::timer(value * 200))
  .subscribe(value => console.log(value));
  // 0
  // 1
  // 2
  // 3
  // 4
```

### debounceTime

### distinctUntilChanged

### filter

過濾給予的條件值，再將值發射出去。

```js
import { Observable } from 'rxjs/Observable';

import { from } from 'rxjs/observable/from';

import { filter } from 'rxjs/operator/filter';

Observable::from([1, 2, 3, 4, 5])
  ::filter(num => num % 2 === 0)  // 過濾掉非偶數的數值
  .subscribe(value => console.log(value));
  // 2
  // 4
```

```js
import { Observable } from 'rxjs/Observable';

import { from } from 'rxjs/observable/from';

import { filter } from 'rxjs/operator/filter';

Observable::from([
    { name: 'Joe', age: 31 },
    { name: 'Bob', age: 25 }
  ])
  ::filter(person => person.age > 30)  // 過濾掉大於 30 歲的人
  .subscribe(value => console.log(`Over 30: ${value.name}`));
  // Over 30: Joe
```

### first

僅發射來自 Observable 射出的第一個值 (或滿足某個條件的第一個值)。

```js
import { Observable } from 'rxjs/Observable';

import { from } from 'rxjs/observable/from';

import { first } from 'rxjs/operator/first';

const source$ = Observable::from([1, 2, 3, 4, 5]);

source$::first()
  .subscribe(value => console.log(value));
  // 1

source$::first(value => value === 3)
  .subscribe(value => console.log(value));
  // 3

source$::first(
    value => value % 2 === 0,
    (result, index) => `First even: ${result} is at index: ${index}`
  )
  .subscribe(value => console.log(value));
  // First even: 2 is at index: 1

source$::first(
    value => value > 5,
    value => `Value: ${value}`,
    'Default Value'
  )
  .subscribe(value => console.log(value));
  // Default Value
```

### ignoreElements

Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.

忽略源 Observable 發射的所有項目，只傳遞 `complete` 或 `error` 的呼叫。

```js
import { Observable } from 'rxjs/Observable';

import { from } from 'rxjs/observable/from';

import { ignoreElements } from 'rxjs/operator/ignoreElements';

Observable::from([1, 2, 3])
  ::ignoreElements()
  .subscribe(
    value => console.log(value),
    error => console.error(error),
    () => console.log('done')
  );
  // done
```

### last

Returns an Observable that emits only the last item emitted by the source Observable.

返回一個僅發出源 Observable 發射的最後一個項目的 Observable。

```js
import { Observable } from 'rxjs/Observable';

import { from } from 'rxjs/observable/from';

import { last } from 'rxjs/operator/last';

const source$ = Observable::from([1, 2, 3, 4, 5]);

source$::last()
  .subscribe(value => console.log(value));
  // 5

source$::last(value => value % 2 === 0)
  .subscribe(value => console.log(value));
  // 4

source$::last(
    value => value % 2 === 0,
    (result, index) => `Last even: ${result} is at index: ${index}`
  )
  .subscribe(value => console.log(value));
  // Last even: 4 is at index: 3
```

### sample

Emits the most recently emitted value from the source Observable whenever another Observable, the `notifier`, emits.

當 `notifier` 發射另一個 Observabl e時，從源 Observable 發射最近發射的值。

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

import { sample } from 'rxjs/operator/sample';

Observable::interval(1000)
  ::sample(Observable::interval(2000))
  .subscribe(value => console.log(value));
  // 0
  // 2
  // 4
  // 6
  // ...
```

### single

Returns an Observable that emits the single item emitted by the source Observable that matches a specified predicate, if that Observable emits one such item.

返回一個 Observable，它發出源 Observable 發射的與指定謂詞匹配的單個項，如果該 Observable 發射一個這樣的項。

```js
import { Observable } from 'rxjs/Observable';

import { from } from 'rxjs/observable/from';

import { single } from 'rxjs/operator/single';

Observable::from([1, 2, 3, 4, 5])
  ::single(value => value === 4)
  .subscribe(value => console.log(value));
  // 4
```

### skip

### skipUntil

### skipWhile

### take

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { take } from 'rxjs/operator/take';

Observable::of(1, 2, 3, 4, 5)
  ::take(3)
  .subscribe(value => console.log(value));
  // 1
  // 2
  // 3
```

### takeUntil

### takeWhile

### throttle

### throttleTime

## 組播

### multicast

### publish

### share

```js
import { Observable } from 'rxjs/Observable';

import { timer } from 'rxjs/observable/timer';

import { _do } from 'rxjs/operator/do';
import { mapTo } from 'rxjs/operator/mapTo';
import { share } from 'rxjs/operator/share';

const timer$ = Observable::timer(1000)
  ::_do(() => console.log('***SIDE EFFECT***'))
  ::mapTo('***RESULT***');

timer$.subscribe(value => console.log(value));
timer$.subscribe(value => console.log(value));
// ***SIDE EFFECT***
// ***RESULT***
// ***SIDE EFFECT***
// ***RESULT***

const share$ = timer$::share();

share$.subscribe(value => console.log(value));
share$.subscribe(value => console.log(value));
// **SIDE EFFECT***
// ***RESULT***
// ***RESULT***
```

## 轉化

### buffer

緩衝所有輸出值，直到被發射出去。反覆執行...

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { buffer } from 'rxjs/operator/buffer';

Observable::interval(1000)
  ::buffer(Observable::fromEvent(document, 'click'))  // 點擊頁面
  .subscribe(value => console.log(value));
  // 發射值
  // [...]
```

### bufferCount

緩衝所有輸出值，直到指定的數字被履行，然後再發射出去。反覆執行...

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

import { bufferCount } from 'rxjs/operator/bufferCount';

const interval$ = Observable::interval(1000);

interval$::bufferCount(3)
  .subscribe(value => console.log(value));
  // [0, 1, 2]
  // 下個間隔
  // [3, 4, 5]
  // ...

interval$::bufferCount(3, 1)
  .subscribe(value => console.log(value));
  // [0, 1, 2]
  // [1, 2, 3]
  // [2, 3, 4]
  // 下個間隔
  // [3, 4, 5]
  // [4, 5, 6]
  // [5, 6, 7]
  // ...
```

### bufferTime

緩衝所有輸出值，直到到達指定的時間點，然後再發射出去。反覆執行...

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

import { bufferTime } from 'rxjs/operator/bufferTime';

const interval$ = Observable::interval(1000);

interval$::bufferTime(2000)
  .subscribe(value => console.log(value));
  // [0]
  // 下個間隔
  // [1, 2]
  // 下個間隔
  // [3, 4]
  // ...

interval$::bufferTime(2000, 1000)
  .subscribe(value => console.log(value));
  // [0]
  // [0, 1, 2]
  // 下個間隔
  // [1, 2, 3]
  // [2, 3, 4]
  // 下個間隔
  // [3, 4, 5]
  // [4, 5, 6]
  // ...
```

### bufferToggle

### bufferWhen

### concatMap

### concatMapTo

### expand

### groupBy

### map

對來源的每個值進行應用投射。

```js
import { Observable } from 'rxjs/Observable';

import { from } from 'rxjs/observable/from';

import { map } from 'rxjs/operator/map';

Observable::from([1, 2, 3, 4, 5])
  ::map(value => value + 10)
  .subscribe(value => console.log(value))
  // 11
  // 12
  // 13
  // 14
  // 15

Observable::from([
    { name: 'Joe', age: 30 },
    { name: 'Frank', age: 20 },
    { name: 'Ryan', age: 50 }
  ])
  ::map(value => value.name)
  .subscribe(value => console.log(value))
  // Joe
  // Frank
  // Ryan
```

### mapTo

將發射值映射到所賦予的常數。

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

import { mapTo } from 'rxjs/operator/mapTo';

Observable::interval(1000)
  ::mapTo('Hello World!')
  .subscribe(value => console.log(value));
  // 每秒打印 Hello World!
```

### mergeMap

將來源的值先映射到內部個觀察者，再將其合併發射出去。即，先 `map` 再 `mergeAll`。

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { mergeMap } from 'rxjs/operator/mergeMap';

Observable::of('Hello')
  ::mergeMap(value => Observable::of(`${value} World!`))
  .subscribe(value => console.log(value));
  // Hello World!
```

### partition

### pluck

### scan

### switchMap

### window

### windowCount

### windowTime

### windowToggle

### windowWhen

## 公用

### do

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { _do } from 'rxjs/operator/do';
import { map } from 'rxjs/operator/map';

Observable::of(1, 2, 3, 4, 5)
  ::_do(value => console.log(`BEFORE MAP: ${value}`))
  ::map(value => value + 10)
  ::_do(value => console.log(`AFTER MAP: ${value}`))
  .subscribe(value => console.log(value));
  // BEFORE MAP: 1
  // AFTER MAP: 11
  // 11
  // BEFORE MAP: 2
  // AFTER MAP: 12
  // 12
  // BEFORE MAP: 3
  // AFTER MAP: 13
  // 13
  // BEFORE MAP: 4
  // AFTER MAP: 14
  // 14
  // BEFORE MAP: 5
  // AFTER MAP: 15
  // 15
```

### delay

Delays the emission of items from the source Observable by a given timeout or until a given Date.

延遲發射 Observable 來源中的項目，依照由給定的超時或直到給定的日期。

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';

import { mapTo } from 'rxjs/operator/mapTo';
import { delay } from 'rxjs/operator/delay';

const of$ = Observable::of(null);

Observable::merge(
    of$::mapTo(1),
    of$::mapTo(2)::delay(1000),
    of$::mapTo(3)::delay(3000)
  )
  .subscribe(value => console.log(value));
  // 1
  // 2 (延遲 1 秒)
  // 3 (延遲 4 秒)
```

### delayWhen

### dematerialize

### let

### materialize

### observeOn

### toPromise
