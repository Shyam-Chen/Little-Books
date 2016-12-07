# Stylus

`_variables.styl`

`_mixins.styl`

`_functions.styl`

`main.styl`

Stylus CSS Modules with Rollup

***

## 基礎入門

```styl
.foo
  color #F44336
```
```styl
.foo
  color: #F44336
```
```styl
.foo
  color: #F44336;
```
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

```styl
.foo, .bar
  color #F44336
```
```styl
.foo
.bar
  color #F44336
```
:point_up: 編譯前後 :point_down:
```css
.foo,
.bar {
  color: #f44336;
}
```

***

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

```styl
bar = #F44336

.foo
  color bar
```
```styl
$bar = #F44336

.foo
  color $bar
```
```styl
BAR = #F44336

.foo
  color BAR
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #f44336;
}
```

***

```styl
.foo
  width: 150px
  height: 100px
  margin-left: -(@width / 2)
  margin-top: -(@height / 2)
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

```styl
position()
  position arguments
  z-index 1 unless @z-index

.foo
  position absolute
  z-index 2

.bar
  position absolute
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  position: absolute;
  z-index: 2;
}
.bar {
  position: absolute;
  z-index: 1;
}
```

***

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

```styl
// foo
.foo
  color #f44336  // red-500
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #f44336;
}
```

***

```styl
foo = {
  color: #F44336,
  '&:hover': {
    padding: 0
  }
}

.bar
  {foo}
```
```styl
foo =
  color: #F44336
  &:hover
    padding: 0

.bar
  {foo}
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
colors = #F44336 #E91E63

.foo
  color colors[0]
```
```styl
colors()
  #F44336 #E91E63

.foo
  color colors[0]
```
:point_up: 編譯前後 :point_down:
```css
.foo {
  color: #f44336;
}
```

***

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

***

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
