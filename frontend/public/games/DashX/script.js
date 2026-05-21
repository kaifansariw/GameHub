// ================= POWER-UP STATE =================
let shieldActive = false;
let shieldDuration = 8000;
let shieldTimer = null;
let shieldInterval = null;

let magnetActive = false;
let magnetDuration = 8000;
let magnetTimer = null;
let magnetInterval = null;
let magnetRadius = 400;

// ================= ELEMENTS =================
const player = document.getElementById("player");
const game = document.getElementById("game");
const hudText = document.getElementById("hudText");
const shieldBar = document.getElementById("shieldBar");
const magnetBar = document.getElementById("magnetBar");

const startScreen = document.getElementById("startScreen");
const pauseBtn = document.getElementById("pauseBtn");
const gameOverScreen = document.getElementById("gameOver");
const finalScoreEl = document.getElementById("finalScore");

const shop = document.getElementById("shop");
const shopCoinsText = document.getElementById("shopCoins");

// ================= GAME VALUES =================
let lanes = [];
const lanesCount = 5;
const playerWidth = 70;

let currentLane = 2;
let score = 0;
let coins = 0;
let lives = 3;

let baseSpeed = 7;
let maxSpeed = 16;
let speed = baseSpeed;

let gameRunning = false;
let paused = false;

let obstacles = [];
let coinsArr = [];
let drones = [];
let highScore = localStorage.getItem("dashXHighScore")
  ? parseInt(localStorage.getItem("dashXHighScore"))
  : 0;

// ================= LANES =================
function setupLanes() {
  lanes = [];
  const screenWidth = window.innerWidth;
  for (let i = 0; i < lanesCount; i++) {
    const laneX = ((i + 1) / (lanesCount + 1)) * screenWidth;
    lanes.push(laneX - playerWidth / 2);
  }
  player.style.left = lanes[currentLane] + "px";
  player.style.bottom = "60px";
}
window.addEventListener("resize", setupLanes);

// ================= CONTROLS =================
document.addEventListener("keydown", e => {
  if (!gameRunning || paused) return;

  if (e.key === "ArrowLeft" && currentLane > 0) currentLane--;
  if (e.key === "ArrowRight" && currentLane < lanesCount - 1) currentLane++;

  player.style.left = lanes[currentLane] + "px";
});

document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    e.preventDefault();
    togglePause();
  }
});

// ================= START / PAUSE =================
function startGame() {
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  gameRunning = true;
  paused = false;
  setupLanes();
  requestAnimationFrame(gameLoop);
}

function togglePause() {
  if (!gameRunning) return;
  paused = !paused;
  pauseBtn.textContent = paused ? "▶" : "⏸";
}

// ================= SHIELD =================
function activateShield() {
  shieldActive = true;
  player.classList.add("shield-glow");

  clearTimeout(shieldTimer);
  clearInterval(shieldInterval);

  let timeLeft = shieldDuration;
  shieldBar.style.width = "100%";

  shieldInterval = setInterval(() => {
    timeLeft -= 100;
    shieldBar.style.width = (timeLeft / shieldDuration) * 100 + "%";
  }, 100);

  shieldTimer = setTimeout(() => {
    shieldActive = false;
    player.classList.remove("shield-glow");
    shieldBar.style.width = "0%";
    clearInterval(shieldInterval);
  }, shieldDuration);
}

// ================= MAGNET =================
function activateMagnet() {
  magnetActive = true;

  clearTimeout(magnetTimer);
  clearInterval(magnetInterval);

  let timeLeft = magnetDuration;
  magnetBar.style.width = "100%";

  magnetInterval = setInterval(() => {
    timeLeft -= 100;
    magnetBar.style.width = (timeLeft / magnetDuration) * 100 + "%";
  }, 100);

  magnetTimer = setTimeout(() => {
    magnetActive = false;
    magnetBar.style.width = "0%";
    clearInterval(magnetInterval);
  }, magnetDuration);
}

// ================= SPAWN =================
function createObstacle() {
  const obs = document.createElement("div");
  obs.className = "obstacle";
  const lane = Math.floor(Math.random() * lanesCount);
  obs.style.left = lanes[lane] + "px";
  obs.style.top = "-120px";
  game.appendChild(obs);
  obstacles.push(obs);
}

function createCoin() {
  const coin = document.createElement("div");
  coin.className = "coin";
  const lane = Math.floor(Math.random() * lanesCount);
  coin.style.left = lanes[lane] + "px";
  coin.style.top = "-80px";
  game.appendChild(coin);
  coinsArr.push(coin);
}

