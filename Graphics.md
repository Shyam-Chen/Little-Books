# Graphics

***

### Table of Contents (目錄)

* [Flat Display (平面圖形)](#flat-display-平面圖形)
  * [Line (線)](#line-線)
  * [Rectangle (長方形)](#rectangle-長方形)
  * [Circle (圓形)](#circle-圓形)
  * [Ellipse (橢圓形)](#ellipse-橢圓形)
  * [Polygon (多邊形)](#polygon-多邊形)
  * Polyline (折線)
* [Three-dimensional (立體圖形)](#three-dimensional-立體圖形)

***

## Flat Display (平面圖形)

SVG: https://developer.mozilla.org/en-US/docs/Web/SVG <br>
Canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

### Line (線)

#### SVG

```html
<svg width="500" height="500">
  <line
    x1="30" y1="50"
    x2="120" y2="100"
    stroke-width="3" stroke="#E91E63"
  />
</svg>
```

https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line

#### Canvas

```html
<canvas id="line" width="500" height="500"></canvas>
```

```js
const canvas = document.querySelector('#line');
const ctx = canvas.getContext('2d');

const [x1, y1] = [30, 50];
const [x2, y2] = [120, 100];

ctx.beginPath();

ctx.lineWidth = '3';
ctx.strokeStyle = '#E91E63';

ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);

ctx.stroke();
```

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo <br>
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo

### Rectangle (長方形)

#### SVG

```html
<svg width="500" height="500">
  <rect
    x="30" y="10"
    width="300" height="100"
    fill="#F8BBD0"
    stroke-width="3" stroke="#E91E63"
  />
</svg>
```

`x` defines the left position of the rectangle (like `margin-left`) <br>
`y` defines the top position of the rectangle (like `margin-top`) <br>
`fill` defines the background color of the rectangle (like `background-color`) <br>
`stroke-width` defines the border width of the rectangle (like `border-width`) <br>
`stroke ` defines the border color of the rectangle (like `border-color`)

Add rounded corners (加個圓角)

```diff
[...]
  <rect
    x="30" y="10"
+   rx="12" ry="12"
    width="300" height="100"
    [...]
  />
[...]
```

`rx` and `ry` rounds the corners of the rectangle (like `border-radius`)

https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect

#### Canvas

```html
<canvas id="rect" width="500" height="500"></canvas>
```

```js
const canvas = document.querySelector('#rect');
const ctx = canvas.getContext('2d');

const [x, y] = [30, 10];
const [rx, ry] = [12, 12];
const [width, height] = [300, 100];

// Create a rectangle directly (直接建立一個長方形)

ctx.beginPath();

ctx.rect(x, y, width, height);

ctx.fillStyle = '#F8BBD0';
ctx.fill();

ctx.lineWidth = '3';
ctx.strokeStyle = '#E91E63';

ctx.stroke();

// With the way of drawing lines (用畫線的方式)

ctx.beginPath();

ctx.lineWidth = '3';
ctx.strokeStyle = '#E91E63';

ctx.moveTo(x, y);  // Starting point (起始點)
ctx.lineTo(width + x, y);
ctx.lineTo(width + x, height + y);
ctx.lineTo(x, height + y);
ctx.lineTo(x, y);  // Back to the starting point (回到起始點)

ctx.fillStyle = '#F8BBD0';
ctx.fill();

ctx.stroke();

// Add rounded corners (加個圓角)

// Add `quadraticCurveTo(cpx, cpy, x, y)`
// `cpx` and `cpy` is the vertical turning point (`cpx` 和 `cpy` 為垂直轉折點)

ctx.moveTo(x + rx, y);  // Starting point (起始點)
ctx.lineTo(width + x - rx, y);
ctx.quadraticCurveTo(width + x, y, width + x, y + ry);
ctx.lineTo(width + x, height + y - ry);
ctx.quadraticCurveTo(width + x, height + y, width + x - rx, height + y);
ctx.lineTo(x + rx , height + y);
ctx.quadraticCurveTo(x , height + y, x, height - ry);
ctx.lineTo(x, y + ry);
ctx.quadraticCurveTo(x, y, x + rx, y);  // `x + rx, y` is back to the starting point (`x + rx, y` 是回到起始點)
```

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect <br>
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo

### Circle (圓形)

#### SVG

```html
<svg width="500" height="500">
  <circle
    cx="50" cy="50" r="40"
    fill="#F8BBD0"
    stroke-width="3" stroke="#E91E63"
  />
</svg>
```

`cx` and `cy` define the x and y coordinates of the center of the circle <br>
`r` defines the radius of the circle

https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle

#### Canvas

```html
<canvas id="circle" width="500" height="500"></canvas>
```

```js
const canvas = document.querySelector('#circle');
const ctx = canvas.getContext('2d');

const [cx, cy, r] = [50, 50, 40];

ctx.beginPath();

ctx.arc(cx, cy, r, 0, 2 * Math.PI);

ctx.fillStyle = '#F8BBD0';
ctx.fill();

ctx.lineWidth = '3';
ctx.strokeStyle = '#E91E63';

ctx.stroke();
```

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc

### Ellipse (橢圓形)

#### SVG

```html
<svg width="500" height="500">
  <ellipse
    cx="150" cy="100" rx="100" ry="50"
    fill="#F8BBD0"
    stroke-width="3" stroke="#E91E63"
  />
</svg>
```

https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse

#### Canvas

```html
<canvas id="ellipse" width="500" height="500"></canvas>
```

```js
const canvas = document.querySelector('#ellipse');
const ctx = canvas.getContext('2d');

const [cx, cy, rx, ry] = [150, 100, 100, 50];

ctx.beginPath();

ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);

ctx.fillStyle = '#F8BBD0';
ctx.fill();

ctx.lineWidth = '3';
ctx.strokeStyle = '#E91E63';

ctx.stroke();
```

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse

### Polygon (多邊形)

#### SVG

```html
<svg width="500" height="500">
  <polygon
    points="
      60,20
      100,40
      100,80
      60,100
      20,80
      20,40
    "
    fill="#F8BBD0"
    stroke-width="3" stroke="#E91E63"
  />
</svg>
```

https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon

#### Canvas

```html
<canvas id="polygon" width="500" height="500"></canvas>
```

```js
const canvas = document.querySelector('#polygon');
const ctx = canvas.getContext('2d');

const [x1, y1] = [60, 20];
const [x2, y2] = [100, 40];
const [x3, y3] = [100, 80];
const [x4, y4] = [60, 100];
const [x5, y5] = [20, 80];
const [x6, y6] = [20, 40];

ctx.beginPath();

ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.lineTo(x3, y3);
ctx.lineTo(x4, y4);
ctx.lineTo(x5, y5);
ctx.lineTo(x6, y6);

ctx.lineTo(x1, y1);

ctx.fillStyle = '#F8BBD0';
ctx.fill();

ctx.lineWidth = '3';
ctx.strokeStyle = '#E91E63';

ctx.stroke();

// or

const points = [
  60, 20,
  100, 40,
  100, 80,
  60, 100,
  20, 80,
  20, 40
];

ctx.moveTo(points[0], points[1]);

for (let i = 2, l = points.length - 1; i < l; i += 2) {
  ctx.lineTo(points[i] , points[i + 1]);
}

ctx.lineTo(points[0], points[1]);
```

## Three-dimensional (立體圖形)

WebGL: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
