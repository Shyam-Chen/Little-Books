# Locale Outside

If you need to get the current locale from Components or Composables, you can do it as follows:

```ts
import localer from '~/plugins/localer';

/**
 * Equivalent to usage under Components or Composables:
 * import { useLocale } from 'vue-localer';
 * const locale = useLocale();
 */
localer.currentLocale.value;
```
