# Stylus

`_variables.styl`

`_mixins.styl`

`_functions.styl`

`main.styl`

Rucksack (CSS superpowers) with PostStylue.

Stylus CSS Modules with Rollup.

### 目錄
* [簡寫](#簡寫)
* [變數](#變數)
* [巢狀](#巢狀)
* [混入](#混入)
* [屬性查找](#屬性查找)
* [自訂選擇器](#自訂選擇器)
* [註解](#註解)
* [物件](#物件)
* [條件式](#條件式)
* [陣列](#陣列)
* [媒體查詢](#媒體查詢)
* [函式](#函式)
* [繼承](#繼承)

***

## 簡寫

Stylus 可以讓我們把大括號 `{}` 省略

```styl
.foo
  color: #F44336;
```

也可以把分號 `;` 省略

```styl
.foo
  color: #F44336
```

還可以把冒號 `:` 省略

```styl
.foo
  color #F44336
```

其實也可以寫原本的 CSS

```styl
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

## 變數

```styl
bar = #F44336

.foo
  color bar
```

不過建議前面加個金錢符號 `$`

```styl
$bar = #F44336

.foo
  color $bar
```

:point_up: 編譯前後 :point_down:

```css
.foo {
  color: #f44336;
}
```

***

## 巢狀

```styl
.foo
  border 1px solid #eee
  > .bar
    color #F44336
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

```styl
.foo
  &-a
    color #F44336
  &-b
    color #E91E63
```
:point_up: 編譯前後 :point_down:
```css
.foo-a {
  color: #f44336;
}
.foo-b {
  color: #e91e63;
}
```

***

```styl
.foo
  position fixed
  &-bar
    color #F44336
    ~ .foo-baz
      color #E91E63
```

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

***

## 混入

```styl
bar()
  color #F44336

.foo
  bar()
```
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

## 屬性查找

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

```styl
.foo
  color #F44336
  .bar
    color #E91E63
    .baz
      background @color
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #f44336;
}
.foo .bar {
  color: #e91e63;
}
.foo .bar .baz {
  background: #e91e63;
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

***

## 自訂選擇器

```styl
$some-selectors = '.foo, .bar, .baz'

{$some-selectors}
  color: #F44336
```
:point_up: 編譯前後 :point_down:
```css
.foo,
.bar,
.baz {
  color: #f44336;
}
```

***

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
 * foo.styl
 */
.foo {
  color: #f44336;
}
/*
 * [附註]: Red-500 是 Material Design 的顏色定義
 */
```

啟用壓縮

```css
/*
 * foo.styl
 */
.foo{color:#f44336}
```

***

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

```styl
$foo =
  color #F44336
  &:hover
    padding 0

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

***

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
x = true

.foo
  color #F44336
  if x == !0  // !0 => true
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
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #f44336;
}
```

***

## 媒體查詢

```styl
.widget
  padding 10px
  @media screen and (min-width: 600px)
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

***

## 函式

```styl
add(x, y)
  unit(x + y, px)

plus = add

.foo
  width plus(1, 2)
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  width: 3px;
}
```

***

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
  return pair[1] if pair[0] == key for pair in hash

hash = (one 1)(two 2)(three 3)

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

## 繼承

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

```styl
.foo
  padding .5rem 1rem
  border 1px solid #EEEEEE

.bar
  color #F44336

.baz
  @extend .foo, .bar
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

```styl
$foo
  padding .5rem 1rem
  border 1px solid #EEEEEE

.bar
  @extends $foo  // 注意有加 `s`

.baz
  @extends $foo  // 注意有加 `s`
```
:point_up: 編譯前後 :point_down:
```css
.bar,
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
  @extends .foo > .bar
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
  @extends .foo
  color #F44336

.baz
  @extends .bar
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

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```

***

```styl

```
:point_up: 編譯前後 :point_down:
```css

```
