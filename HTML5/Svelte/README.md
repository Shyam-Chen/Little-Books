# Svelte

---

### Table of Contents

- Stores

---

```html
<script>
  const msg = 'Message';
  const text = '<span>Text</span>';
</script>

<div>{msg}</div>
<div>{@html text}</div>
```

```html
<script>
  function clickMe() {}
</script>

<button on:click={clickMe}>Click Me</button>
<button on:click|once={clickMe}>Click Me (Once)</button>
```

```html
<script>
  let count = 1;
  $: doubled = count * 2;
</script>

<div>{count} * 2 = {doubled}</div>
```

```html
<script>
	let text = '';
</script>

<input bind:value={name}>
```

```html
<!-- runs once -->
<script context="module">
  export function foo() {}
</script>
```

**Props**

```html
<!-- Message.svelte -->
<script>
  export let message = 'Svelte';
</script>

<div>{message}</div>
```

```html
<script>
  import Message from './Message';
</script>

<Message message="Hello, World!" />
```

**Component Events**

```html
<!-- Message.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function onMessage() {
    dispatch('message', { data: 'Hello, World!' });
  }
</script>

<button on:click="{onMessage}">Click Me</button>
```

```html
<script>
  import Message from './Message';

  function onMessage(event) {
    console.log(event.detail.data);
  }
</script>

<Message on:message="{onMessage}" />
```

## Stores

```js
// src/mods/foo/stores.js
import { writable } from 'svelte/store';
```

```js
// src/mods/foo/Foo.svelte
```
