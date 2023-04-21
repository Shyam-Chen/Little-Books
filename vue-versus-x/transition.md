# Transition

:::code-group

```vue [Vue]
<script lang="ts" setup>
import { ref } from 'vue';

const show = ref(false);
</script>

<template>
  <button @click="show = !show">Toggle</button>

  <Transition name="fade">
    <p v-if="show">Hello</p>
  </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

```svelte [Svelte]
<script lang="ts">
  import { fade } from 'svelte/transition';

  let show = false;
</script>

<button on:click={() => show = !show}>Toggle</button>

{#if show}
  <p transition:fade={{ duration: 500 }}>Hello</p>
{/if}
```

```tsx [React]
import { useRef } from 'react';
import { useSignal } from '@preact/signals';
import { Transition } from 'react-transition-group';

const defaultStyle = {
  transition: 'opacity 0.5s ease',
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export function App() {
  const nodeRef = useRef();
  const show = useSignal(false);

  return (
    <div>
      <button onClick={() => (show.value = !show.value)}>Toggle</button>

      <Transition nodeRef={nodeRef} in={show.value}>
        {(state) => (
          <p ref={nodeRef} style={{ ...defaultStyle, ...transitionStyles[state] }}>
            Hello
          </p>
        )}
      </Transition>
    </div>
  );
}
```

:::
