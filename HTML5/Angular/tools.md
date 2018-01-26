## 工具

### 模組整合

擴充 Angular CLI 的 Webpack 組態

```bash
$ npm i rucksack-css -D
```

***

[Rollup](http://rollupjs.org/) 是 JavaScript 下一代的模組整合工具，類似於 Browserify。

```js
// src/main.js
```

```js
// src/foo.js
```
```js
// src/bar.js
```

```bash
$ npm i rollup -g
```

```js
// rollup.config.js
export default {
  entry: 'src/main.js',
  dest: 'dist/main.js',
  // 可使用的選項：'amd'、'cjs'、'es'、'iife' 和 'umd'，預設是 'es'
  format: 'iife'  // iife 即 <script> 的意思
};
```

```bash
$ rollup -c
```

```bash
$ npm i rollup-plugin-typescript -D
```

```js
// rollup.config.js
import * as typescript from 'rollup-plugin-typescript';

export default {
  entry: 'src/main.ts',
  dest: 'dist/main.js',
  format: 'iife',
  plugins: [
    typescript()
  ]
};
```

```bash
$ rollup -c
```

```bash
$ npm i rollup-plugin-node-resolve rollup-plugin-commonjs -D
```

```js
// rollup.config.js
import * as typescript from 'rollup-plugin-typescript';
import * as resolve from 'rollup-plugin-node-resolve';
import * as commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/main.ts',
  dest: 'dist/main.js',
  format: 'iife',
  plugins: [
    typescript(),
    resolve({ jsnext: true, browser: true }),
    commonjs()
  ]
};
```

```bash
$ rollup -c
```

```bash
$ npm i rollup-watch -g
```

```bash
$ rollup -c --watch
```

在 Angular CLI 的 Webpack 組態上配置 Rollup

```bash
$ npm i rollup-loader -D
```

### 自動化建置

#### Gulp
```bash
$ npm i gulp -g
```

```ts
// gulpfile.js
const gulp = require('gulp');
```

```bash
$ npm i gulp-tslint -D
```

```ts
// gulpfile.js
const gulp = require('gulp');
const tslint = require('gulp-tslint');

gulp.task('tslint', () =>
  gulp.src('./src/**/*.ts')
    .pipe(tslint({ configuration: 'tslint.json' }))
    .pipe(tslint.report())
);
```

```bash
$ gulp tslint
```

在 Angular CLI 中配置 Gulp

```bash
$ npm i gulp -D
```

### 除錯和剖析

#### Angury
