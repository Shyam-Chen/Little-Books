# File System

```js
const fs = require('fs');
```

## Split a file based on number of lines (依照行數分割檔案)

```md
one
two
three
```

```js
const fs = require('fs');

const fileArr = fs.readFileSync('file.md', 'utf8').toString().split('\n');

console.log(fileArr);
// [ 'one', 'two', 'three', '' ]
```

## Create a directory if it doesn't exist (如果目錄不存在，就建立目錄)

```js
const fs = require('fs');

const dist = './uploads';

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}
```

## Copy a file (複製檔案)

```js
const fs = require('fs');

fs.promises
  .copyFile('source.md', 'destination.md')
  .then(() => console.log('source.md was copied to destination.md'))
  .catch(() => console.log('The file could not be copied'));
```
