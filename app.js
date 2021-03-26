const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // context manipulates pixel inside of canvas

// canvas elemetn has 2 sizes: css size and
// pixel modifier size
canvas.width = 500;
canvas.height = 500;

// dafault of context
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function startPainting() {
  painting = true;
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
    // console.log("creating path", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  else {
    // create line
    // console.log("creating line", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// function onMouseDown(event) {
//   painting = true;
// }


if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);  // when mouse out of canvas
}
