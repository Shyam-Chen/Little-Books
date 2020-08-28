# Vue

Vue is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.

---

### Table of Contents

---

## Reactivity

**Refs**

```vue
<template>
  <div>{{ val }}</div>
</template>

<script setup>
import { ref } from 'vue';

export const val = 0;

export default {};
</script>
```

**Reactives**

```vue
<script setup>
import { reactive } from 'vue';

export const state = reactive({ val: 0 });

export default {};
</script>
```

**computed**

```vue
<template>
  <div>{{ evenOrOdd }}</div>
</template>

<script setup>
import { ref, computed } from 'vue';

export const num = ref(1);
export const evenOrOdd = computed(() => (num.value % 2 === 0 ? 'Even' : 'Odd'));

export default {};
</script>
```

**Readonly Proxies**

```vue
<script setup>
import { reactive, readonly } from 'vue';

export const original = reactive({ val: 0 });
export const copy = readonly(original);

export default {};
</script>
```

**Props**

```vue
<script setup>
export default {
  props: {
    list: { type: [String], default: () => [] },
  },
};
</script>
```

**Emits**

```vue
<script setup>
export default {
  emits: {
    toggle: null,
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
  },
};
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

export default {};
</script>
```

## Dependency Injection

```vue
<!-- Foo.vue -->
<template>
  <Bar />
</template>

<script setup>
import { InjectionKey, provide, inject } from 'vue';

import Bar from './Bar';

export default {
  components: {
    Bar,
  },
};
</script>
```

```vue
<!-- Bar.vue -->
<template>
</template>

<script setup>
</script>
```
