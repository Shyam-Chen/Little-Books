# Conditional Rendering

:::code-group

```vue [Vue]
<template>
  <p v-if="answer === 42">what was the question?</p>

  <p v-if="porridge.temperature > 100">too hot!</p>
  <p v-else-if="80 > porridge.temperature">too cold!</p>
  <p v-else>just right!</p>
</template>
```

```svelte [Svelte]
{#if answer === 42}
  <p>what was the question?</p>
{/if}

{#if porridge.temperature > 100}
  <p>too hot!</p>
{:else if 80 > porridge.temperature}
  <p>too cold!</p>
{:else}
  <p>just right!</p>
{/if}
```

```tsx [React]
export function App() {
  return (
    <>
      {answer === 42 && <p>what was the question?</p>}

      {porridge.temperature > 100 ? (
        <p>too hot!</p>
      ) : 80 > porridge.temperature ? (
        <p>too cold!</p>
      ) : (
        <p>just right!</p>
      )}
    </>
  );
}
```

:::
