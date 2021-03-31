const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // context manipulates pixel inside of canvas

// DOM
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");
const eraseBtn = document.getElementById("jsErase");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;
const PAINT = 0;
const ERASE = 1;

// canvas element has 2 sizes: css size and
// pixel modifier size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
canvas.style.cursor = `url("./image/pencil.png") 0 30, auto`; // cursor origin

// initialize
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

const onMouseDown = (event) => {
  if (mode === PAINT) {
    painting = true;
    const x = event.offsetX;
    const y = event.offsetY;
    // create path
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else if (mode === ERASE) {
    erasing = true;
  }
};

// detect movements
const onMouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (mode === PAINT && painting) {
    // create line
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (mode === ERASE && erasing) {
    const eraseWidth = ctx.lineWidth + 2.5;
    ctx.clearRect(x, y, eraseWidth, eraseWidth);
  }
};

// when mouse up or leave
const stop = () => {
  painting = false;
  erasing = false;
};

const onRangeChange = (event) => {
  const size = event.target.value;
  ctx.lineWidth = size;
};

const onModeClick = () => {
  eraseBtn.classList.remove("selected");
  modeBtn.classList.add("selected");
  canvas.style.cursor = `url("./image/pencil.png") 0 30, auto`;
  mode = PAINT;

  if (filling === true) {
    filling = false;
    modeBtn.innerText = "Fill";
  } else {
    filling = true;
    modeBtn.innerText = "Paint";
  }
};

// filling canvas
const onCanvasClick = () => {
  if (mode === PAINT && filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
};

// prevent mouse right click
const onContextMenu = (event) => {
  event.preventDefault();
};

const onSaveClick = () => {
  // get canvas data as image url
  const image = canvas.toDataURL();
  // create link that doesnt exist
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintBoard[🎨]";
  link.click();
};

const onResetClick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const onEraseClick = () => {
  modeBtn.classList.remove("selected");
  eraseBtn.classList.add("selected");

  mode = ERASE;
  canvas.style.cursor = `url("./image/eraser.png") 0 30, auto`;
};

const selectColor = (color, index) => {
  color.addEventListener("click", (event) => {
    // get selected color
    const selectedColor = event.target.style.backgroundColor;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = ctx.strokeStyle;

    // check tag
    colors[selectedColorIndex].classList.remove("selected"); // prev selected color
    selectedColorIndex = index; // curr selected color
    color.classList.add("selected");
  });
};

if (canvas) {
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", stop);
  canvas.addEventListener("mouseleave", stop);
  canvas.addEventListener("click", onCanvasClick);
  canvas.addEventListener("contextmenu", onContextMenu);
}

//================ Control =====================
// convert obj to array
Array.from(colors).forEach((color, index) => selectColor(color, index));

if (range) {
  range.addEventListener("input", onRangeChange);
}

if (modeBtn) {
  modeBtn.addEventListener("click", onModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", onSaveClick);
}

if (resetBtn) {
  resetBtn.addEventListener("click", onResetClick);
}

if (eraseBtn) {
  eraseBtn.addEventListener("click", onEraseClick);
}
