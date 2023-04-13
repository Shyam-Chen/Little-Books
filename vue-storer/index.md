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

:::code-group

```ts [ESM]
import { defineStore } from 'vue-storer';
```

```ts [CJS]
const { defineStore } = require('vue-storer');
```

:::

## Guide

### Setup Stores

Defines reactive properties and methods and returns an object

```ts
import { ref, computed } from 'vue';
import { defineStore } from 'vue-storer';

export const useCounter = defineStore('counter', () => {
  const name = ref('Counter');
  const count = ref(0);

  const doubleCount = computed(() => count.value * 2);

  function increment() {
    count.value += 1;
  }

  return { name, count, doubleCount, increment };
});
```

```vue
<script lang="ts" setup>
import { useCounter } from './store';

const counter = useCounter();

counter.$subscribe((state) => {
  console.log(state.count.value);
});
</script>

<template>
  <p>Name: {{ counter.name.value }}</p>
  <p>Count: {{ counter.count.value }}</p>
  <p>Double Count: {{ counter.doubleCount.value }}</p>
  <button @click="counter.increment">Increment</button>
  <button @click="counter.$reset">Reset</button>
</template>
```

### Option Stores

Options object with `state`, `actions`, and `getters` properties

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
