# Recursive Components

ListItem:

:::code-group

```vue [Vue]
<script lang="ts" setup>
type Item = { name: string; sub?: Item[] };

defineProps<{
  item?: Item;
}>();
</script>

<template>
  <li v-if="item?.sub?.length">
    {{ item.name }}

    <ul>
      <ListItem v-for="(subItem, subIndex) in item.sub" :key="subIndex" :item="subItem" />
    </ul>
  </li>

  <li v-else>{{ item?.name }}</li>
</template>
```

```svelte [Svelte]
<script lang="ts">
  type Item = { name: string; sub?: Item[] };

  export let item: Item;
</script>

{#if item?.sub?.length}
  <li>
    {item.name}

    <ul>
      {#each item.sub as subItem, subIndex (subIndex)}
        <svelte:self item={subItem} />
      {/each}
    </ul>
  </li>
{:else}
  <li>{item.name}</li>
{/if}
```

```tsx [React]
type Item = { name: string; sub?: Item[] };

interface Props {
  item?: Item;
}

export function ListItem(props: Props) {
  const { item } = props;

  if (item?.sub?.length) {
    return (
      <li>
        {item.name}

        <ul>
          {item.sub.map((subItem, subIndex) => (
            <ListItem key={subIndex} item={subItem} />
          ))}
        </ul>
      </li>
    );
  }

  return <li>{item.name}</li>;
}
```

:::

Usage:

:::code-group

```vue [Vue]
<script lang="ts" setup>
import ListItem from '~/components/ListItem.vue';

const list = [
  { name: 'A' },
  { name: 'B', sub: [{ name: 'B-1' }] },
  { name: 'C', sub: [{ name: 'C-1', sub: [{ name: 'C-1-1' }] }] },
];
</script>

<template>
  <ul>
    <ListItem v-for="(item, index) in list" :key="index" :item="item" />
  </ul>
</template>
```

```svelte [Svelte]
<script lang="ts">
  import ListItem from '$lib/components/ListItem.svelte';

  const list = [
    { name: 'A' },
    { name: 'B', sub: [{ name: 'B-1' }] },
    { name: 'C', sub: [{ name: 'C-1', sub: [{ name: 'C-1-1' }] }] },
  ];
</script>

<ul>
  {#each list as item, index (index)}
    <ListItem {item} />
  {/each}
</ul>
```

```tsx [React]
import { ListItem } from '~/components/ListItem';

export function App() {
  const list = [
    { name: 'A' },
    { name: 'B', sub: [{ name: 'B-1' }] },
    { name: 'C', sub: [{ name: 'C-1', sub: [{ name: 'C-1-1' }] }] },
  ];

  return (
    <ul>
      {list.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </ul>
  );
}
```

:::
