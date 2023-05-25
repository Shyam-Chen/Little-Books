# Fallbacking

`fallbackLocale: '<lang>'` to choose which language to use when your preferred language lacks a translation.

## Explicit Fallback

```vue
<!-- src/App.vue -->
<script lang="ts" setup>
import { watch } from 'vue';
import { useLocaler } from 'vue-localer';
import { useNavigatorLanguage } from '@vueuse/core';

const { lang, langs } = useLocaler();
const { language } = useNavigatorLanguage();

watch(
  language,
  (val) => {
    if (val) {
      const _language = localStorage.getItem('language');

      if (_language) {
        lang.value = _language;
        return;
      }

      // Select the closest language from the available language list as the current language.
      const found = langs.value.find((item) => item.startsWith(val) || val.startsWith(item));

      if (found) {
        lang.value = found;
        return;
      }
    }
  },
  { immediate: true },
);
</script>
```