function createDrone() {
  const drone = document.createElement("div");
  drone.className = "drone";
  const lane = Math.floor(Math.random() * lanesCount);
  drone.dataset.lane = lane;
  drone.style.left = lanes[lane] + "px";
  drone.style.top = "-200px";
  game.appendChild(drone);
  drones.push(drone);
}

// ================= COLLISION =================
function collides(a, b) {
  const A = a.getBoundingClientRect();
  const B = b.getBoundingClientRect();
  return A.left < B.right && A.right > B.left && A.top < B.bottom && A.bottom > B.top;
}

// ================= MAIN LOOP =================
function gameLoop() {
  if (!gameRunning || paused) {
    requestAnimationFrame(gameLoop);
    return;
  }

  speed = Math.min(maxSpeed, baseSpeed + (score / 800));

  obstacles.forEach((o, i) => {
    o.style.top = parseInt(o.style.top) + speed + "px";
    if (collides(player, o)) hitPlayer(o, obstacles, i);
  });

  coinsArr.forEach((c, i) => {
    c.style.top = parseInt(c.style.top) + (speed - 2) + "px";

    if (magnetActive) {
      let dx = player.offsetLeft - c.offsetLeft;
      if (Math.abs(dx) < magnetRadius) {
        c.style.left = parseInt(c.style.left) + dx * 0.15 + "px";
      }
    }

    if (collides(player, c)) {
      coins++;
      c.remove();
      coinsArr.splice(i, 1);
      updateShopCoins();
    }
  });

  drones.forEach((d, i) => {
    let lane = parseInt(d.dataset.lane);
    let droneY = parseInt(d.style.top);

    const playerY = window.innerHeight - 60;
    const lockDistance = 300;
    const distance = playerY - droneY;

    if (distance > lockDistance) {
      if (lane < currentLane) lane++;
      if (lane > currentLane) lane--;
      d.dataset.lane = lane;
    }

    d.style.left = lanes[lane] + "px";
    d.style.top = droneY + (speed - 1) + "px";

    if (collides(player, d)) hitPlayer(d, drones, i);
  });

  score++;
  hudText.textContent = `Score: ${score} | Coins: ${coins} | Lives: ${lives}`;
  requestAnimationFrame(gameLoop);
}

// ================= HIT =================
function hitPlayer(obj, arr, index) {
  obj.remove();
  arr.splice(index, 1);

  if (shieldActive) {
    shieldActive = false;
    player.classList.remove("shield-glow");
    shieldBar.style.width = "0%";
    clearTimeout(shieldTimer);
    clearInterval(shieldInterval);
    return;
  }

  lives--;
  if (lives <= 0) endGame();
}

// ================= GAME OVER =================
function endGame() {
  gameRunning = false;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("dashXHighScore", highScore);
  }

  finalScoreEl.textContent = `Score: ${score} | Coins: ${coins}`;
  document.getElementById("highScore").textContent = "High Score: " + highScore;

  gameOverScreen.style.display = "flex";
}


function restartGame() {
  location.reload();
}

// ================= SHOP =================
function updateShopCoins() {
  shopCoinsText.textContent = coins;
}

function openShop() {
  shop.style.display = "flex";
  paused = true;
  updateShopCoins();
}

function closeShop() {
  shop.style.display = "none";
  paused = false;
}

function buyShield() {
  if (coins >= 5) {
    coins -= 5;
    updateShopCoins();
    activateShield();
  }
}

function buyLife() {
  if (coins >= 10) {
    coins -= 10;
    lives++;
    updateShopCoins();
  }
}

function buyMagnet() {
  if (coins >= 7) {
    coins -= 7;
    updateShopCoins();
    activateMagnet();
  }
}

// ================= SPAWN TIMERS =================
setInterval(() => gameRunning && !paused && createObstacle(), 900);
setInterval(() => gameRunning && !paused && createCoin(), 1200);
setInterval(() => gameRunning && !paused && createDrone(), 5000);
function resetHighScore() {
  localStorage.removeItem("dashXHighScore");
  highScore = 0;
  document.getElementById("highScore").textContent = "High Score: 0";
}

window.startGame = startGame;
window.restartGame = restartGame;
window.openShop = openShop;
window.closeShop = closeShop;
window.buyShield = buyShield;
window.buyLife = buyLife;
window.buyMagnet = buyMagnet;
window.resetHighScore = resetHighScore;