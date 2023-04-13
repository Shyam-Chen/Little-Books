# [Vue Localer](https://github.com/Vanilla-IceCream/vue-localer)

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

:::code-group

```ts [ESM]
import { createLocaler, useLocaler, useLocale, defineLocale, Localer } from 'vue-localer';
```

```ts [CJS]
const { createLocaler, useLocaler, useLocale, defineLocale, Localer } = require('vue-localer');
```

:::

```ts
// src/plugins/localer.ts
import { createLocaler } from 'vue-localer';

import enUS from '~/locales/en-US';
import jaJP from '~/locales/ja-JP';

export default createLocaler({
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'ja-JP': jaJP,
    'ko-KR': () => import('~/locales/ko-KR'),
  },
});
```

```ts
// src/main.ts
import { createApp } from 'vue';

import router from '~/plugins/router';
import localer from '~/plugins/localer';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(localer);

app.mount('#root');
```
