# Class and Style Bindings

## Binding HTML Classes

```vue
<div class="static" :class="{ active: isActive, 'text-danger': hasError }">Text</div>
```

```svelte
<div class="static" class:active={isActive} class:text-danger={hasError}>Text</div>
```

```tsx
<div class={clsx('static', { active: isActive, 'text-danger': hasError })}>Text</div>
```

## Binding Inline Styles

```vue
<div :style="{ color: dangerColor }">Text</div>
```

```svelte
<div style:color={dangerColor}>Text</div>
```

```tsx
<div style={{ color: dangerColor }}>Text</div>
```
