# <div class="flex items-center">vue-localer[<div class="i-tabler-brand-github ms-2"></div>](https://github.com/Vanilla-IceCream/vue-localer)</div>

Internationalization plugin for Vue.

## Installation

Install `vue-localer` with your favorite package manager:

:::code-group

```sh [npm]
npm i vue-localer
```

```sh [Yarn]
yarn add vue-localer
```

```sh [pnpm]
pnpm i vue-localer
```

```sh [Bun]
bun add vue-localer
```

:::

## Usage

Used for global scope:

:::code-group

```ts [ESM]
import { createLocaler, useLocaler, useLocale } from 'vue-localer';
```

```ts [CJS]
const { createLocaler, useLocaler, useLocale } = require('vue-localer');
```

:::

Used for local scope:

:::code-group

```ts [ESM]
import { defineLocale } from 'vue-localer';
```

```ts [CJS]
const { defineLocale } = require('vue-localer');
```

:::

Used for component interpolation:

:::code-group

```ts [ESM]
import { Localer } from 'vue-localer';
```

```ts [CJS]
const { Localer } = require('vue-localer');
```

:::

## Getting Started

First, prepare the multilingual files.

```ts
// src/locales/en-US.ts
export default {
  hello: `Hello, {msg}!`,
};

// src/locales/ja-JP.ts
export default {
  hello: `こんにちは、{msg}!`,
};

// src/locales/ko-KR.ts
export default {
  hello: `안녕하세요, {msg}!`,
};
```

Instantiate `vue-localer` and load multiple language files.

```ts
// src/plugins/localer.ts
import { createLocaler } from 'vue-localer';

import enUS from '~/locales/en-US';

export default createLocaler({
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'ja-JP': () => import('~/locales/ja-JP'),
    'ko-KR': () => import('~/locales/ko-KR'),
  },
});
```

Register the instantiated `vue-localer` as app-level functionality to Vue.

```ts
// src/main.ts
import { createApp } from 'vue';

import localer from '~/plugins/localer'; // [!code ++]

import App from './App.vue';

const app = createApp(App);

app.use(localer); // [!code ++]

app.mount('#root');
```

Next, by using `useLocale`, you can obtain the source of the current locale.

```vue
<script lang="ts" setup>
import { useLocale } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <div>{{ $f(locale.hello, { msg: 'Vue' }) }}</div>
  <!-- Hello, Vue! -->
</template>
```

Besides that, you can also use type inference for `useLocale`.

```ts
// src/locales/index.ts
import { useLocale } from 'vue-localer';

import type enUS from './en-US';

export default () => useLocale<typeof enUS>();
```

```vue
<script lang="ts" setup>
import { useLocale } from 'vue-localer'; // [!code --]
import useGlobalLocale from '~/locales'; // [!code ++]

const locale = useLocale(); // [!code --]
const globalLocale = useGlobalLocale(); // [!code ++]
</script>

<template>
  <div>{{ $f(globalLocale.hello, { msg: 'Vue' }) }}</div>
  <!-- Hello, Vue! -->
</template>
```

It's worth noting that the name has been changed from `useLocale` to `useGlobalLocale` mainly to distinguish between local and global scopes.

As for the local scope, you can check it out [here](./local-scope.md).
