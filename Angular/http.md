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

或者使用 `import { HttpClientModule } from '@angular/common/http';`

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
      .map(res => res.json())  // 映射成 JSON
      .subscribe(data => {
        this.data = JSON.stringify(data);
      });
  }
}
```

換成 HttpClientModule

```diff
import { Component } from '@angular/core';
- import { Http } from '@angular/http';
+ import { HttpClient } from '@angular/common/http';

- import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `
    <pre>{{ data }}</pre>
  `
})
export class AppComponent {
  private data;

  constructor(private http: HttpClient) {
    http.get<any>('http://localhost:8000/data')
-      .map(res => res.json())  // 映射成 JSON
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

### 完整的 REST

建立一個 List 模型

```ts
export interface List {
  _id: string;
  text: string;
  __v: number;
}
```

建立一個 List 服務

```ts
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { List } from './list';

@Injectable()
export class ListService {
  private url = 'https://web-go-demo.herokuapp.com/__/list';  // API 位址

  constructor(private http: Http) { }

  getList(): Observable<List[]> {  // 取得所有資料，API: GET /__/list
    return this.http
      .get(this.url)
      .map(res => res.json());
  }

  getItem(id: string): Observable<List> {  // 取得單筆資料，API: GET /__/list/{id}
    return this.http
      .get(`${this.url}/${id}`)
      .map(res => res.json());
  }

  postItem(data): Observable<List> {  // 新增一筆資料，API: POST /__/list
    return this.http
      .post(this.url, data)
      .map(res => res.json());  // 伺服器會回傳的訊息
  }

  putItem(id: string, data): Observable<List> {  // 更新一筆資料，API: PUT /__/list/{id}
    return this.http
      .put(`${this.url}/${id}`, data)
      .map(res => res.json());  // 伺服器會回傳的訊息
  }

  deleteItem(id: string): Observable<List> {  // 刪除一筆資料，API: DELETE /__/list/{id}
    return this.http
      .delete(`${this.url}/${id}`)
      .map(res => res.json());  // 伺服器會回傳的訊息
  }
}
```

使用 ListService 操作 API

```ts
import { Component, OnInit } from '@angular/core';

import { ListService } from './list.service';

@Component({
  selector: 'app-root',
  template: `<p>{{ data }}</p>`
})
export class AppComponent implements OnInit {
  data;

  constructor(private listService: ListService) { }

  /**
   * 分別操作底下程式碼，來查看資料的變化
   */
  ngOnInit() {
    this.listService
      .getList()
      .subscribe(data => this.data = JSON.stringify(data));

    // this.listService
    //   .getItem('594baf4170d21a00129b7c27')
    //   .subscribe(data => this.data = JSON.stringify(data));

    // this.listService
    //   .postItem({ text: 'Angular GO' })
    //   .subscribe(data => this.data = JSON.stringify(data));

    // this.listService
    //   .putItem('594bb5c270d21a00129b7c28', { text: 'Angular GO' })
    //   .subscribe(data => this.data = JSON.stringify(data));

    // this.listService
    //   .deleteItem('594bb5e670d21a00129b7c29')
    //   .subscribe(data => this.data = JSON.stringify(data));
  }
}
```

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListService } from './list.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
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

### GraphQL

建立一個簡單的 GraphQL 伺服器

```js
// app.js
const express = require('express');
const graphql = require('express-graphql');

const { schema, rootValue } = require('./graphql');

const app = express();

app.set('port', (process.env.PORT || 8000));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/graphql', graphql({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(app.get('port'), () => {
  console.log(`Port: ${app.get('port')}.`);
});
```

```js
// graphql.js
import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    helloWorld: String
  }
`);

export const rootValue = {
  helloWorld() {
    return 'Hello World';
  }
};
```

```bash
$ node app.js
```

```ts
// src/app/graphql.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class GraphqlService {
  private dataUrl: string = 'http://localhost:8000/graphql';

  constructor(private http: Http) { }

  private graphqlMethod(): any {
  };
}
```
