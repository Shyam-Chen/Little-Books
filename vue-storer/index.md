# [Vue Storer](https://github.com/Vanilla-IceCream/vue-storer)

State management for Vue.

## Installation

Install `vue-storer` with your favorite package manager:

:::code-group

```sh [npm]
npm i vue-storer
```

```sh [Yarn]
yarn add vue-storer
```

```sh [pnpm]
pnpm i vue-storer
```

```sh [Bun]
bun add vue-storer
```

:::

## Usage

To use `vue-storer`, import the `defineStore` function:

:::code-group

```ts [ESM]
import { defineStore } from 'vue-storer';
```

```ts [CJS]
const { defineStore } = require('vue-storer');
```

:::

## Guide

`vue-storer` provides a `defineStore` function that allows you to define a store with `state`, `getters`, and `actions`. Here's an example:

```ts
import { reactive, readonly } from 'vue';
import { defineStore } from 'vue-storer';

export const useCounter = defineStore('counter', () => {
  const state = reactive({
    name: 'Counter',
    count: 0,
  });

  const getters = readonly({
    doubleCount: computed(() => state.count * 2),
  });

  const actions = readonly({
    increment() {
      state.count += 1;
    },
  });

  return { state, getters, actions };
});
```

In the example above, `defineStore` is called with a name (`counter`) and a factory function that returns an object with `state`, `getters`, and `actions`.

You can then use the store in a Vue component by calling `useCounter`:

```vue
<script lang="ts" setup>
import { useCounter } from './store';

const { state, getters, actions, $reset, $subscribe } = useCounter();

$subscribe((state) => {
  console.log(state.count);
});
</script>

<template>
  <p>Name: {{ state.name }}</p>
  <p>Count: {{ state.count }}</p>
  <p>Double Count: {{ getters.doubleCount }}</p>
  <button @click="actions.increment">Increment</button>
  <button @click="$reset">Reset</button>
</template>
```

In the example above, `useCounter` returns an object with `state`, `getters`, `actions`, `$reset`, and `$subscribe`. `state`, `getters`, and `actions` are the same as the object returned by the factory function. `$reset` is a function that resets the store's state to its initial state. `$subscribe` is a function that allows you to subscribe to changes in the store's state.

## Persisted State

If you need persistent data storage, it can be integrated with Web Storage.

```ts
import { reactive, readonly } from 'vue';
import { defineStore } from 'vue-storer';

export const useCounter = defineStore(
  'counter', // This will be the stored key.
  () => {
    /* ... */
    return { state, getters, actions };
  },
  sessionStorage, // You can also use `localStorage`. // [!code ++]
);
```
