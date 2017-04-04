# PostCSS

### 目錄
* [Comment](#comment)
* ----- **SCSS or Stylus** -----
* [入門](#入門)
* [變數](#變數)
* [巢狀](#巢狀)
* [混入](#混入)
* [屬性查找](#屬性查找)
* [插值](#插值)
* [註解](#註解)
* [物件](#物件)
* [條件式](#條件式)
* [陣列](#陣列)
* [媒體查詢](#媒體查詢)
* [運算子](#運算子)
* [函式](#函式)
* [繼承](#繼承)
* [迭代器](#迭代器)
* [轉義](#轉義)
* [比較](#比較)
* [風格指南](#風格指南)

***

## Comment

`postcss-comment`

```scss
.foo {
  color: #F44336;  // red-500
}
```

`postcss-import`

```scss
@import '../../root.css';

.foo {
  color: var(--primary);
}
```

`postcss-cssnext`

```styl
:root {
  --primary: #3F51B5;
  --accent: #673AB7;
}

```

`rucksack-css`

```scss

```

`postcss-url`

```scss
.foo {
  background: url('../../assets/images/vanilla.png');
}
```

`postcss-extend`

```scss
.foo {
  color: #F44336;

  &:first-child {
    background: #FFFFFF;
  }
}

.bar {
  @extend .foo;
}
```

`postcss-simple-vars`

```scss
$column: 10rem;
```

`postcss-conditionals`

`postcss-for`

`postcss-each`

`postcss-define-function`

`cssnano`

## 入門

SCSS 可以直接撰寫原本的 CSS。

```scss
.foo {
  color: #F44336;
}
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  color: #f44336;
}
```

***

選擇器的群組。

```scss
.foo,
.bar {
  color: #F44336;
}
```

:point_up: 編譯前後 :point_down:

```css
.foo,
.bar {
  color: #f44336;
}
```

## 變數

變數的宣告與使用。

```scss
$bar: #F44336;

.foo {
  color: $bar;
}
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  color: #f44336;
}
```

***

使用 CSS 的變數

```scss
:root {
  --bar: #F44336;
}

.foo {
  color: var(--bar);
}
```

:point_up: 編譯前後 :point_down:

```css
:root {
  --bar: #F44336;
}

.foo {
  color: var(--bar);
}
```

## 巢狀

選擇器的使用

```scss
.foo {
  border: 1px solid #eee;
  .bar {
    color: #F44336;
  }
}
```

使用 And 符號 `&`

```scss
.foo {
  border: 1px solid #eee;
  & .bar {
    color: #F44336;
  }
}
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  border: 1px solid #eee;
}
.foo .bar {
  color: #f44336;
}
```

***

使用其它選擇器

```scss
.foo {
  border: 1px solid #eee;
  > .bar {
    color: #F44336;
  }
}
```

```scss
.foo {
  border: 1px solid #eee;
  & > .bar {
    color: #F44336;
  }
}
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  border: 1px solid #eee;
}
.foo > .bar {
  color: #f44336;
}
```

***

把 And 符號 `&` 用在後面

```scss
a {
  border: 1px solid #eee;
  .foo & {
    color: #F44336;
  }
}
```

:point_up: 編譯前後 :point_down:

```css
a {
  border: 1px solid #eee;
}
.foo a {
  color: #f44336;
}
```

***

```scss
.foo {
  &-bar {
    color: #F44336;
  }

  &-baz__action {
    color: #E91E63;
  }
}
```

:point_up: 編譯前後 :point_down:

```css
.foo-bar {
  color: #f44336;
}
.foo-baz__action {
  color: #e91e63;
}
```

***

```scss
.foo {
  &Bar {
    color: #F44336;
  }

  &Baz {
    color: #E91E63;
  }
}
```

:point_up: 編譯前後 :point_down:

```css
.fooBar {
  color: #f44336;
}
.fooBaz {
  color: #e91e63;
}
```

***

更深層的巢狀

```scss
.foo {
  position: fixed;

  &-bar {
    color: #F44336;

    ~ .foo-baz {
      color: #E91E63;
    }
  }
}
```

使用 `^[num]` 直接指定

```styl
.foo
  position fixed
  &-bar
    color #F44336
    & ~ ^[0]-baz
      color #E91E63
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  position: fixed;
}
.foo-bar {
  color: #f44336;
}
.foo-bar ~ .foo-baz {
  color: #e91e63;
}
```

## 混入

```scss
@mixin bar {
  color: #F44336;
}

.foo {
  @include bar;
}
```

設定參數

```styl
bar(x)
  color x

.foo
  bar(#F44336)
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  color: #f44336;
}
```

***

代理屬性

```styl
width(x)
  width x

.foo
  width(10rem)
```

括號 `()` 省略就和原本屬性名稱一樣了

```styl
width(x)
  width x

.foo
  width 10rem
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  width: 10rem;
}
```

***

處理瀏覽器前綴

不過我們能透過 `PostStylus` 使用 `Rucksack` 啟用 `Autoprefixer` 來幫助我們加入前綴

```styl
flex(x)
  -webkit-box-flex x
  -webkit-flex x
  -ms-flex x
  flex x

.foo
  flex 1
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
```

## 屬性查找

`@` 即 `this`

不過有些風格指南，屬性是按照字母從 `a` ~ `z` 的或者按照屬性的模組做排序，這多多少少會影響到 At 符號 `@` 的使用

```styl
.foo
  width 150px
  height 100px
  margin-left -(@width / 2)
  margin-top -(@height / 2)
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  width: 150px;
  height: 100px;
  margin-left: -75px;
  margin-top: -50px;
}
```

***

CSS `currentColor` value

```scss
.foo {
  color: #F44336;
  .bar {
    color: #3F51B5;
    .baz {
      color: currentColor;  // #3F51B5
    }
  }
}
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  color: #F44336;
}
.foo .bar {
  color: #3F51B5;
}
.foo .bar .baz {
  color: currentColor;
}
```

***

```styl
width()
  width arguments
  height 10rem unless @height

.foo
  width 30rem
  height 20rem

.bar
  width 30rem
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  width: 30rem;
  height: 20rem;
}
.bar {
  width: 30rem;
  height: 10rem;
}
```

## 插值

Stylus 是使用大括號 `{ }` 來做插值的表示

如果碰過其它的框架或模板引擎也都會有插值的表示，例如: `{{ }}`、`<% %>`...

```styl
$foo = '.foo'
$bar = 'color'

{$foo}
  color #F44336

.bar
  {$bar} #F44336
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  color: #f44336;
}
.bar {
  color: #f44336;
}
```

## 註解

```styl
/*!
 * 多行註解
 */
.foo
  color #f44336  // 單行註解

/*
 * 多行註解
 */
```

:point_up: 編譯前後 :point_down:

```css
/*
 * 多行註解
 */
.foo {
  color: #f44336;
}
/*
 * 多行註解
 */
```

啟用壓縮，有使用 `/*!` 是不會被壓縮給清除了

```css
/*
 * 多行註解
 */
.foo{color:#f44336}
```

## 物件

```styl
$foo = {
  color: #F44336,
  '&:hover': {
    padding: 0
  }
}

.bar
  {$foo}
```

省略大括號 `{}`、冒號 `:` 和逗號 `,`，這樣就像巢狀的用法

```styl
$foo =
  color #F44336
  &:hover
    padding 0

.bar
  {$foo}
```

使用 `@block` 規則

這時候大括號 `{}` 是必要的

```styl
$foo = @block {
  color #F44336
  &:hover {
    padding 0
  }
}

.bar
  {$foo}
```

:point_up: 編譯前後 :point_down:

```css
.bar {
  color: #f44336;
}
.bar:hover {
  padding: 0;
}
```

## 條件式

```styl
if overload-padding = true
  padding(x)
    margin x

.foo
  padding 5px
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  margin: 5px;
}
```

***

```styl
$x = true

.foo
  color #F44336
  if $x is !0
    width 1px
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  color: #f44336;
  width: 1px;
}
```

## 陣列

```styl
$colors = #F44336, #E91E63

.foo
  color $colors[0]
```

把逗號 `,` 省略

```styl
$colors = #F44336 #E91E63

.foo
  color $colors[0]
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  color: #f44336;
}
```

***

```styl
$foo = 'color' 'background'

.bar
  {$foo[1]} #F44336
```
:point_up: 編譯前後 :point_down:
```css
.bar {
  background: #f44336;
}
```

***

陣列方法

```styl
$colors = #F44336 #E91E63
push($colors, #9C27B0)  // 現在是 [#F44336, #E91E63, #9C27B0]

.foo
  color $colors[2]
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #9c27b0;
}
```

```styl
// TODO
pop()
shift()
unshift()
index()
```

## 媒體查詢

```styl
.widget
  padding 10px
  @media screen and (min-width 600px)
    padding 20px
```

把 `and` 換成 `&&`

```styl
.widget
  padding 10px
  @media screen && (min-width 600px)
    padding 20px
```

:point_up: 編譯前後 :point_down:

```css
.widget {
  padding: 10px;
}
@media screen and (min-width: 600px) {
  .widget {
    padding: 20px;
  }
}
```

## 運算子

```styl
!0  // true
```

***

範圍

```styl
1..5  // 1 2 3 4 5

1...5  // 1 2 3 4

5..1  // 5 4 3 2 1
```

## 函式

```styl
add(x, y)
  unit(x + y, px)

$plus = add

.foo
  width $plus(1, 2)
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  width: 3px;
}
```

***

使用 `block`

```styl
foo()
  .bar
    {block}

+foo()
  color #F44336
```

:point_up: 編譯前後 :point_down:

```css
.bar {
  color: #f44336;
}
```

***

```styl
a()
  display inline

b()
  a()
  > .bar
    color #F44336

.foo
  b()
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  display: inline;
}
.foo > .bar {
  color: #f44336;
}
```

***

```styl
subtract(a, b)
  a - b

.foo
  width subtract(a: 25, b: 10)
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  width: 15;
}
```

***

加上預設參數

```styl
subtract(a = 2, b)
  a - b

.foo
  width subtract(b: 10)
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  width: -8;
}
```

***

```styl
add(a, b)
  a + b

sub(a, b)
  a - b

invoke(a, b, fn)
  fn(a, b)

.foo
  width invoke(5, 10, add)

.bar
  width invoke(5, 10, sub)
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  width: 15;
}
.bar {
  width: -5;
}
```

***

```styl
get(hash, key)
  return pair[1] if pair[0] is key for pair in hash

hash = (one 1) (two 2) (three 3)

.foo
  width get(hash, three)

.bar
  width get(hash, one)
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  width: 3;
}
.bar {
  width: 1;
}
```

***

剩餘參數

```styl
text-shadow(x...)
  text-shadow x
  font-size 1.75rem

.foo
  text-shadow 1px 1px #bbb, 2px 2px #ddd
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  text-shadow: 1px 1px #bbb, 2px 2px #ddd;
  font-size: 1.75rem;
}
```

***

顏色的函式

```styl
// TODO
red()
green()
blue()
alpha()

hue()
saturation()
lightness()

dark()
light()
```

## 繼承

繼承類別

```styl
.foo
  padding .5rem 1rem
  border 1px solid #EEEEEE

.bar
  @extend .foo
  color #F44336
```

:point_up: 編譯前後 :point_down:

```css
.foo,
.bar {
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
}
.bar {
  color: #f44336;
}
```

***

繼承多個類別

`@extend` 和 `@extends` 是相同的

在這裡加個 `s` 單純表示這是繼承多個

```styl
.foo
  padding .5rem 1rem
  border 1px solid #EEEEEE

.bar
  color #F44336

.baz
  @extends .foo, .bar
```

:point_up: 編譯前後 :point_down:

```css
.foo,
.baz {
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
}
.bar,
.baz {
  color: #f44336;
}
```

***

雖然這個長的很像變數，但是為什麼要加金錢符號 `$`，如果不加 Stylus 會把它當成標籤

不過話說回來這跟混入有什麼差別

```styl
$foo
  padding .5rem 1rem
  border 1px solid #EEEEEE

.bar
  @extends $foo

.baz
  @extends $foo
```

:point_up: 編譯前後 :point_down:

```css
.bar,
.baz {
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
}
```

如果是混入，編譯後會分開，不過我們是可以透過 `cssnano` 合併相同的樣式，所以最後結果都是跟上面一樣

```css
.bar {
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
}
.baz {
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
}
```

***

```styl
.foo
  padding .5rem 1rem
  border 1px solid #EEEEEE
  > .bar
    color #F44336

.baz
  @extend .foo > .bar
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
}
.foo > .bar,
.baz {
  color: #f44336;
}
```

***

```styl
.foo
  padding .5rem 1rem
  border 1px solid #EEEEEE

.bar
  @extend .foo
  color #F44336

.baz
  @extend .bar
  background #F44336
```

:point_up: 編譯前後 :point_down:

```css
.foo,
.bar,
.baz {
  padding: 0.5rem 1rem;
  border: 1px solid #eee;
}
.bar,
.baz {
  color: #f44336;
}
.baz {
  background: #f44336;
}
```

## 迭代器

迭代值

```styl
.foo
  for value in A B C
    PROPERTY value
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  PROPERTY: A;
  PROPERTY: B;
  PROPERTY: C;
}
```

***

加入鍵

```styl
.foo
  for value, key in A B C
    PROPERTY key value
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  PROPERTY: 0 A;
  PROPERTY: 1 B;
  PROPERTY: 2 C;
}
```

***

迭代器不會用於同個樣式的同屬性，大多會放在函式裡，迭代某個值

```styl
$color = #3F51B5
$value = 0px 0px $color
$length = 10

shadow-value($color)
  for $i in 1..$length
    $value = $value, unit($i, px) unit($i, px) $color
  return $value

long-shadow($color)
  text-shadow shadow-value($color)

.foo
  long-shadow(darken($color, 10%))
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  text-shadow: 0px 0px #3f51b5, 1px 1px #3949a3, 2px 2px #3949a3, 3px 3px #3949a3, 4px 4px #3949a3, 5px 5px #3949a3, 6px 6px #3949a3, 7px 7px #3949a3, 8px 8px #3949a3, 9px 9px #3949a3, 10px 10px #3949a3;
}
```

***

對虛擬類別做迭代

```styl
$color = #3F51B5

li
  padding .5rem
  for $i in 1..5
    &:nth-child({$i})
      background alpha($color, .1 * $i)
```

:point_up: 編譯前後 :point_down:

```css
li {
  padding: 0.5rem;
}
li:nth-child(1) {
  background: rgba(63,81,181,0.1);
}
li:nth-child(2) {
  background: rgba(63,81,181,0.2);
}
li:nth-child(3) {
  background: rgba(63,81,181,0.3);
}
li:nth-child(4) {
  background: rgba(63,81,181,0.4);
}
li:nth-child(5) {
  background: rgba(63,81,181,0.5);
}
```

## 轉義

使用反斜線 `\` 表示

```styl
q
  quotes "\00ab" "\00bb" "\2039" "\203A"
```

:point_up: 編譯前後 :point_down:

```css
q {
  quotes: "\00ab" "\00bb" "\2039" "\203A";
}
```

***

如果要連單位一起做運算，記得加個括號 `()`，不然就會被轉義了

```styl
.foo
  padding 1rem / 2
  padding (1rem / 2)
  padding unit(1 / 2, rem)
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  padding: 1rem/2;
  padding: 0.5rem;
  padding: 0.5rem;
}
```

## 比較

在這裡比較最為常用的**變數**與**巢狀**

CSS (以 `.css` 為副檔名)

```css
:root {
  --red-500: #F44336;
  --pink-500: #E91E63;
}

.foo {
  color: var(--red-500);
  & .bar {
    background: var(--pink-500);
  }
}
```

SugarSS (以 `.sss` 為副檔名)

```sss
:root
  --red-500: #F44336
  --pink-500: #E91E63

.foo
  color: var(--red-500)
  & .bar
    background: var(--pink-500)
```

Sass (以 `.sass` 為副檔名)

```sass
$red-500: #F44336
$pink-500: #E91E63

.foo
  color: $red-500
  .bar
    background: $pink-500
```

SCSS (以 `.scss` 為副檔名)

```scss
$red-500: #F44336;
$pink-500: #E91E63;

.foo {
  color: $red-500;
  .bar {
    background: $pink-500;
  }
}
```

Less (以 `.less` 為副檔名)

```less
@red-500: #F44336;
@pink-500: #E91E63;

.foo {
  color: @red-500;
  .bar {
    background: @pink-500;
  }
}
```

Stylus (以 `.styl` 為副檔名)

```styl
$red-500 = #F44336
$pink-500 = #E91E63

.foo
  color $red-500
  .bar
    background $pink-500

// 或者

$red-500 = #F44336;
$pink-500 = #E91E63;

.foo {
  color: $red-500;
  .bar {
    background: $pink-500;
  }
}

// 或者

:root
  --red-500 #F44336
  --pink-500 #E91E63

.foo
  color var(--red-500)
  & .bar
    background var(--pink-500)
```

## 風格指南

```js
// .stylintrc
{
  "blocks": false,
  "brackets": "never",
  "colons": "never",
  "colors": "always",
  "commaSpace": "always",
  "commentSpace": "always",
  "cssLiteral": "never",
  "depthLimit": false,
  "duplicates": true,
  "efficient": "always",
  "exclude": [],
  "extendPref": false,
  "globalDupe": false,
  "groupOutputByFile": true,
  "indentPref": false,
  "leadingZero": "never",
  "maxErrors": false,
  "maxWarnings": false,
  "mixed": false,
  "mixins": [],
  "namingConvention": false,
  "namingConventionStrict": false,
  "none": "never",
  "noImportant": true,
  "parenSpace": false,
  "placeholders": "always",
  "prefixVarsWithDollar": "always",
  "quotePref": false,
  "reporterOptions": {
    "columns": ["lineData", "severity", "description", "rule"],
    "columnSplitter": "  ",
    "showHeaders": false,
    "truncate": true
  },
  "semicolons": "never",
  "sortOrder": "false",
  "stackedProperties": "never",
  "trailingWhitespace": "never",
  "universal": false,
  "valid": false,
  "zeroUnits": "never",
  "zIndexNormalize": false
}
```

```yml
scss_files: 'src/**/*.scss'

linters:

  BangFormat:
    enabled: true
    space_before_bang: true
    space_after_bang: false

  BemDepth:
    enabled: true
    max_elements: 1

  BorderZero:
    enabled: true
    convention: zero

  ChainedClasses:
    enabled: false

  ColorKeyword:
    enabled: true

  ColorVariable:
    enabled: false

  Comment:
    enabled: false

  DebugStatement:
    enabled: true

  DeclarationOrder:
    enabled: true

  DisableLinterReason:
    enabled: true

  DuplicateProperty:
    enabled: false

  ElsePlacement:
    enabled: true
    style: same_line

  EmptyLineBetweenBlocks:
    enabled: true
    ignore_single_line_blocks: true

  EmptyRule:
    enabled: true

  ExtendDirective:
    enabled: false

  FinalNewline:
    enabled: true
    present: true

  HexLength:
    enabled: true
    style: short

  HexNotation:
    enabled: true
    style: lowercase

  HexValidation:
    enabled: true

  IdSelector:
    enabled: true

  ImportantRule:
    enabled: false

  ImportPath:
    enabled: true
    leading_underscore: false
    filename_extension: false

  Indentation:
    enabled: true
    allow_non_nested_indentation: true
    character: space
    width: 2

  LeadingZero:
    enabled: true
    style: include_zero

  MergeableSelector:
    enabled: false
    force_nesting: false

  NameFormat:
    enabled: true
    convention: hyphenated_lowercase
    allow_leading_underscore: true

  NestingDepth:
    enabled: true
    max_depth: 1

  PlaceholderInExtend:
    enabled: true

  PrivateNamingConvention:
    enabled: true
    prefix: _

  PropertyCount:
    enabled: false

  PropertySortOrder:
    enabled: false

  PropertySpelling:
    enabled: true
    extra_properties: []

  PropertyUnits:
    enabled: false

  PseudoElement:
    enabled: true

  QualifyingElement:
    enabled: true
    allow_element_with_attribute: false
    allow_element_with_class: false
    allow_element_with_id: false

  SelectorDepth:
    enabled: true
    max_depth: 3

  SelectorFormat:
    enabled: true
    convention: 'hyphenated_BEM'

  Shorthand:
    enabled: true

  SingleLinePerProperty:
    enabled: true
    allow_single_line_rule_sets: false

  SingleLinePerSelector:
    enabled: true

  SpaceAfterComma:
    enabled: true

  SpaceAfterPropertyColon:
    enabled: true
    style: one_space

  SpaceAfterPropertyName:
    enabled: true

  SpaceAfterVariableColon:
    enabled: true
    style: at_least_one_space

  SpaceAfterVariableName:
    enabled: true

  SpaceAroundOperator:
    enabled: true
    style: one_space

  SpaceBeforeBrace:
    enabled: true
    style: space
    allow_single_line_padding: true

  SpaceBetweenParens:
    enabled: true
    spaces: 0

  StringQuotes:
    enabled: true
    style: single_quotes

  TrailingSemicolon:
    enabled: true

  TrailingZero:
    enabled: true

  TransitionAll:
    enabled: false

  UnnecessaryMantissa:
    enabled: true

  UnnecessaryParentReference:
    enabled: true

  UrlFormat:
    enabled: false

  UrlQuotes:
    enabled: true

  VariableForProperty:
    enabled: false

  VendorPrefixes:
    enabled: true
    identifier_list: base
    include: []
    exclude: []

  ZeroUnit:
    enabled: true
```
