## 工具

### 模組整合

[Rollup](http://rollupjs.org/) 是 JavaScript 下一代的模組整合工具，類似於 Browserify 和 Webpack。

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
  format: 'iife'  // 'amd', 'cjs', 'es', 'iife', 'umd'
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

### 自動化建置

#### Gulp
```bash
$ npm i gulp -g
```

```ts
// gulpfile.js
import * as gulp from 'gulp';
```

```bash
$ npm i gulp-tslint -D
```

```ts
// gulpfile.js
import * as gulp from 'gulp';
import * as tslint from 'gulp-tslint';

gulp.task('tslint', () =>
  gulp.src('./src/**/*.ts')
    .pipe(tslint({ configuration: 'tslint.json' }))
    .pipe(tslint.report())
);
```

```bash
$ gulp tslint
```

將 Rollup 與 Gulp 整合使用

```bash
$ npm i rollup rollup-stream -D
```

```

```

### 除錯和剖析

#### Angury
