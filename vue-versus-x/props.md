# Props

## Props Declaration

:::code-group

```vue [Vue]
<script lang="ts" setup>
withDefaults(
  defineProps<{
    answer?: number;
  }>(),
  {
    answer: 0,
  },
);
</script>

<template>
  <p>The answer is {{ answer }}</p>
</template>
```

```vue [Vue (computed)]
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  answer?: number;
}>();

const answerRef = computed(() => props.answer || 0);
</script>

<template>
  <p>The answer is {{ answerRef }}</p>
</template>
```

```vue [Vue (toRef)]
<script lang="ts" setup>
import { toRef } from 'vue';

const props = defineProps<{
  answer?: number;
}>();

const answerRef = toRef(props, 'answer', 0);
</script>

<template>
  <p>The answer is {{ answerRef }}</p>
</template>
```

```svelte [Svelte]
<script lang="ts">
  export let answer = 0;
</script>

<p>The answer is {answer}</p>
```

```tsx [React]
interface Props {
  answer?: number;
}

export function Nested({ answer = 0 }: Props) {
  return (
    <>
      <p>The answer is {answer}</p>
    </>
  );
}
```

:::

## Prop Passing Details

Info:

:::code-group

```vue [Vue]
<script lang="ts" setup>
defineProps<{
  name?: string;
  version?: string;
}>();
</script>

<template>
  <p>{{ name }}: v{{ version }}</p>
</template>
```

```svelte [Svelte]
<script lang="ts">
  export let name = '';
  export let version = '';
</script>

<p>{name}: v{version}</p>
```

```tsx [React]
interface Props {
  name?: string;
  version?: string;
}

export function Info({ name, version }: Props) {
  return (
    <>
      <p>
        {name}: v{version}
      </p>
    </>
  );
}
```

:::

Usage:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref } from 'vue';

import Info from '~/components/Info.vue';

const pkg = ref({ name: 'vite', version: '4' });
</script>

<template>
  <Info v-bind="pkg" />
</template>
```

```svelte [Svelte]
<script lang="ts">
  import Info from '$lib/components/Info.svelte';

  const pkg = { name: 'vite', version: '4' };
</script>

<Info {...pkg} />
```

```tsx [React]
import { useSignal } from '@preact/signals';

import { Info } from '~/components/Info';

export function App() {
  const pkg = useSignal({ name: 'vite', version: '4' });

  return (
    <>
      <Info {...pkg.value} />
    </>
  );
}
```

:::
