# Locale Changing

```vue
<script lang="ts" setup>
import { useLocaler } from 'vue-localer';

const localer = useLocaler();
</script>

<template>
  <label for="languages">Language:</label>

  <select id="languages" v-model="localer.lang.value" name="languages">
    <option value="en-US">en-US</option>
    <option value="ja-JP">ja-JP</option>
    <option value="ko-KR">ko-KR (lazy)</option>
    <option value="zh-TW">zh-TW (undefined)</option>
  </select>

  <div>Current Language: {{ localer.lang.value }}</div>
  <div>Available Locales: {{ localer.langs.value }}</div>
</template>
```
