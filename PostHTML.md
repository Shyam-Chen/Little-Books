# PostHTML

### 目錄
* [BEM (Block Element Modifier)](#bem)
* [Inline Assets](#inline-assets)
* [Include](#include)
* [Mixins](#mixins)
* [Extend](#extend)
* [Expressions](#expressions)
* [Minifier](#minifier)

***

## BEM

`posthtml-bem`

```js
import bem from 'posthtml-bem';

bem({ elemPrefix: '__', modPrefix: '--', modDlmtr: '-' });
```

```html
<div block="card" mods="theme:light">
  <div elem="title" mods="size:big">March Hare</div>
  <div elem="content">March Hare</div>
</div>
```

```scss
.card {  // block
  ...
  &__title {  // elem
    ...
    &--size {  // mods
      ...
      &-big { ... }
      &-small { ... }
    }
  }
  &__content { ... }  // elem
  &--theme {  // mods
    ...
    &-dark { ... }
    &-light { ... }
  }
}
```

## Inline Assets

`posthtml-inline-assets`

```js
import inlineAssets from 'posthtml-inline-assets';

inlineAssets({ from: ASSETS_ROOT });
```

## Include

`posthtml-include`

```js
import include from 'posthtml-include';

include();
```

```html
<!-- foo.html -->
<p>Foo</p>
<include src="bar.html"></include>
```

```html
<!-- bar.html -->
<p>Bar</p>
```

## Mixins

`posthtml-mixins`

```js
import mixins from 'posthtml-mixins';

mixins();
```

```html
<!-- 宣告 -->
<mixin name="ex">
  <div class="thing">Thing</div>
</mixin>

<!-- 使用 -->
<div>
  <mixin name="ex"></mixin>
</div>

<div>
  <mixin name="ex"></mixin>
</div>
```

## Extend

`posthtml-extend`

```js
import extend from 'posthtml-extend';

extend();
```

## Expressions

`posthtml-expressions`

```js
import expressions from 'posthtml-expressions';

expressions();
```

## Minifier

`posthtml-minifier`

```js
import minifier from 'posthtml-minifier';

minifier({ collapseWhitespace: true, removeAttributeQuotes: true, removeComments: true });
```
