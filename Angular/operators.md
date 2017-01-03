## Operators

練習來源: https://github.com/btroncone/learn-rxjs

範例執行: https://github.com/Shyam-Chen/Web-Starter-Kit

***

### 目錄
* Transformation
  * [buffer](#buffer)
  * [bufferCount](#buffercount)

***

## Transformation

### buffer

緩衝所有輸出值，直到被提交出去。反覆執行...

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
