# Sequelize

### Reference Resources (參考資源)

* https://github.com/sequelize/sequelize

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Backend-Starter-Kit

***

### Table of Contents (目錄)

***

Sequelize, SQL, PostgreSQL

```js
import Sequelize from 'sequelize';

const sequelize = new Sequelize(POSTGRES_URL_HERE);

sequelize.authenticate()
  .then(() => console.log('Connection Succeeded.'))
  .catch(err => console.error(err));
```

```js
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(POSTGRES_URL_HERE);
const db = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
```

```js
export default (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    text: DataTypes.STRING
  });

  return List;
};
```
