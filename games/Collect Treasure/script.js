const gameContainer = document.getElementById("gameContainer");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");
const restartBtn = document.getElementById("restartBtn");

let playerX = 175;
let score = 0;
let speed = 3;
let spawnRate = 1200; // ms
let running = true;

document.addEventListener("keydown", e => {
  if (!running) return;

  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  } 
  else if (e.key === "ArrowRight" && playerX < 350) {
    playerX += 20;
  }
  player.style.left = playerX + "px";
});

function spawnItem() {
  if (!running) return;

  const item = document.createElement("div");
  item.classList.add("item");

  const isTreasure = Math.random() < 0.7;
  item.classList.add(isTreasure ? "treasure" : "bomb");

  item.style.left = Math.random() * 360 + "px";
  gameContainer.appendChild(item);

  let fallInterval = setInterval(() => {
    if (!running) {
      clearInterval(fallInterval);
      item.remove();
      return;
    }

    let itemTop = item.offsetTop;
    item.style.top = itemTop + speed + "px";

    // Check collision
    if (itemTop > 530 &&
      Math.abs(item.offsetLeft - playerX) < 40) {

      if (item.classList.contains("treasure")) {
        score++;
        scoreDisplay.textContent = score;
        item.remove();
        clearInterval(fallInterval);
      } else {
        endGame();
      }
    }

    // Remove when out of screen
    if (itemTop > 600) {
      item.remove();
      clearInterval(fallInterval);
    }
  }, 20);
}

function startSpawning() {
  setInterval(() => {
    if (running) spawnItem();
  }, spawnRate);
}

function endGame() {
  running = false;
  gameOverScreen.classList.remove("hidden");
}

restartBtn.onclick = () => {
  location.reload();
};

startSpawning();

// Increase difficulty every 10 seconds
setInterval(() => {
  if (running) {
    speed += 0.5;
    if (spawnRate > 400) spawnRate -= 50;
  }
}, 10000);
