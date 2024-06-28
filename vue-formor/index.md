# [vue-formor](https://github.com/Vanilla-IceCream/vue-formor)

Form validation for Vue in composition functions with Valibot.

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

::: tip
Don't forget to install `valibot`.

:::code-group

```sh [npm]
npm i valibot
```

```sh [Yarn]
yarn add valibot
```

```sh [pnpm]
pnpm i valibot
```

```sh [Bun]
bun add valibot
```

:::
<!-- ::: -->

## Usage

```ts
import { useSchema } from 'vue-formor';
import * as v from 'valibot';
```

::: warning
If you need to use `valibot` v0.30 or lower, please install `vue-formor` v4.x instead.
:::

::: danger
For front-end development, it is best to use libraries that support tree shaking and modularization.
It is recommended to use `valibot`. No longer recommend using `zod` and `yup`.

The functions `useValibotSchema`, `useZodSchema`, and `useYupSchema` will be removed in v6.
Additionally, please use `useSchema` instead of `useValibotSchema`.
:::
