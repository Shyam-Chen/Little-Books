# Pug and Stylus

```sh
$ npm init vite-app pug-stylus-gogo
$ cd pug-stylus-gogo
$ npm install
```

```sh
$ npm install pug stylus -D
```

```sh
$ npm run dev
```

```vue
<template lang="pug">
//- ...
</template>

<style lang="stylus">
// ...
</style>
```

poststylus + postcss-preset-env

```

```

pug-lint

```

```

stylus-supremacy

```js
"stylusSupremacy.insertBraces": false,
"stylusSupremacy.insertColons": false,
"stylusSupremacy.insertSemicolons": false,
"stylusSupremacy.selectorSeparator": "\n",
"stylusSupremacy.alwaysUseZeroWithoutUnit": true,
"stylusSupremacy.reduceMarginAndPaddingValues": true,
```

```vue
<template lang="pug">
.title Pug and Stylus
</template>

<style lang="stylus">
.title
  color #ccc
  font-size 1.5rem
</style>
```

```vue
<template lang="pug">
button.button
  i.button__icon bookmark
  span.button__label Button
</template>

<style lang="stylus">
.button
  // ...

  &--outlined
    // ...

  &--raised
    // ...

  &__icon
    // ...

  &__label
    // ...
</style>
```
