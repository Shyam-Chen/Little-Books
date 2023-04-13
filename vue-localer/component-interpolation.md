# Component Interpolation

Messages:

```ts
// en-US.ts
export default {
  term: `I have read and agree to the {licenseAgreement}.`,
  licenseAgreement: 'License Agreement',
};

// ja-JP.ts
export default {
  term: `{licenseAgreement}を読み、同意します。`,
  licenseAgreement: 'ライセンス契約',
};
```

Template:

```vue
<script setup>
import { useLocale, Localer } from 'vue-localer';

const locale = useLocale();
</script>

<template>
  <Localer :message="locale.term">
    <template #licenseAgreement>
      <a href="https://...">{{ locale.licenseAgreement }}</a>
    </template>
  </Localer>
</template>
```

Output:

```html
<!-- en-US -->
<span>I have read and agree to the </span>
<span><a href="https://...">License Agreement</a></span>
<span>.</span>

<!-- ja-JP -->
<span><a href="https://...">ライセンス契約</a></span>
<span>を読み、同意します。</span>
```
