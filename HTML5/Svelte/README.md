# Svelte

---

### Table of Contents

- Stores

---

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
