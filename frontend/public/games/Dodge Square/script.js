const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 500;

let player, obstacles, score, speed, gameOver;

function resetGame() {
  player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 60,
    width: 40,
    height: 40,
    speed: 5
  };

  obstacles = [];
  score = 0;
  speed = 3;
  gameOver = false;
}

function spawnObstacle() {
  let size = Math.floor(Math.random() * 40) + 20;
  let x = Math.floor(Math.random() * (canvas.width - size));
  obstacles.push({
    x,
    y: -size,
    size
  });
}

function update() {
  if (gameOver) return;

  if (Math.random() < 0.03) spawnObstacle();

  obstacles.forEach((o, i) => {
    o.y += speed;

    if (o.y > canvas.height) {
      obstacles.splice(i, 1);
      score++;
      document.getElementById("score").innerText = `Score: ${score}`;
      speed += 0.01;
    }

    if (
      player.x < o.x + o.size &&
      player.x + player.width > o.x &&
      player.y < o.y + o.size &&
      player.y + player.height > o.y
    ) {
      endGame();
    }
  });
}

function draw() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#3333ff";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = "#ff4444";
  obstacles.forEach(o => {
    ctx.fillRect(o.x, o.y, o.size, o.size);
  });

  requestAnimationFrame(draw);
}

function endGame() {
  gameOver = true;
  alert("Game Over! Your score: " + score);
}

document.addEventListener("keydown", e => {
  if (gameOver) return;

  if (e.key === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
  }
  if (e.key === "ArrowRight" && player.x + player.width < canvas.width) {
    player.x += player.speed;
  }
});

document.getElementById("startBtn").addEventListener("click", () => {
  resetGame();
  clearInterval(window.__interval); window.__interval = setInterval(update, 20);
  draw();
});
