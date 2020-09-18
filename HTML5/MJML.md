# MJML

```sh
$ yarn add mjml
```

```sh
$ yarn add gulp gulp-mjml -D
```

```js
// gulpfile.js
const path = require('path');
const gulp = require('gulp');
const mjml = require('gulp-mjml');
const mjmlEngine = require('mjml');

function transpile(cb) {
  return gulp
    .src('./src/*.mjml')
    .pipe(gulp.dest('./dist/mjml'))
    .pipe(mjml(mjmlEngine, { minify: true }))
    .pipe(gulp.dest('./dist/html'));
}

function watch(cb) {
  // ...
}

exports.default = gulp.parallel(transpile, watch);
```
