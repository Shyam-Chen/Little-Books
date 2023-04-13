# List Interpolation

The List interpolation can be interpolated in the placeholder using an array defined in JavaScript.

As an example, the following locale messages resource:

```ts
// src/locales/en-US.ts
export default {
  hello: '{0} world',
};
```

It is defined `en-US` locale with `{ hello: '{0} world' }`.

List interpolation allows you to specify array defined in JavaScript. In the locale message above, you can be localized by giving the `0` index item of the array defined by JavaScript as a parameter to the translation function.

The following is an example of the use of `$f` in a template:

```vue
<script setup>
import { useLocale } from 'vue-localer';
const locale = useLocale();
</script>
<template>
  <div>{{ $f(locale.hello, ['hello']) }}</div>
</template>
```

The first argument is `locale.hello` as the locale messages key, and the second argument is an array that have `'hello'` item as a parameter to `$f`.

As result the below:

```html
<div>hello world</div>
```
