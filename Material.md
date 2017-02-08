# Material

### 練習來源
* https://github.com/material-components/material-components-web

### 實作執行
* https://github.com/Shyam-Chen/Web-Starter-Kit

***

### 目錄
* [Themes (主題)](#主題)
* [Buttons (按鈕)](#按鈕)
* [Cards (卡片)](#卡片)
* [Elevations (白框)](#白框)
* [FAB (懸浮操作按鈕)](#懸浮操作按鈕)
* [List (列表)](#列表)
* [Radio (單選鈕)](#單選鈕)
* [Textfield (文字輸入框)](#文字輸入框)

***

## 主題

自訂主體的樣式。

```css
:root {
  --mdc-theme-primary: #9C27B0;  /* Purple - 500 */
  --mdc-theme-accent: #009688;  /* Teal - 500 */
}
```

## 按鈕

`mdc-button`

`mdc-button--raised`

`mdc-button--dense`

`mdc-button--compact`

`mdc-button--primary`

`mdc-button--accent`

```html
<button class="mdc-button mdc-button--primary mdc-ripple-surface" data-mdc-auto-init="MDCRipple">Button</button>

<button class="mdc-button mdc-button--raised mdc-button--primary mdc-ripple-surface" data-mdc-auto-init="MDCRipple">Button</button>

<button class="mdc-button mdc-button--accent mdc-ripple-surface" data-mdc-auto-init="MDCRipple">Button</button>

<button class="mdc-button mdc-button--raised mdc-button--accent mdc-ripple-surface" data-mdc-auto-init="MDCRipple">Button</button>
```

```css
.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--primary::before,
.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--primary::after {
  background-color: rgba(74, 20, 140, .2);  /* 900 */
}

.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--raised.mdc-button--primary::before,
.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--raised.mdc-button--primary::after {
  background-color: rgba(243, 229, 245, .2);  /* 50 */
}

.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--accent::before,
.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--accent::after {
  background-color: rgba(0, 77, 64, .2);  /* 900 */
}

.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--raised.mdc-button--accent::before,
.mdc-ripple-surface.mdc-ripple-upgraded.mdc-button--raised.mdc-button--accent::after {
  background-color: rgba(224, 242, 241, .2);  /* 50 */
}
```

## 卡片

```html
<div class="mdc-card">
  <section class="mdc-card__primary">
    <h1 class="mdc-card__title">Title</h1>
    <h2 class="mdc-card__subtitle">Subhead</h2>
  </section>
  <section class="mdc-card__supporting-text">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
  </section>
  <section class="mdc-card__actions">
    <button class="mdc-button mdc-button--compact mdc-button--accent mdc-ripple-surface mdc-card__action" data-mdc-auto-init="MDCRipple">Action 1</button>
    <button class="mdc-button mdc-button--compact mdc-button--accent mdc-ripple-surface mdc-card__action" data-mdc-auto-init="MDCRipple">Action 2</button>
  </section>
</div>
```

## 白框

```html
<figure class="mdc-elevation--z1" style="padding: .5rem">
  <figcaption>1dp (<code>mdc-elevation--z1</code>)</figcaption>
</figure>

<figure class="mdc-elevation--z2" style="padding: .5rem">
  <figcaption>2dp (<code>mdc-elevation--z2</code>)</figcaption>
</figure>

<!-- z3 ~ z23 -->>

<figure class="mdc-elevation--z24" style="padding: .5rem">
  <figcaption>24dp (<code>mdc-elevation--z24</code>)</figcaption>
</figure>
```

## 懸浮操作按鈕

```html
<button class="mdc-fab material-icons mdc-ripple-surface" data-mdc-auto-init="MDCRipple" aria-label="Favorite">
  <span class="mdc-fab__icon">favorite_border</span>
</button>
```

## 列表

```html
<ul class="mdc-list mdc-list--dense mdc-list--avatar-list mdc-elevation--z2">
  <li class="mdc-list-item">
    <span class="mdc-list-item__start-detail"></span> Single-line item
  </li>
  <li class="mdc-list-item">
    <span class="mdc-list-item__start-detail"></span> Single-line item
  </li>
  <li class="mdc-list-item">
    <span class="mdc-list-item__start-detail"></span> Single-line item
  </li>
</ul>
```

## 單選鈕

```html
<div class="mdc-form-field">
  <div class="mdc-radio">
    <input class="mdc-radio__native-control" type="radio" id="ex2-radio1" checked name="ex2">
    <div class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
  </div>
  <label id="ex2-radio1-label" for="ex2-radio1">Radio 1</label>
</div>
<div class="mdc-form-field">
  <div class="mdc-radio">
    <input class="mdc-radio__native-control" type="radio" id="ex2-radio2" name="ex2">
    <div class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
  </div>
  <label id="ex2-radio2-label" for="ex2-radio2">Radio 2</label>
</div>
```

```js
[].forEach.call(
  document.querySelectorAll('.mdc-radio:not([data-demo-no-js])'),
  (radio) => window.mdc.radio.MDCRadio.attachTo(radio)
);

window.mdc.autoInit();
```

## 文字輸入框

```html
<div class="mdc-textfield">
  <input type="text" class="mdc-textfield__input" id="my-textfield" aria-controls="my-textfield-helptext" data-demo-no-auto-js>
  <label for="my-textfield" class="mdc-textfield__label">Label text</label>
</div>
```

```js
[].forEach.call(
  document.querySelectorAll('.mdc-textfield:not([data-demo-no-auto-js])'),
  (textfield) => window.mdc.textfield.MDCTextfield.attachTo(textfield)
);

window.mdc.autoInit();
```
