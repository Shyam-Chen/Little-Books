## 國際化

用一個 Hello World 的案例來看 Angular 如何實現國際化。

```html
<!-- src/app/app.component.html -->
<h1>
  {{title}}
</h1>

<h2 i18n>Hello World</h2>
```

```bash
$ touch src/i18n/messages.xlf
$ touch src/i18n/messages.en.xlf
$ touch src/i18n/messages.zh.xlf
```

完成了國際化後，再來是讓專案也能本地化。

```ts
import { Component, LOCALE_ID } from '@angular/core';
```
