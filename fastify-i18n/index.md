# [Fastify I18n](https://github.com/Vanilla-IceCream/fastify-i18n)

Internationalization plugin for Fastify. Built upon [`node-polyglot`](https://github.com/airbnb/polyglot.js).

## Installation

Install `fastify-i18n` with your favorite package manager:

:::code-group

```sh [npm]
npm i fastify-i18n
```

```sh [Yarn]
yarn add fastify-i18n
```

```sh [pnpm]
pnpm i fastify-i18n
```

```sh [Bun]
bun add fastify-i18n
```

:::

## Usage

:::code-group

```ts [ESM]
import i18n, { defineI18n, useI18n } from 'fastify-i18n';
```

```ts [CJS]
const { default: i18n, defineI18n, useI18n } = require('fastify-i18n');
```

:::

### Global Scope

```ts
import i18n from 'fastify-i18n';

fastify.register(i18n, {
  fallbackLocale: 'en',
  messages: {
    en: { text: 'Text' },
    ja: { text: 'テキスト' },
    ko: { text: '텍스트' },
    zh: { text: '文字' },
  },
});

/*
  curl --request GET \
    --url http://127.0.0.1:3000/api/i18n \
    --header 'accept-language: ja'
  */
fastify.get('/api/i18n', async (req, reply) => {
  return reply.send({ message: req.i18n.t('text') });
});
```

### Local Scope

```ts
import type { FastifyInstance } from 'fastify';
import { defineI18n, useI18n } from 'fastify-i18n';

export default async (app: FastifyInstance) => {
  defineI18n(app, {
    en: { hello: 'Hello, World!' },
    ja: { hello: 'こんにちは世界！' },
    ko: { hello: '안녕하세요, 월드입니다!' },
    zh: { hello: '你好，世界！' },
  });

  /*
  curl --request GET \
    --url http://127.0.0.1:3000/api/hello-world \
    --header 'accept-language: ja'
  */
  app.get('/hello-world', async (req, reply) => {
    const i18n = useI18n(req);

    return reply.send({
      // local scope
      hello: i18n.t('hello'),

      // global scope
      text: req.i18n.t('text'),
    });
  });
};
```

### Automatic Conversion

#### xx-XX to xx

```ts
fastify.register(i18n, {
  fallbackLocale: 'en',
  messages: {
    en: { text: 'Text' },
    ja: { text: 'テキスト' },
  },
});
```

```sh
$ curl --request GET \
       --url http://127.0.0.1:3000/api/i18n \
       --header 'Accept-Language: ja-JP'
# Output: { text: 'テキスト' } (ja)
```

#### xx to xx-XX

```ts
fastify.register(i18n, {
  fallbackLocale: 'en',
  messages: {
    'en-US': { text: 'Text' },
    'ja-JP': { text: 'テキスト' },
  },
});
```

```sh
$ curl --request GET \
       --url http://127.0.0.1:3000/api/i18n \
       --header 'Accept-Language: ja'
# Output: { text: 'テキスト' } (ja-JP)
```

#### Priority

```ts
fastify.register(i18n, {
  fallbackLocale: 'en',
  messages: {
    'en-US': { text: 'Text' },
    'zh-CN': { text: '文本' },
    'zh-TW': { text: '文字' },
  },
});
```

```sh
$ curl --request GET \
       --url http://127.0.0.1:3000/api/i18n \
       --header 'Accept-Language: zh'
# Output: { text: '文本' } (zh-CN)
```

```ts
fastify.register(i18n, {
  fallbackLocale: 'en',
  messages: {
    'en-US': { text: 'Text' },
    'zh-TW': { text: '文字' },
    'zh-CN': { text: '文本' },
  },
});
```

```sh
$ curl --request GET \
       --url http://127.0.0.1:3000/api/i18n \
       --header 'Accept-Language: zh'
# Output: { text: '文字' } (zh-TW)
```
