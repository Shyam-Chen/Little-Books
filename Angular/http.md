## HTTP

```ts
// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';  // 導入 HTTP 模組

import { AppComponent } from './app.component';
// ...

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,  // 放至 App 模組裡
    // ...
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Get

```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `
    <pre>{{ data }}</pre>
  `
})
export class AppComponent {
  private data;

  constructor(private http: Http) {
    http.get('http://localhost:8000/data')
      .map(res => res.json())
      .subscribe(data => {
        this.data = JSON.stringify(data);
      });
  }
}
```

建立一個簡單的伺服器

```js
// server.js
const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 8000));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/data', (req, res) => {
  res.json({
    title: 'Angular GO',
    content: 'I have an @angular, I have a @reactivex. Uh! @ngrx!'
  });
});

app.listen(app.get('port'), () => {
  console.log('App: Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});
```

打開新的終端機

```bash
$ node server.js
```

(2)
```ts
import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'on-request',
  template: `
    <button type="button" (click)="onRequest()">請求</button>
    <pre>{{ messages | json }}</pre>
  `
})
export class OnRequestComponent {
  public messages: Object;

  constructor(private http: Http) { }

  onRequest() {
    this.http
      .request('./assets/data.json')  // 或者 .get('./assets/data.json')
      .subscribe((res: Response) => {
        this.messages = res.json();
      });
  }
}
```

#### 建立服務
```ts
// src/app/sample.service.ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SampleService {
  constructor(private http: Http) { }

  sampleMethod(): any {
    return this.http
      .get('./assets/data.json')
      // 對原始發射的每一項資料應用一個所選擇的函式，然後回傳一個發射這些結果的值
      .map(res => res.json());  // 解析成 JSON
  }
}
```

```ts
// 或者
import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SampleService {
  constructor(private http: Http) { }

  sampleMethod(): any {
    return this.http
      .request(new Request({
        method: RequestMethod.Get,
        url: './data.json'
      }))
      .map(res => res.json());
  }
}
```

#### 準備資料
```js
// src/assets/data.json
{
  "title": "Angular2-in-Action",
  "description": "Angular 2 實戰手冊"
}
```

#### 操作服務
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { SampleService } from './sample.service';

@Component({
  selector: 'app',
  template: `
    <button (click)="onClick()">點擊我</button>
    <pre>{{ messages }}</pre>
  `,
  providers: [HTTP_PROVIDERS],
  viewProviders: [SampleService]
})
export class AppComponent {
  constructor(private sampleService: SampleService) { }

  onClick(): void {
    console.log('請求開始');

    this.sampleService
      .sampleMethod()
      // 操作所發射的物件與通知
      .subscribe(
        data => this.messages = JSON.stringify(data),  // 成功處理
        err => console.log(err),  // 錯誤處理
        () => console.log('請求結束')  // 完成處理
      );
  }
}
```

#### 倒退為 Promise
```ts
// src/app/sample.service.ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SampleService {
  constructor(private http: Http) { }

  sampleMethod(): any {
    return this.http
      .get('./data.json')
      .toPromise()
      .then(res => res.json());
  }
}
```
```ts
// src/app/app.component.ts
[...]
export class AppComponent {
  constructor(private sampleService: SampleService) { }

  onRequest(): void {
    this.sampleService
      .sampleMethod()
      .then(
        data => this.messages = JSON.stringify(data),  // 成功處理
        err => console.log(err)  // 錯誤處理
      );
  }
}
```

#### 捕獲錯誤
```ts
// src/app/sample.service.ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SampleService {
  constructor(private http: Http) { }

  sampleMethod(): Observable<any> {
    return this.http
      .get('./assets/data.json')
      .map(res => res.json())
      // 攔截原始的錯誤通知，並將它替換為其它的資料項或資料序列，讓生成的 Observable 能夠正常終止或者不終止它
      .catch(err => Observable.throw(err));
  }
}
```

### Post

#### 建立服務
```ts
// src/app/sample.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class SampleService {
  private dataJson: any = {
    title: 'Angular2-in-Action',
    description: 'Angular 2 實戰手冊'
  };

  private dataUrl: string = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) { }

  private sampleMethod(): any {
    let body = JSON.stringify(this.dataJson);
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.dataUrl, body, options)
      .map(res => res.json());
  };
}
```

#### 執行服務
```ts
import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { SampleService } from './sample.service';

@Component({
  selector: 'app',
  template: `
    <button (click)="onClick()">點擊我</button>
    <pre>{{ results }}</pre>
  `,
  providers: [HTTP_PROVIDERS],
  viewProviders: [SampleService]
})
export class AppComponent {
  constructor(private sampleService: SampleService) { }

  private onClick(): void {
    console.log('發送開始');

    this.sampleService
      .sampleMethod()
      .subscribe(
        data => this.results = JSON.stringify(data),
        err => console.log(err),
        () => console.log('發送完成')
      );
  }
}
```

### Put
```ts
// src/app/rest.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class RestService {
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  private editMethod(data): any {
    let url = `/v1/api/${data._id}`;  // _id 是 MongoDB 的識別碼
    let body = JSON.stringify(data);

    return this.http
      .put(url, body, this.options);
  };
}
```

### Delete
```ts
// src/app/rest.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class RestService {
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  private editMethod(data): any {
    let url = `/v1/api/${data._id}`;

    return this.http
      .delete(url, this.options);
  };
}
```

### JSONP
```ts

```
```ts
import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WikipediaService {
  private wikiUrl: string = 'http://en.wikipedia.org/w/api.php';

  constructor(private jsonp: Jsonp) { }

  search(term: string): any {
    let params = new URLSearchParams();

    params.set('search', term);
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp
      .get(this.wikiUrl, { search: params })
      .map(req => <string[]>req.json()[1]);
  }
}
```
