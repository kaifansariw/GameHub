const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 200;

let drawing = false;
let lastX = 0;
let lastY = 0;

// Generate random color for neon effect
function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 70%)`;
}

function startDrawing(e) {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
  drawing = false;
}

function draw(e) {
  if (!drawing) return;

  ctx.strokeStyle = randomColor();
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowBlur = 20;
  ctx.shadowColor = ctx.strokeStyle;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

// Gradual fade-out effect
function fadeCanvas() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(fadeCanvas);
}

fadeCanvas();

// Event Listeners
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
canvas.addEventListener("mousemove", draw);

document.getElementById("clearBtn").onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
