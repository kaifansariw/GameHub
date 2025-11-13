const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const statusEl = document.getElementById("gameStatus");

let paddle = { x: 150, y: 470, width: 100, height: 15, speed: 10 };
let ball = { x: Math.random() * 380, y: 0, radius: 10, speed: 2 };
let score = 0;
let highScore = localStorage.getItem("catchHighScore") || 0;
let gameRunning = false;

highScoreEl.textContent = highScore;

function drawPaddle() {
  ctx.fillStyle = "#93c5fd";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#f472b6";
  ctx.fill();
  ctx.closePath();
}

function update() {
  if (!gameRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ball.y += ball.speed;

  if (ball.y + ball.radius > paddle.y &&
      ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
    score++;
    ball.y = 0;
    ball.x = Math.random() * (canvas.width - 20) + 10;
    ball.speed += 0.1;
    scoreEl.textContent = score;
  }

  if (ball.y > canvas.height) {
    gameOver();
    return;
  }

  drawBall();
  drawPaddle();
  requestAnimationFrame(update);
}

function movePaddle(e) {
  if (!gameRunning) return;
  if (e.key === "ArrowLeft" && paddle.x > 0) paddle.x -= paddle.speed;
  if (e.key === "ArrowRight" && paddle.x < canvas.width - paddle.width) paddle.x += paddle.speed;
}

document.addEventListener("keydown", movePaddle);

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  statusEl.textContent = "Playing...";
  ball.y = 0;
  ball.x = Math.random() * (canvas.width - 20) + 10;
  score = 0;
  scoreEl.textContent = score;
  update();
}

function resetGame() {
  gameRunning = false;
  ball.y = 0;
  score = 0;
  statusEl.textContent = "Ready";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameOver() {
  gameRunning = false;
  statusEl.textContent = "Game Over!";
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("catchHighScore", highScore);
    highScoreEl.textContent = highScore;
  }
}
