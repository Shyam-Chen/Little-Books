## 工具

### 模組整合

#### Rollup

### 自動化建置

#### Gulp
```bash
$ npm i ts-node typescript gulp @types/gulp -D
$ touch gulpfile.ts
```

```ts
// gulpfile.ts
import * as gulp from 'gulp';
```

```bash
$ npm i gulp-tslint @types/gulp-tslint -D
```

```ts
// gulpfile.ts
import * as tslint from 'gulp-tslint';
[...]
gulp.task('tslint', () => {
  gulp
    .src(SCRIPTS_SRC)
    .pipe(tslint({ configuration: 'tslint.json' }))
    .pipe(tslint.report())
});
```

```bash
$ gulp tslint
```

### 除錯和剖析

#### Angury
