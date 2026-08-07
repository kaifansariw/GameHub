const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 380;
canvas.height = 500;

let block, pipes, gravity, lift, score, speed, gameOver;

function resetGame() {
  block = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    velocity: 0
  };

  pipes = [];
  gravity = 0.4;
  lift = -6;
  score = 0;
  speed = 2;
  gameOver = false;

  createPipe();
}

function createPipe() {
  let gap = 120;
  let topHeight = Math.floor(Math.random() * (canvas.height - gap - 50)) + 20;

  pipes.push({
    x: canvas.width,
    width: 60,
    topHeight,
    gap,
    bottomY: topHeight + gap
  });
}

function update() {
  if (gameOver) return;

  block.velocity += gravity;
  block.y += block.velocity;

  if (block.y + block.height > canvas.height || block.y < 0) {
    endGame();
  }

  pipes.forEach((pipe, i) => {
    pipe.x -= speed;

    if (pipe.x + pipe.width < 0) {
      pipes.splice(i, 1);
      createPipe();
      score++;
      document.getElementById("score").innerText = `Score: ${score}`;
    }

    if (block.x < pipe.x + pipe.width &&
        block.x + block.width > pipe.x &&
        (block.y < pipe.topHeight || block.y + block.height > pipe.bottomY)) {
      endGame();
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff3366";
  ctx.fillRect(block.x, block.y, block.width, block.height);

  pipes.forEach(pipe => {
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
    ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, canvas.height - pipe.bottomY);
  });

  if (!gameOver) requestAnimationFrame(draw);
}

function endGame() {
  gameOver = true;
  alert("Game Over!\nScore: " + score);
}

canvas.addEventListener("click", () => {
  if (!gameOver) block.velocity = lift;
});

document.getElementById("startBtn").addEventListener("click", () => {
  resetGame();
  draw();
  clearInterval(window.__interval); window.__interval = setInterval(update, 20);
});
