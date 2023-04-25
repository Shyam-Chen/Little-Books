# List Rendering

## `v-for`

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref } from 'vue';

const list = ref([{ text: 'Foo' }, { text: 'Bar' }]);
</script>

<template>
  <ul>
    <li v-for="(item, index) in list" :key="`list${index}`">
      {{ item.text }}
    </li>
  </ul>
</template>
```

```svelte [Svelte]
<script lang="ts">
  const list = [{ text: 'Foo' }, { text: 'Bar' }];
</script>

<ul>
  {#each list as item, index (`list${index}`)}
    <li>{item.text}</li>
  {/each}
</ul>
```

```tsx [React]
import { useSignal } from '@preact/signals';

export function App() {
  const list = useSignal([{ text: 'Foo' }, { text: 'Bar' }]);

  return (
    <ul>
      {list.value.map((item, index) => (
        <li key={`list${index}`}>{item.text}</li>
      ))}
    </ul>
  );
}
```

:::

## `v-for` with an Object

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref } from 'vue';

const deps = ref({
  vue: '3.2.47',
  svelte: '3.57.0',
  preact: '10.13.1',
});
</script>

<template>
  <ul>
    <li v-for="(value, key, index) in deps" :key="`deps${index}`">
      {{ index }}. {{ key }}: {{ value }}
    </li>
  </ul>
</template>
```

```svelte [Svelte]
<script lang="ts">
  const deps = {
    vue: '3.2.47',
    svelte: '3.57.0',
    preact: '10.13.1',
  };
</script>

<ul>
  {#each Object.entries(deps) as [key, value], index (`deps${index}`)}
    <li>{index}. {key}: v{value}</li>
  {/each}
</ul>
```

```tsx [React]
import { useSignal } from '@preact/signals';

export function App() {
  const deps = useSignal({
    vue: '3.2.47',
    svelte: '3.57.0',
    preact: '10.13.1',
  });

  return (
    <ul>
      {Object.entries(deps.value).map(([key, value], index) => (
        <li key={`deps${index}`}>
          {index}. {key}: v{value}
        </li>
      ))}
    </ul>
  );
}
```

:::

## `v-for` with a Range

:::code-group

```vue [Vue]
<template>
  <ul>
    <li v-for="(num, index) in 10" :key="index">{{ num }}</li>
  </ul>
</template>
```

```svelte [Svelte]
<ul>
  {#each Array(10) as empty, index (index)}
    <li>{index + 1}</li>
  {/each}
</ul>
```

```tsx [React]
export function App() {
  return (
    <ul>
      {[...Array(10)].map((empty, index) => (
        <li key={index}>{index + 1}</li>
      ))}
    </ul>
  );
}
```

:::
