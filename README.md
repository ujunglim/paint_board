# paint_board

API: CanvasRenderingContext2D

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

```javascript
// context manipulates pixel inside of canvas
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

// canvas element has 2 sizes: css size and
// pixel modifier size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
```

---

### 0. Initialize

```javascript
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;
const PAINT = 0;
const ERASE = 1;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let erasing = false;
let mode = PAINT;
let selectedColorIndex = 0; // black
```

---

### 1. Draw line

**When mouse moves, either it has been clicked or not, path is being created.**

**When mouse is down and move, then the visible line is created**

```javascript
// When mouse down, create path
ctx.beginPath();
ctx.moveTo(x, y);

// When mouse moves, create line
ctx.lineTo(x, y);
ctx.stroke();
```

### 2. Select color

```js
// get selected color
const selectedColor = event.target.style.backgroundColor;
ctx.strokeStyle = selectedColor;
ctx.fillStyle = ctx.strokeStyle;
```

### 3. Fill canvas

```javascript
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
```

### 4. Reset canvas

```js
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

### 5. Eraser

```js
ctx.clearRect(x, y, eraseWidth, eraseWidth);
```

### 6. Change width of line and eraser

```js
const onRangeChange = (event) => {
  const size = event.target.value;
  ctx.lineWidth = size;
};
```

### 7. Save image

```js
// get canvas data as image url
const image = canvas.toDataURL();
// create link that doesnt exist
const link = document.createElement("a");
link.href = image;
link.download = "PaintBoard[🎨]";
link.click();
```

### 8. Miscellaneous

Custom cursor

```js
canvas.style.cursor = `url("./image/pencil.png") 0 30, auto`;
// reset cursor origin
```

---

## TODO

1. Undo

2. Input shape

3. Fill shape
