# Graphics

## Flat Display

SVG and Canvas

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
+   rx="12" yx="12"
    width="300" height="100"
    [...]
  />
[...]
```

`rx` and `ry` rounds the corners of the rectangle (like `border-radius`)

#### Canvas

```html
<canvas id="canvas" width="500" height="500"></canvas>
```

```js
const canvas = document.querySelector('#canvas');
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

// `quadraticCurveTo(cpx, cpy, x, y)`
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

### Circle (圓形)

#### SVG

```html
<svg height="500" width="500">
  <circle
    cx="50" cy="50" r="40"
    fill="#F8BBD0"
    stroke-width="3" stroke="#E91E63"
  />
</svg>
```

`cx` and `cy` define the x and y coordinates of the center of the circle <br>
`r` defines the radius of the circle

#### Canvas

```html
<canvas id="canvas" width="500" height="500"></canvas>
```

```js
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const [cx, cy, r] = [50, 50, 40];

ctx.beginPath();

ctx.arc(cx, cy, r, 0, 2 * Math.PI, false);

ctx.fillStyle = '#F8BBD0';
ctx.fill();

ctx.lineWidth = '3';
ctx.strokeStyle = '#E91E63';

ctx.stroke();
```

## Three-dimensional

WebGL
