const canvas = document.getElementById("carromCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");

const boardSize = 500;
const coinRadius = 15;
const strikerRadius = 20;

let coins = [];
let striker = { x: boardSize / 2, y: 450, dx: 0, dy: 0 };
let score = 0;
let dragging = false;
let mouseStart = {x: 0, y: 0};

function resetGame() {
  score = 0;
  scoreDisplay.textContent = score;
  coins = [];
  for (let i=0;i<9;i++){
    coins.push({
      x: Math.random() * (boardSize-60)+30,
      y: Math.random() * (boardSize-200)+50,
      vx:0, vy:0
    });
  }
  striker.x = boardSize / 2;
  striker.y = 450;
  striker.dx = 0;
  striker.dy = 0;
}

function draw() {
  ctx.clearRect(0,0,boardSize,boardSize);

  // Draw coins
  coins.forEach(c=>{
    ctx.beginPath();
    ctx.arc(c.x, c.y, coinRadius, 0, Math.PI*2);
    ctx.fillStyle = "gold";
    ctx.fill();
    ctx.closePath();
  });

  // Draw striker
  ctx.beginPath();
  ctx.arc(striker.x, striker.y, strikerRadius,0,Math.PI*2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function update() {
  // Update striker
  striker.x += striker.dx;
  striker.y += striker.dy;

  // Friction
  striker.dx *= 0.98;
  striker.dy *= 0.98;

  // Bounce walls
  if(striker.x-strikerRadius<0 || striker.x+strikerRadius>boardSize) striker.dx*=-1;
  if(striker.y-strikerRadius<0 || striker.y+strikerRadius>boardSize) striker.dy*=-1;

  // Update coins
  coins.forEach(c=>{
    c.x += c.vx;
    c.y += c.vy;
    c.vx*=0.98;
    c.vy*=0.98;

    // Collision with striker
    let dx = c.x-striker.x;
    let dy = c.y-striker.y;
    let dist = Math.sqrt(dx*dx+dy*dy);
    if(dist < coinRadius+strikerRadius){
      let angle = Math.atan2(dy,dx);
      let speed = 5;
      c.vx = Math.cos(angle)*speed;
      c.vy = Math.sin(angle)*speed;
    }

    // Pocket check (corners)
    if(c.x<0 || c.x>boardSize || c.y<0 || c.y>boardSize){
      coins = coins.filter(coin=>coin!==c);
      score++;
      scoreDisplay.textContent = score;
    }
  });
}

function gameLoop() {
  if(dragging) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Mouse events for flick
canvas.addEventListener("mousedown", e=>{
  const rect = canvas.getBoundingClientRect();
  let mx = e.clientX - rect.left;
  let my = e.clientY - rect.top;

  let dx = mx-striker.x;
  let dy = my-striker.y;
  if(Math.sqrt(dx*dx+dy*dy)<=strikerRadius){
    dragging = true;
    mouseStart = {x: mx, y: my};
  }
});

canvas.addEventListener("mouseup", e=>{
  if(dragging){
    const rect = canvas.getBoundingClientRect();
    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;
    striker.dx = (mouseStart.x - mx)/10;
    striker.dy = (mouseStart.y - my)/10;
    dragging=false;
  }
});

restartBtn.onclick = resetGame;

resetGame();
gameLoop();
