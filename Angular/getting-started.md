## 入門

```bash
$ npm i @angular/cli -g
```

```bash
$ ng new --ng4 --style scss <專案名稱>
$ cd <專案名稱>
```

```bash
$ ng serve
```

前往 [http://localhost:4200/](http://localhost:4200/) 查看

```bash
# 建立一個名為 `new` 的元件
$ ng g component new
```

```ts
// src/app/new/new.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```
