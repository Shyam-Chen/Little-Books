# [vue-formor v4.x](https://github.com/Vanilla-IceCream/vue-formor/tree/v4.x)

Form validation for Vue in composition functions with Valibot or Zod or Yup.

## Installation

Install `vue-formor` with your favorite package manager:

:::code-group

```sh [npm]
npm i vue-formor@4.1.1
```

```sh [Yarn]
yarn add vue-formor@4.1.1
```

```sh [pnpm]
pnpm i vue-formor@4.1.1
```

```sh [Bun]
bun add vue-formor@4.1.1
```

:::

## Usage

:::code-group

```ts [ESM]
import { useValibotSchema, useZodSchema, useYupSchema } from 'vue-formor';
```

```ts [CJS]
const { useValibotSchema, useZodSchema, useYupSchema } = require('vue-formor');
```

:::

::: tip
If you intend to use `useValibotSchema`, don't forget to install `valibot`.
:::

::: warning
If you need to use `valibot` v0.31 or later, please install `vue-formor` v5.x instead.
:::

::: tip
If you intend to use `useZodSchema`, don't forget to install `zod`.
:::

::: tip
If you intend to use `useYupSchema`, don't forget to install `yup`.
:::
