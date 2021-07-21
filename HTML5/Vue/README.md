# Vue

Vue is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.

---

### Table of Contents

- Introduction

#### Part 1

- Components
- Directives
- [Dependency Injection](./Dependency-Injection.md)
- Transitions and Animation
- [Routing and Navigation](./Routing-and-Navigation.md)

#### Part 2

- Components
- State Management
- Internationalization
- Testing

---

## Introduction

```sh
$ yarn create vite <APP_NAME> --template vue
```

## Components

text

```vue
<!-- HelloWorld.vue -->
<script setup>
const helloWorld = 'Hello, World!';
</script>

<template>
  <div>{{ helloWorld }}</div>
  <!-- Hello, World! -->
</template>
```

html

```vue
<!-- HelloWorld.vue -->
<script setup>
const helloWorld = `Hello, <strong>World!</strong>`;
</script>

<template>
  <div v-html="helloWorld"></div>
</template>
```

attributes

```vue
<script setup>
import logo from '~/assets/logo.png';
</script>

<template>
  <img :src="logo" alt="Logo" />
</template>
```

styling

```vue
<template>
  <div class="blue-text">Blue Text</div>
</template>

<style scoped>
.blue-text {
  color: blue;
}
</style>
```

Reactivity

**Refs**

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);
count.value += 1;
</script>

<template>
  <div>{{ count }}</div>
  <!-- 1 -->
</template>
```

**Reactives**

```vue
<script setup>
import { reactive } from 'vue';

const state = reactive({ count: 0 });
state.count += 1;
</script>

<template>
  <div>{{ state.count }}</div>
  <!-- 1 -->
</template>
```

**computed**

```vue
<script setup>
import { ref, computed } from 'vue';

const num = ref(1);
const evenOrOdd = computed(() => (num.value % 2 === 0 ? 'Even' : 'Odd'));
</script>

<template>
  <div>{{ evenOrOdd }}</div>
  <!-- Odd -->
</template>
```

**Watcher**

data - `watch`

```vue
<script setup>
import { reactive, watch } from 'vue';

const state = reactive({ name: '' });

watch(
  () => state.name,
  (val, prevVal) => {
    console.log(val, prevVal);
  },
);
</script>

<template>
  <input v-model="state.name" type="text" />
  <div>{{ state.name }}</div>
</template>
```

```vue
<script setup>
import { reactive, watch } from 'vue';

const state = reactive({ database: { model: 'Document', engine: 'MongoDB' } });

watch(
  () => state.database,
  (val) => {
    if (val.engine === 'PostgreSQL') {
      state.database.model = 'Relational';
    }
  },
  { deep: true },
);

const switchToPostgres = () => {
  state.database.engine = 'PostgreSQL';
};
</script>

<template>
  <div>{{ state.database.model }}</div>
  <div>{{ state.database.engine }}</div>
  <button @click="switchToPostgres">Switch to PostgreSQL</button>
</template>
```

_For-Part-2_

dependencies - `watchEffect`

```vue
<script setup>
const stop = watchEffect((onInvalidate) => {
  // ...

  onInvalidate(() => {
    // ...
  });
});

const onStop = () => {
  stop();
};
</script>

<template>
  <div></div>
  <button @click="onStop">Stop</button>
</template>
```

**Readonly Proxies**

```vue
<script setup>
import { reactive, readonly } from 'vue';

const original = reactive({ val: 0 });
const copy = readonly(original);
</script>
```

`if`...`else`

```vue
<script setup>
import { ref } from 'vue';

const isRendering = ref(true);
</script>

<template>
  <div v-if="isRendering">Rendered</div>
  <div v-else>Not Rendered</div>
</template>
```

`for`

```vue
<script setup>
import { ref } from 'vue';

const list = ref(['foo', 'bar', 'baz']);
</script>

<template>
  <ul>
    <li v-for="item in list">{{ item }}</li>
  </ul>
</template>
```

template refs

```vue
<script setup>
import { ref, onMounted } from 'vue';

const input = ref(null);

onMounted(() => {
  input.value.focus();
});
</script>

<template>
  <input ref="input" />
</template>
```

## Component Communication

**Props**

```vue
<!-- Hello.vue -->
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  msg: String,
});
</script>

<template>
  <div>Hello, {{ props.msg }}!</div>
</template>
```

```vue
<script setup>
import Hello from './Hello.vue';
</script>

<template>
  <Hello msg="Vue" />
  <!-- Hello, Vue! -->
</template>
```

_For-Part-2_

`mergeProps`

```vue
<script setup>
import { mergeProps } from 'vue';

const props = mergeProps();
</script>
```

**Emits**

```vue
<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits({
  foo: null,
});
</script>
```

## Lifecycle Hooks

```vue
<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
} from 'vue';
</script>
```

## Async Components

```js
import { defineAsyncComponent } from 'vue';
```

Suspense

```html
<Suspense>
  <template #default> </template>

  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

Top level `await`

```vue
<script setup>
const data = await fetch(`/api/data`).then((res) => res.json());
</script>
```

**`nextTick`**

```vue
<script setup>
import { reactive, onMounted, nextTick } from 'vue';

const state = reactive({ msg: 'Hello!' });

onMounted(async () => {
  state.msg = 'Goodbye!';
  await nextTick();
});
</script>
```

## `v-model`

Basic usage

```vue
<script setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <input v-model="value" />
  <span>{{ value }}</span>
</template>
```

Use on custom components

```vue
<!-- CustomInput.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);

const onInput = (event) => {
  emits('update:modelValue', event.target.value);
};
</script>

<template>
  <div>
    <input :value="props.modelValue" @input="onInput" />
    <div>{{ props.modelValue }}</div>
  </div>
</template>
```

```vue
<script setup>
import { ref } from 'vue';

import CustomInput from './CustomInput.vue';

const myValue = ref('');
</script>

<template>
  <CustomInput v-model="myValue" />
  <!-- would be shorthand for: -->
  <CustomInput :modelValue="myValue" @update:modelValue="myValue = $event" />
</template>
```

Arguments

```vue
<!-- CustomInput.vue -->
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['foo']);
const emits = defineEmits(['update:foo']);

const onInput = (event) => {
  emits('update:foo', event.target.value);
};
</script>

<template>
  <div>
    <input :value="props.foo" @input="onInput" />
    <div>{{ props.foo }}</div>
  </div>
</template>
```

```vue
<script setup>
import { ref } from 'vue';

import CustomInput from './CustomInput.vue';

const myFoo = ref('');
</script>

<template>
  <CustomInput v-model:foo="myFoo" />
  <!-- would be shorthand for: -->
  <CustomInput :foo="myFoo" @update:foo="myFoo = $event" />
</template>
```

Multiple bindings

```vue

```

Modifiers

```vue

```

## Custom Directives

```js
// foo-bar.js
export default {
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
};
```

```vue
<script setup>
import fooBar from './foo-bar';
</script>

<template>
  <div v-foo-bar />
</template>
```
