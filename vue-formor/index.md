# [vue-formor](https://github.com/Vanilla-IceCream/vue-formor)

Form validation for Vue in composition functions with Valibot or Zod or Yup.

## Installation

Install `vue-formor` with your favorite package manager:

:::code-group

```sh [npm]
npm i vue-formor
```

```sh [Yarn]
yarn add vue-formor
```

```sh [pnpm]
pnpm i vue-formor
```

```sh [Bun]
bun add vue-formor
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

::: tip
If you intend to use `useZodSchema`, don't forget to install `zod`.
:::

::: tip
If you intend to use `useYupSchema`, don't forget to install `yup`.
:::
