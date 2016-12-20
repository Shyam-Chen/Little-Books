## 測試

### 測試原則

要編寫出可靠度極高的程式碼是非常困難的事情。不管怎樣，只要有 Bug 的出現，即便是小型應用程式也會變得相當複雜。

測試驅動開發 (TDD)，TDD 的週期，主要是「失敗」、「通過」和「重構」

### 靜態分析

#### Codelyzer 簡介

Codelyzer 是從 TSLint 的自訂規則部分延伸出來的，是用來解析 Angular 專案的。

#### 配置 Codelyzer

```bash
$ npm i tslint codelyzer -D
```
```js
// tslint.json
{
  "rulesDirectory": ["node_modules/codelyzer"],  // 使用 Codelyzer
  "rules":{
    // 一些 TSLint 的規則在這裡

    // Codelyzer 的規則
    "directive-selector": [true, "attribute", "ap", "camelCase"],  // 前綴是使用 Angular 和 Playground 的字首
    "component-selector": [true, "element", "ap", "kebab-case"],  // 前綴是使用 Angular 和 Playground 的字首
    "use-input-property-decorator": true,
    "use-output-property-decorator": true,
    "use-host-property-decorator": true,
    "no-attribute-parameter-decorator": true,
    "no-input-rename": true,
    "no-output-rename": true,
    "no-forward-ref": true,
    "use-life-cycle-interface": true,
    "use-pipe-transform-interface": true,
    "pipe-naming": [true, "camelCase", "ap"],  // 前綴是使用 Angular 和 Playground 的字首
    "component-class-suffix": true,
    "directive-class-suffix": true,
    "import-destructuring-spacing": true,
    "templates-use-public": true,
    "no-access-missing-member": true,
    "invoke-injectable": true
  }
}
```
```bash
$ tslint src/**/*.ts
```

### 測試入門

BDD

官方推薦的測試框架是 Jasmine

`describe`
`it`

```js
describe('...', () => {
  it('...', () => {
    // ...
  });
});
```

斷言

```js
expect(true).toBe(true);
```

間諜

```js
spyOn(foo, 'bar')
```

### 單元測試

```bash
$ npm i karma -D
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'hello-unit',
  template: `
    <p>{{ messages }}</p>
  `
})
export class HelloUnitComponent {
  public messages: string = 'Hello Unit';
}
```
```ts
import { HelloUnitComponent } from './hello-unit.component';

describe('HelloUnitComponent', () => {

  beforeEach(() => {
    this.helloUnitComponent = new HelloUnitComponent();
  });

  it('should have a content', () => {
    expect(this.helloUnitComponent.messages).toEqual('Hello Unit');
  });

});
```

### 端對端測試

#### 配置 Protractor
```bash
$ npm i protractor -D
```
```js
// protractor.conf.js
const tsNode = require('ts-node');
const jasmineSpecReporter = require('jasmine-spec-reporter');

const config = {
  directConnect: true,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'http://localhost:9876/',
  beforeLaunch() {
    tsNode.register({ project: 'e2e' });
  },
  onPrepare() {
    let SpecReporter = jasmineSpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: true }));
    browser.ignoreSynchronization = false;
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    isVerbose: false,
    showColors: true,
    includeStackTrace: false
  },
  useAllAngular2AppRoots: true
};

exports.config = config;
```

#### 第一個測試
```ts
// hello-e2e.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'hello-e2e',
  template: `
    <button (click)="onClick()">點擊我</button>
    <p>{{ message }}</p>
  `
})
export class HelloE2EComponent {
  public message: string;

  onClick(): void {
    this.message = 'Hello E2E';
  }
}
```
```ts
// hello-e2e.component.e2e-spec.ts
describe('HelloE2EComponent', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should have a content', () => {
    element(by.css('hello-e2e')).click();
    expect(element(by.css('hello-e2e p')).getText()).toEqual('Hello E2E');
  });

});
```

```bash
$ webdriver-manager update  # 這個只要在安裝完後，執行一次就好
$ protractor protractor.conf.js
```
