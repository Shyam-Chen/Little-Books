# Vue QRCode Image

A Vue component for QR code generation.

## Installation

Install `vue-qrcode-image` with your favorite package manager:

:::code-group

```sh [npm]
npm i vue-qrcode-image
```

```sh [Yarn]
yarn add vue-qrcode-image
```

```sh [pnpm]
pnpm i vue-qrcode-image
```

```sh [Bun]
bun add vue-qrcode-image
```

:::

## Usage

### Basic

```vue
<script lang="ts" setup>
import { ref } from 'vue';
import QrcodeImage from 'vue-qrcode-image';

const qrcode = ref('https://www.npmjs.com/search?q=vue-qrcode-image');
</script>

<template>
  <QrcodeImage :value="qrcode" />
</template>
```

### Size

```html
<QrcodeImage :value="qrcode" :size="4" />
```
