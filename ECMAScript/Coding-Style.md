# Coding Style

ESLint + Prettier

```sh
$ pnpm i eslint babel-eslint eslint-config-prettier eslint-plugin-prettier -D
```

```js
// .eslintrc

{
  "plugins": ["prettier"],
  "extends": ["prettier"],
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error"
  }
}
```

```js
// .prettierrc

{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all"
}
```
