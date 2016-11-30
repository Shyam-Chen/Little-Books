## Observables

Observables 是一個新的型別，在未來的 ES 標準中出現是有可能的。

這種概念是從一個串流的 `subscribe` 事件方式傳入一個 Generator，不過重要的是 Iterator 部分。

### 基本應用

首先載入 `Observable`
```ts
import { Observable } from 'rxjs/Observable';
```
