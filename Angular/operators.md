## Operators

練習來源: https://github.com/btroncone/learn-rxjs

實作執行: https://github.com/Shyam-Chen/Web-Starter-Kit

***

### 目錄
* [Transformation](#transformation)
  * [buffer](#buffer)
  * [bufferCount](#buffercount)

***

## Transformation

### buffer

緩衝所有輸出值，直到被發射出去。反覆執行...

```js
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { buffer } from 'rxjs/operator/buffer';

Observable::interval(1000)
  ::buffer(Observable::fromEvent(document, 'click'))
  .subscribe((val) => console.log('Buffered Values:', val));
```

### bufferCount

緩衝所有輸出值，直到指定的數字被履行，然後再發射出去。反覆執行...

```js
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';

import { bufferCount } from 'rxjs/operator/bufferCount';

const interval$ = Observable::interval(1000);

interval$::bufferCount(3).subscribe((val) => console.log('Buffered Values:', val));
interval$::bufferCount(3, 1).subscribe((val) => console.log('Start Buffer Every 1:', val));
```
