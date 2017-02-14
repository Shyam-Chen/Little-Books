# ReactiveX

### 練習來源
* https://github.com/ReactiveX/rxjs
* https://github.com/btroncone/learn-rxjs

### 實作執行
* https://github.com/Shyam-Chen/Web-Starter-Kit
* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### 目錄
* [Observable (可觀察)](#observable)
  * -> [Subject (主體)](#subject)
    * -> [AsyncSubject (非同步主體)](#asyncsubject)
    * -> [BehaviorSubject (行為主體)](#behaviorsubject)
    * -> [ReplaySubject (反覆主體)](#replaysubject)
* [Scheduler (調度器)](#scheduler)
  * animationFrame
  * asap
  * async
  * queue
* [Combination (組合)](#組合)
  * [combineAll](#combineall)
  * [combineLatest](#combinelatest) :star:
  * [concat](#concat) :star:
  * [concatAll](#concatall)
  * [forkJoin](#forkjoin)
  * merge :star:
  * mergeAll
  * race
  * startWith :star:
  * withLatestFrom :star:
  * zip
* [Conditional (附條件)](#附條件)
  * defaultIfEmpty
  * every
* [Creation (建立)](#建立)
  * [bindCallback](#bindcallback)
  * [bindNodeCallback](#bindnodecallback)
  * create
  * [defer](#defer)
  * [empty](#empty)
  * [from](#from) :star:
  * [fromEvent](#fromevent)
  * fromEventPattern
  * fromPromise
  * [interval](#interval)
  * interval
  * never
  * [of](#of)
  * [range](#range)
  * range
  * throw
  * timer
* [Error Handling (錯誤處理)](#錯誤處理)
  * catch
  * retry
  * retryWhen
* [Filtering (過濾)](#過濾)
  * debounce
  * debounceTime :star:
  * distinctUntilChanged :star:
  * [filter](#filter) :star:
  * first
  * ignoreElements
  * last
  * sample
  * single
  * skip
  * skipUntil
  * skipWhile
  * take :star:
  * takeUntil :star:
  * takeWhile
  * throttle
  * throttleTime
* [Multicasting (組播)](#組播)
  * multicast
  * publish
  * share :star:
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
  * do :star:
  * delay
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
    setTimeout(() => observer.next('開始'), 0);
    setTimeout(() => observer.next('第一個'), 1000);
    setTimeout(() => observer.next('第二個'), 2000);
    setTimeout(() => observer.next('第三個'), 3000);
    setTimeout(() => observer.complete(), 4000);
  })
  .subscribe(  // 訂閱一個或多個 Observable (可觀察的物件)
    value => console.log(value),
    () => console.error('錯誤'),
    () => console.log('完成')
  );
  // 開始
  // 第一個
  // 第二個
  // 第三個
  // 完成
```

### Subject

```js
import { Subject } from 'rxjs/Subject';
```

#### AsyncSubject

```js
import { AsyncSubject } from 'rxjs/AsyncSubject';
```

#### BehaviorSubject

```js
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

subject.subscribe((val) => console.log('Received value:', val));
// 2
// 3
```

## Scheduler

```js
import { Scheduler } from 'rxjs/Scheduler';

import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { asap } from 'rxjs/scheduler/asap';
import { async } from 'rxjs/scheduler/async';
import { queue } from 'rxjs/scheduler/queue';
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

timer$::mapTo(Observable::of('Hello', 'World'))
  ::combineAll()
  .subscribe((val) => console.log('Values from inner observable:', val));
  // ["Hello"]
  // ["World"]

timer$::mapTo(Observable::of('Hello', 'Goodbye'))
  ::combineAll((val) => `${val} Friend!`)
  .subscribe((val) => console.log('Values Using Projection:', val));
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
  ::map((val) => Observable::interval(val + 500)::take(2))
  ::combineAll()
  .subscribe((val) => console.log(val));
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
  .subscribe((latestValues) => {
    const [timerValOne, timerValTwo, timerValThree] = latestValues;
    console.log(`${timerValOne}, ${timerValTwo}, ${timerValThree}`);
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
    (one, two, three) => `${one}, ${two}, ${three}`
  )
  .subscribe((latestValuesProject) => console.log(latestValuesProject));
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
  .subscribe((latestValues) => {
    const [timerValOne, timerValTwo, timerValThree] = latestValues;
    console.log(`${timerValOne}, ${timerValTwo}, ${timerValThree}`);
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
  .subscribe(result => console.log(result));
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
  .subscribe(result => console.log(result));
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
  .subscribe(result => console.log(result));
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
  .subscribe(result => console.log(result));
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
  .subscribe(result => console.log(result));
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
  .subscribe(result => console.log(result));
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
  .subscribe(result => console.log(result));
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
  .subscribe(result => console.log(result));
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

## 附條件

## 建立

### bindCallback

將回呼 API 轉換成返回 Observable 函式。

```js
import { Observable } from 'rxjs/Observable';

import { bindCallback } from 'rxjs/observable/bindCallback';

Observable::bindCallback(...)
  .subscribe(result => console.log(result));
```

### bindNodeCallback

將 Node.js 風格的回呼 API 轉換成返回 Observable 函式。

```js
import { Observable } from 'rxjs/Observable';

import { bindNodeCallback } from 'rxjs/observable/bindNodeCallback';

Observable::bindNodeCallback(...)
  .subscribe(result => console.log(result));
```

### defer

Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.

建立一個 Observable，在 subscribe 上，調用一個 Observable 工廠為每個新的 Observer 做一個 Observable。

```js
import { Observable } from 'rxjs/Observable';

import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

Observable::defer(() => Observable::of(1, 2, 3))
  .subscribe(result => console.log(result + 1));
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
  .subscribe(result => console.log(result));
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
  .subscribe(result => console.log(result.pageX, result.pageY));
  // 打印出點擊的座標
```

### interval

Creates an Observable that emits sequential numbers every specified interval of time, on a specified IScheduler.

建立一個 Observable，它在指定的 IScheduler 上每隔指定的時間間隔發出序列號。

```js
import { Observable } from 'rxjs/Observable';

import { interval } from 'rxjs/observable/interval';

Observable::interval(1000)
  .subscribe(result => console.log(result));
  // 0
  // 1
  // 2
  // 3
  // ...
```

### of

為觀察者發射給予指定的參數做為一個值，然後再一個接著一個，最後再一次發射出去。

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

Observable::of(1, 2, 3)
  .subscribe(result => console.log(result));
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
  .subscribe(result => console.log(result));
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
  .subscribe(result => console.log(result));
  // 1
  // 2
  // 3
  // 4
  // 5
```

## 錯誤處理

## 過濾

### filter

過濾給予的條件值，再將值發射出去。

```js
import { Observable } from 'rxjs/Observable';

import { from } from 'rxjs/observable/from';

import { filter } from 'rxjs/operator/filter';

Observable::from([1, 2, 3, 4, 5])
  ::filter(num => num % 2 === 0)  // 過濾掉非偶數的數值
  .subscribe(result => console.log(result));
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

## 組播

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
  .subscribe((val) => console.log('Buffered Values:', val));
  // 發射數值
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
  .subscribe((val) => console.log('Buffered Values:', val));
  // [0, 1, 2]
  // 下個間隔
  // [3, 4, 5]
  // ...

interval$::bufferCount(3, 1)
  .subscribe((val) => console.log('Start Buffer Every 1:', val));
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
  .subscribe((val) => console.log('Buffered with Time:', val));
  // [0]
  // 下個間隔
  // [1, 2]
  // 下個間隔
  // [3, 4]
  // ...

interval$::bufferTime(2000, 1000)
  .subscribe((val) => console.log('Start Buffer Every 1s:', val));
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

### map

對來源的每個值進行應用投射。

```js
import { Observable } from 'rxjs/Observable';

import { from } from 'rxjs/observable/from';

import { map } from 'rxjs/operator/map';

Observable::from([1, 2, 3, 4, 5])
  ::map((val) => val + 10)
  .subscribe((val) => console.log(val))
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
  ::map((person) => person.name)
  .subscribe((val) => console.log(val))
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
  .subscribe((val) => console.log(val));
  // 每秒打印 Hello World!
```

### mergeMap

將來源的值先映射到內部個觀察者，再將其合併發射出去。即，先 `map` 再 `mergeAll`。

```js
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { mergeMap } from 'rxjs/operator/mergeMap';

Observable::of('Hello')
  ::mergeMap((val) => Observable::of(`${val} World!`))
  .subscribe((val) => console.log(val));
  // Hello World!
```

## 公用
