# Material

### Reference Resources (參考資源)

* https://github.com/material-components/material-components-web
* https://material-components-web.appspot.com/

### Actual Operation (實作執行)

* https://github.com/Shyam-Chen/Frontend-Starter-Kit

***

### Table of Contents (目錄)

* [Buttons (按鈕)](#buttons-按鈕)
* [Cards (卡片)](#cards-卡片)
* [Checkbox (複選框)](#複選框)
* [Dialog (對話框)](#對話框)
* [Drawer (側邊欄)](#側邊欄)
* [Elevation (白框)](#白框)
* [FAB (懸浮操作按鈕)](#懸浮操作按鈕)
* Grid List (網格列表)
* Icon Toggle (圖標按鈕)
* Layout Grid (版面網格)
* [Linear Progress (線性進度條)](#線性進度條)
* [List (列表)](#列表)
* Menu (選單)
* [Radio (單選框)](#單選框)
* Select (選擇框)
* Slider (滑動條)
* [Snackbar (小橫條)](#小橫條)
* Switch (切換鈕)
* Tabs (選項卡)
* [Text Field (文字輸入框)](#文字輸入框)
* [Theme (主題)](#主題)
* Toolbar (工具列)
* [Typography (文字排版學)](#文字排版學)

***

## Buttons (按鈕)

Basic (基本): `mdc-button`

墊高: `mdc-button--raised`

大小: `mdc-button--dense` or `mdc-button--compact`

顏色: `mdc-button--primary` or `mdc-button--accent`

```js
import '@material/button/dist/mdc.button.css';
```

```html
<button class="mdc-button mdc-button--primary">Button</button>
<button class="mdc-button mdc-button--raised mdc-button--primary">Button</button>
<button class="mdc-button mdc-button--accent">Button</button>
<button class="mdc-button mdc-button--raised mdc-button--accent">Button</button>
<button class="mdc-button mdc-button--dense mdc-button--primary">Button</button>
<button class="mdc-button mdc-button--compact mdc-button--primary">Button</button>
<button class="mdc-button mdc-button--dense mdc-button--accent">Button</button>
<button class="mdc-button mdc-button--compact mdc-button--accent">Button</button>
<button class="mdc-button mdc-button--raised mdc-button--dense mdc-button--primary">Button</button>
<button class="mdc-button mdc-button--raised mdc-button--compact mdc-button--primary">Button</button>
<button class="mdc-button mdc-button--raised mdc-button--dense mdc-button--accent">Button</button>
<button class="mdc-button mdc-button--raised mdc-button--compact mdc-button--accent">Button</button>
```

```js
import { MDCRipple } from '@material/ripple';

[].forEach.call(
  document.querySelectorAll('.mdc-button'),
  surface => MDCRipple.attachTo(surface)
);
```

## Cards (卡片)

Basic (基本):

```html
<div class="mdc-card"></div>
```

Media items (媒體項目):

```html
<div class="mdc-card">
  <!-- section ... -->
  <section class="mdc-card__media"></section>
  <!-- section ... -->
</div>
```

```html
<div class="mdc-card">
  <div class="mdc-card__horizontal-block">
    <!-- section ... -->
    <img class="mdc-card__media-item" src="image.jpg">  <!-- height of 80px (高度 80px) -->
    <!-- section ... -->
  </div>
</div>

<div class="mdc-card">
  <div class="mdc-card__horizontal-block">
    <!-- section ... -->
    <img class="mdc-card__media-item mdc-card__media-item--1dot5x" src="image.jpg">  <!-- height of 120px (高度 120px) -->
    <!-- section ... -->
  </div>
</div>

<div class="mdc-card">
  <div class="mdc-card__horizontal-block">
    <!-- section ... -->
    <img class="mdc-card__media-item mdc-card__media-item--2x" src="image.jpg">  <!-- height of 160px (高度 160px) -->
    <!-- section ... -->
  </div>
</div>

<div class="mdc-card">
  <div class="mdc-card__horizontal-block">
    <!-- section ... -->
    <img class="mdc-card__media-item mdc-card__media-item--3x" src="image.jpg">  <!-- height of 240ox (高度 240ox) -->
    <!-- section ... -->
  </div>
</div>
```

Primary title / text (主區塊):

```html
<div class="mdc-card">
  <!-- section ... -->
  <section class="mdc-card__primary">
    <h1 class="mdc-card__title mdc-card__title--large">Title goes here</h1>
    <h2 class="mdc-card__subtitle">Subtitle here</h2>
  </section>
  <!-- section ... -->
</div>
```

Supporting text (文字區):

```html
<div class="mdc-card">
  <!-- section ... -->
  <section class="mdc-card__supporting-text"></section>
  <!-- section ... -->
</div>
```

Actions (操作區):

```html
<div class="mdc-card">
  <!-- section ... -->
  <section class="mdc-card__actions">
    <button class="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
    <button class="mdc-button mdc-button--compact mdc-card__action">Action 2</button>
  </section>
</div>

<div class="mdc-card">
  <!-- section ... -->
  <section class="mdc-card__actions mdc-card__actions--vertical">
    <button class="mdc-button mdc-button--compact mdc-card__action">Action 1</button>
    <button class="mdc-button mdc-button--compact mdc-card__action">Action 2</button>
  </section>
</div>
```

Dark theme (暗的主題):

```html
<div class="mdc-card mdc-card--theme-dark"></div>
```

Horizontal blocks (水平區塊):

```html
<div class="mdc-card">
  <div class="mdc-card__horizontal-block">
    <!-- section ... -->
  </div>
</div>
```

## 複選框

```js
import '@material/form-field/dist/mdc.form-field.css';
import '@material/checkbox/dist/mdc.checkbox.css';
```

```html
<div class="mdc-form-field">
  <div class="mdc-checkbox">
    <input type="checkbox" id="basic-checkbox" class="mdc-checkbox__native-control">
    <div class="mdc-checkbox__background">
      <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
        <path class="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
      </svg>
      <div class="mdc-checkbox__mixedmark"></div>
    </div>
  </div>
  <label for="basic-checkbox">OK?</label>
</div>
```

## 對話框

```js
import '@material/dialog/dist/mdc.dialog.css';
```

```html
<button type="button" id="open" class="mdc-button mdc-button--raised mdc-button--primary">Open</button>

<aside id="dialog" class="mdc-dialog">
  <div class="mdc-dialog__surface">
    <header class="mdc-dialog__header">
      <h2 class="mdc-dialog__header__title">Title</h2>
    </header>
    <section class="mdc-dialog__body">
      <p>Content</p>
    </section>
    <footer class="mdc-dialog__footer">
      <button type="button" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Cancel</button>
      <button type="button" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">Accept</button>
    </footer>
  </div>
</aside>
```

```js
import { __moduleExports as mdDialog } from '@material/dialog/dist/mdc.dialog';

const openBtn = document.querySelector('#open');

const dialogEl = document.querySelector('#dialog');
const dialog = new mdDialog.MDCDialog(dialogEl);

dialog.listen('MDCDialog:accept', () => bodyEl.style.overflowY = 'auto');
dialog.listen('MDCDialog:cancel', () => bodyEl.style.overflowY = 'auto');

openBtn.addEventListener('click', () => dialog.show());
```

## 側邊欄

```js
import { MDCTemporaryDrawer } from '@material/drawer';

const drawerEl = document.querySelector('.mdc-temporary-drawer');
const drawer = new MDCTemporaryDrawer(drawerEl);

drawer.open = true;

drawer.addEventListener('MDCTemporaryDrawer:open', () => bodyEl.style.overflowY = 'hidden');
drawer.addEventListener('MDCTemporaryDrawer:close', () => bodyEl.style.overflowY = 'auto');
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
<button class="mdc-fab material-icons" aria-label="Favorite">
  <span class="mdc-fab__icon">favorite_border</span>
</button>
```

## 網格列表

## 圖標按鈕

## 線性進度條

```html
<div role="progressbar" class="mdc-linear-progress">
  <div class="mdc-linear-progress__buffering-dots"></div>
  <div class="mdc-linear-progress__buffer"></div>
  <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
    <span class="mdc-linear-progress__bar-inner"></span>
  </div>
  <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
    <span class="mdc-linear-progress__bar-inner"></span>
  </div>
</div>
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

## 版面網格

## 選單

## 單選框

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
import { MDCRadio } from '@material/radio';

[].forEach.call(
  document.querySelectorAll('.mdc-radio'),
  radio => MDCRadio.attachTo(radio)
);
```

## 選擇框

## 小橫條

## 切換鈕

## 文字輸入框

基本:
* `mdc-textfield`
  * `mdc-textfield__input`
  * `mdc-textfield__label`

多行: `mdc-textfield--multiline`

```html
<div class="mdc-textfield">
  <input type="text" id="ex" class="mdc-textfield__input" aria-controls="ex-helptext">
  <label for="ex" class="mdc-textfield__label">Label text</label>
</div>
```

```js
import { MDCTextfield } from '@material/textfield';

[].forEach.call(
  document.querySelectorAll('.mdc-textfield'),
  textfield => MDCTextfield.attachTo(textfield)
);
```

```html
<div class="mdc-textfield mdc-textfield--multiline">
  <textarea id="ex" class="mdc-textfield__input" rows="5"></textarea>
  <label class="mdc-textfield__label" for="ex">Label text</label>
</div>
```

## 主題

自訂主體的樣式。

```scss
:root {
  --mdc-theme-primary: #9C27B0;  // Purple
  --mdc-theme-accent: #009688;  // Teal
}
```

## 工具列

## 文字排版學

主標:
* `mdc-typography--display4`
* `mdc-typography--display3`
* `mdc-typography--display2`
* `mdc-typography--display1`
* `mdc-typography--headline`

標題:
* `mdc-typography--title`
  * `mdc-typography--caption`

子標:
* `mdc-typography--subheading2`
* `mdc-typography--subheading1`

段落:
* `mdc-typography--body1`
* `mdc-typography--body2`

額外調整: `mdc-typography--adjust-margin`

```js
import '@material/typography/dist/mdc.typography.css';
```

```html
<h1 class="mdc-typography--display4">Display 4</h1>
<h1 class="mdc-typography--display3">Display 3</h1>
<h1 class="mdc-typography--display2">Display 2</h1>
<h1 class="mdc-typography--display1">Display 1</h1>
<h1 class="mdc-typography--headline">Headline</h1>

<h2 class="mdc-typography--title">
  Title <span class="mdc-typography--caption">Caption.</span>
</h2>

<h3 class="mdc-typography--subheading2">Subheading 2</h3>
<h4 class="mdc-typography--subheading1">Subheading 1</h4>

<p class="mdc-typography--body1">Body 1 paragraph.</p>
<aside class="mdc-typography--body2">Body 2 text, calling something out.</aside>
```
