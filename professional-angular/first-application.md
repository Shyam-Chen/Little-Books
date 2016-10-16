## 第一個應用程式

### Angular 簡介
Angular 是一個強大的框架，只要使用此框架就能開發出強大的 Web/Mobile 應用程式，當然不只這樣

### 設定環境
```bash
# 建立名為 angular-starter 的資料夾
$ mkdir angular-starter

# 切換到 angular-starter 資料夾
$ cd angular-starter
```

```bash
# 建立名為 package.json 的檔案
$ touch package.json  # 也可以直接執行 $ npm init -y 建立此檔案
```
```js
// package.json
{
  "name": "angular-starter",
  "version": "1.0.0",
  "scripts": {
    "start": "tsc src/system.config.ts && lite-server -c bsconfig.json"
  },
  "devDependencies": {
    "lite-server": "^2.2.2",
    "typescript": "^2.0.2"
  }
}
```

```bash
# 建立名為 bsconfig.json 的檔案
$ touch bsconfig.json  # 這是 lite-server 的組態檔案
```
```js
// bsconfig.json
{
  "port": 3000,
  "files": ["./src/**/*.{html,css,ts}"],
  "server": {
    "baseDir": "./src"
  }
}
```

```bash
# 建立名為 src 的資料夾
$ mkdir src

# 在 src 資料夾內，建立名為 index.html 的檔案
$ touch src/index.html
```
```html
<!-- src/index.html -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Angular Starter</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://unpkg.com/core-js/client/shim.min.js"></script>
    <script src="https://unpkg.com/systemjs@0.19.39/dist/system.src.js"></script>
    <script src="https://unpkg.com/zone.js@0.6.25?main=browser"></script>
    <script src="./system.config.js"></script>
    <script>
      System.import('app').catch(function(err){console.error(err);});
    </script>
  </head>
  <body>
    <app>Loading...</app>
  </body>
</html>
```

```bash
# 在 src 資料夾內，建立名為 system.config.ts 的檔案
$ touch src/system.config.ts
```
```js
// src/system.config.ts
declare const System: any;

const config: any = {
  transpiler: 'ts',
  typescriptOptions: {
    tsconfig: true
  },
  meta: {
    'typescript': {
      'xports' 's'
    }
  },
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  map: {
    app: 'app',
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    'rxjs': 'npm:rxjs',
    'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    'ts': 'npm:plugin-typescript@4.0.10/lib/plugin.js',
    'typescript': 'npm:typescript@2.0.2/lib/typescript.js'
  },
  packages: {
    app: {
      main: './main.ts',
      defaultExtension: 'ts'
    },
    rxjs: {
      defaultExtension: 'js'
    },
    'angular2-in-memory-web-api': {
      main: './index.js',
      defaultExtension: 'js'
    }
  }
};

System.config(config);
```

```bash
# 在 src 資料夾內，建立名為 app 的資料夾
$ mkdir src/app

# 在 src/app 資料夾內，建立名為 main.ts 的檔案
$ touch src/app/main.ts
```
```ts
// src/app/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

```bash
# 在 src/app 資料夾內，建立名為 app.module.ts 的檔案
$ touch src/app/app.module.ts
```
```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```bash
# 在 src/app 資料夾內，建立名為 app.component.ts 的檔案
$ touch src/app/app.component.ts
```
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>第一個應用程式</p>
  `
})
export class AppComponent { }
```

```bash
# 安裝相依性套件
$ npm install

# 啟動應用程式
$ npm start
```

### 開始使用
```ts
// src/app/new.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'new',
  template: `
    <p>這是新建立的元件</p>
  `
})
export class NewComponent { }
```
```ts
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewComponent } from './new.component';  // 導入新建立的元件

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    NewComponent  // 將新建立的元件註冊到 AppModule 裡
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
```ts
// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <p>第一個應用程式</p>
    <new></new>  <!-- 使用新建立的元件 -->
  `
})
export class AppComponent { }
```

### 整體的架構
```
.
├── src
│   ├── app
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── new.component.ts
│   ├── index.html
│   └── system.config.ts
├── bsconfig.json
└── package.json
```
