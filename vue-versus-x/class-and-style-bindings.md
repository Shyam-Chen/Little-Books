# Class and Style Bindings

## Binding HTML Classes

:::code-group

```vue [Vue]
<template>
  <div
    class="static"
    :class="{
      active: isActive,
      'text-danger': hasError,
    }"
  >
    Text
  </div>
</template>
```

```svelte [Svelte]
<div
  class="static"
  class:active={isActive}
  class:text-danger={hasError}
>
  Text
</div>
```

```tsx [React]
import clsx from 'clsx';

export function App() {
  return (
    <>
      <div
        class={clsx('static', {
          active: isActive,
          'text-danger': hasError,
        })}
      >
        Text
      </div>
    </>
  );
}
```

:::

## Binding Inline Styles

:::code-group

```vue [Vue]
<div :style="{ color: dangerColor }">Text</div>
```

```svelte [Svelte]
<div style:color={dangerColor}>Text</div>
```

```tsx [React]
<div style={{ color: dangerColor }}>Text</div>
```

:::
