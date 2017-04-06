## 入門


安裝 Node.js

https://nodejs.org

安裝 Angular CLI

```bash
$ npm i @angular/cli -g
```

建立專案

```bash
$ ng new <專案名稱>
$ cd <專案名稱>
```

執行應用程式

```bash
$ ng serve
```

前往 [http://localhost:4200/](http://localhost:4200/) 查看

打開新的終端機

建立 `foo` 和 `bar` 元件

```bash
$ ng g component foo
$ ng g component bar
```

使用剛剛所建立的元件

```html
// src/app/app.component.html
<h1>
  {{title}}
</h1>

<app-foo></app-foo>

<app-bar></app-bar>
```

進一步了解 Angular CLI

...

擴展 Angular CLI

由於 Angular CLI 的 `webpack.config.js` 是閉鎖的，
不過我們可以透過 `@ngtools/webpack` 來製作一個新的樣板，
這時就不會受到 CLI 綁定的影響

```js
{
  test: /\.ts$/,
  loader: '@ngtools/webpack'
}
```
