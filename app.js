const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // context manipulates pixel inside of canvas

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;


// canvas elemetn has 2 sizes: css size and
// pixel modifier size
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// initialize
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  if(!filling) {
    painting = true;
  }
}

function stopPainting() {
  painting = false;
}

// detect movements
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if(!painting) {
    // create path
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  else {
    // create line
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; 
  ctx.fillStyle = ctx.strokeStyle;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if(filling === true) {
    filling = false;
    modeBtn.innerText = "Fill";
  }
  else {
    filling = true;
    modeBtn.innerText = "Paint";
  }
}

// filling canvas
function handleCanvasClick() {
  if(filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

// prevent mouse right click
function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  // get canvas data as image url
  const image = canvas.toDataURL();
  // create link that doesnt exist
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintBoard[🎨]";
  link.click();
}

function handleResetClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);  // when mouse out of canvas
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM); 
}

//=======---===== Control Colors =====================
// convert obj to array
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

//=======---===== Control Range =====================
if(range) {
  range.addEventListener("input", handleRangeChange);
}

if(modeBtn) {
  modeBtn.addEventListener("click", handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if(resetBtn) {
  resetBtn.addEventListener("click", handleResetClick);
}