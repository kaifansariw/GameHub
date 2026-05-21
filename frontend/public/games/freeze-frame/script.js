const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let bulbs = [];
let obstacles = [];
let score = 0;
let time = 60;
let gameInterval, timerInterval;
let isPaused = false;

// Audio
const bgMusic = document.getElementById("bgMusic");
const popSound = document.getElementById("popSound");

// Generate random bulbs
function createBulbs() {
  bulbs = [];
  for (let i = 0; i < 10; i++) {
    bulbs.push({
      x: Math.random() * (canvas.width - 40) + 20,
      y: Math.random() * (canvas.height - 40) + 20,
      radius: 10,
      glow: Math.random() * 5 + 5,
      collected: false,
    });
  }
}

// Generate obstacles
function createObstacles() {
  obstacles = [];
  for (let i = 0; i < 5; i++) {
    obstacles.push({
      x: Math.random() * (canvas.width - 60) + 30,
      y: Math.random() * (canvas.height - 60) + 30,
      width: 40,
      height: 40,
    });
  }
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw lines between collected bulbs
  ctx.beginPath();
  ctx.strokeStyle = "#0ff";
  ctx.lineWidth = 2;
  for (let i = 0; i < bulbs.length; i++) {
    if (bulbs[i].collected) {
      if (i > 0 && bulbs[i - 1].collected) {
        ctx.moveTo(bulbs[i - 1].x, bulbs[i - 1].y);
        ctx.lineTo(bulbs[i].x, bulbs[i].y);
      }
    }
  }
  ctx.stroke();

  // Draw bulbs
  bulbs.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = "cyan";
    ctx.shadowColor = "cyan";
    ctx.shadowBlur = b.glow;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Draw obstacles
  ctx.fillStyle = "red";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });

  // Draw score
  document.getElementById("score").textContent = score;
}

// Check click
canvas.addEventListener("click", e => {
  if (isPaused) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  bulbs.forEach(b => {
    const dx = x - b.x;
    const dy = y - b.y;
    if (!b.collected && Math.sqrt(dx*dx + dy*dy) < b.radius + 5) {
      b.collected = true;
      score += 10;
      popSound.play();
    }
  });
});

// Game loop
function gameLoop() {
  draw();
}

// Timer
function startTimer() {
  timerInterval = setInterval(() => {
    if (!isPaused) {
      time--;
      document.getElementById("time").textContent = time;
      if (time <= 0) stopGame();
    }
  }, 1000);
}

// Start game
function startGame() {
  createBulbs();
  createObstacles();
  score = 0;
  time = 60;
  isPaused = false;
  bgMusic.play();
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameInterval = setInterval(gameLoop, 30);
  startTimer();
}

// Pause
function pauseGame() {
  isPaused = true;
  bgMusic.pause();
}

// Resume
function resumeGame() {
  isPaused = false;
  bgMusic.play();
}

// Stop
function stopGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  bgMusic.pause();
  alert(`Game Over! Your score: ${score}`);
}

// Restart
function restartGame() {
  startGame();
}

// Buttons
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("pauseBtn").addEventListener("click", pauseGame);
document.getElementById("resumeBtn").addEventListener("click", resumeGame);
document.getElementById("restartBtn").addEventListener("click", restartGame);
