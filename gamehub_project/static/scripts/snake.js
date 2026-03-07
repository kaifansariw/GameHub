// snake.js (New Top Lines)
let canvas;
let ctx;
let tileCount;
// ... rest of your global variables (gridSize, snake, food, etc.)

const gridSize = 20;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0, dy = 0;
let score = 0;
let highScore = Number(localStorage.getItem("snakeHighScore") || 0);
let gameRunning = false;
let gameLoop = null;
let foodEaten = 0;
let speedLevel = 1;
let gameSpeed = 150; // ms per tick
let gameState = "ready"; // ready | playing | paused | gameOver
let bonusGiven = false;

let unlockedAchievements = JSON.parse(localStorage.getItem("snakeAchievements") || "[]");
let visitTracked = false;
let gameInitDone = false;

// Achievements (kept as before)
const achievements = [
  { id: 'firstBite', name: 'First Bite', description: 'Eat your first food', condition: () => foodEaten >= 1, icon: 'fas fa-baby', color: 'text-yellow-500' },
  { id: 'growingFast', name: 'Growing Fast', description: 'Reach length 5', condition: () => snake.length >= 5, icon: 'fas fa-fire', color: 'text-orange-500' },
  { id: 'snakeMaster', name: 'Snake Master', description: 'Reach length 10', condition: () => snake.length >= 10, icon: 'fas fa-crown', color: 'text-purple-500' },
  { id: 'centuryClub', name: 'Century Club', description: 'Score 100 points', condition: () => score >= 100, icon: 'fas fa-trophy', color: 'text-yellow-400' }
];

// Audio context for beeps
let audioCtx;

// ================================
// UTILS: CSRF / API / TOAST / AUDIO
// ================================
function getCSRFToken() {
  return document.cookie
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith("csrftoken="))
    ?.split("=")[1] || "";
}

function trackVisit() {
  if (visitTracked) return;
  visitTracked = true;
  fetch("/accounts/add-visit/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken()
    },
    credentials: "include",
    body: JSON.stringify({ game: "snake" })
  }).catch(() => { });
}

function trackPlay() {
  fetch("/accounts/add-play/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken()
    },
    credentials: "include",
    body: JSON.stringify({})
  }).catch(() => { });
}

function saveScore(gameId, score) {
  if (typeof saveScoreToServer === 'function') {
    saveScoreToServer(gameId, score);
  }
}



function beep(freq, duration, type = "sine") {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (!audioCtx) return; // Fallback if no audio support
  }
  try {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.value = freq;
    oscillator.type = type;
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Silent fail if audio issues
  }
}

/* tiny toast */
function showToast(msg, duration = 1400) {
  const t = document.createElement("div");
  t.className = "snake-toast";
  t.textContent = msg;
  Object.assign(t.style, {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    background: "rgba(0,0,0,0.7)",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "10px",
    zIndex: 9999,
    fontFamily: "Poppins, sans-serif",
    fontSize: "13px",
    transform: "translateY(10px)",
    opacity: 0,
    transition: "all 220ms ease"
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = 1;
    t.style.transform = "translateY(0)";
  });
  setTimeout(() => {
    t.style.opacity = 0;
    t.style.transform = "translateY(10px)";
    setTimeout(() => t.remove(), 220);
  }, duration);
}

function unlockAchievement(achievementId) {
  if (unlockedAchievements.includes(achievementId)) return;
  unlockedAchievements.push(achievementId);
  localStorage.setItem("snakeAchievements", JSON.stringify(unlockedAchievements));
  const index = achievements.findIndex(a => a.id === achievementId);
  const el = document.querySelectorAll(".achievement")[index];
  if (el) {
    el.classList.remove("locked");
    el.classList.add("unlocked");
  }
  showToast(`Achievement: ${achievements.find(a => a.id === achievementId).name}`);
}

function checkAchievements() {
  achievements.forEach(a => {
    if (a.condition() && !unlockedAchievements.includes(a.id)) {
      unlockAchievement(a.id);
    }
  });
}

function initAchievements() {
  const container = document.getElementById("achievementsList");
  if (!container) return;
  container.innerHTML = "";
  achievements.forEach(a => {
    const unlocked = unlockedAchievements.includes(a.id);
    container.innerHTML += `
      <div class="achievement ${unlocked ? "unlocked" : "locked"}">
        <i class="${a.icon} ${a.color}"></i>
        <span>${a.name} - ${a.description}</span>
      </div>`;
  });
}

// ================================
// RENDER / GAME LOGIC
// ================================
function generateFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
  // regenerate if on snake
  if (snake.some(s => s.x === food.x && s.y === food.y)) {
    generateFood();
  }
}

function drawGridBackground() {
  // subtle background grid for visual clarity (light)
  ctx.fillStyle = "#0f172a"; // a darker board than previous for contrast
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= tileCount; i++) {
    ctx.beginPath();
    ctx.moveTo(i * gridSize, 0);
    ctx.lineTo(i * gridSize, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * gridSize);
    ctx.lineTo(canvas.width, i * gridSize);
    ctx.stroke();
  }
}

function drawGame() {
  drawGridBackground();

  // draw snake
  snake.forEach((seg, i) => {
    ctx.fillStyle = i === 0 ? "#06b6d4" : "#10b981";
    const x = seg.x * gridSize + 1;
    const y = seg.y * gridSize + 1;
    const size = gridSize - 2;
    // rounded rectangles for nicer visuals
    roundRect(ctx, x, y, size, size, 4);
    ctx.fill();
  });

  // draw food with tiny highlight
  ctx.fillStyle = "#ef4444";
  roundRect(ctx, food.x * gridSize + 3, food.y * gridSize + 3, gridSize - 6, gridSize - 6, 3);
  ctx.fillStyle = "#fecaca";
  ctx.fillRect(food.x * gridSize + 6, food.y * gridSize + 6, 4, 4);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function updateGame() {
  if (!gameRunning) return;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Check wall collision
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver();
    return;
  }

  // Move snake
  snake.unshift(head);

  let eating = false;
  if (head.x === food.x && head.y === food.y) {
    eating = true;
    score += 10;
    foodEaten++;
    document.getElementById("score").textContent = score;
    pulseScore();
    generateFood();
    checkAchievements();
    beep(880, 0.05, "square"); // eat beep

    // bonus logic preserved
    if (score >= 100 && !bonusGiven) {
      bonusGiven = true;
      // you can call server-side awarding here if desired
      showToast("🎉 Century reached!");
    }
  }

  if (!eating) {
    snake.pop();
  }

  // Check self-collision after move (head against body excluding head itself)
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      gameOver();
      return;
    }
  }

  drawGame();
}

// ================================
// UX Helpers: Score pulse, overlay countdown, HUD updates
// ================================
function pulseScore() {
  const el = document.getElementById("score");
  if (!el) return;
  el.style.transition = "transform 150ms ease";
  el.style.transform = "scale(1.18)";
  setTimeout(() => el.style.transform = "scale(1)", 150);
}

function showCountdownAndStart(cb) {
  const rect = canvas.getBoundingClientRect();
  const overlay = document.createElement("div");
  overlay.className = "countdown-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    left: rect.left + "px",
    top: rect.top + "px",
    width: canvas.width + "px",
    height: canvas.height + "px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    pointerEvents: "none",
    fontSize: "56px",
    color: "#fff",
    fontWeight: 800,
    textShadow: "0 6px 20px rgba(0,0,0,0.7)",
    fontFamily: "Poppins, sans-serif"
  });
  document.body.appendChild(overlay);

  let n = 3;
  overlay.textContent = n;
  const id = setInterval(() => {
    n--;
    if (n === 0) {
      overlay.textContent = "GO!";
      beep(1200, 0.06, "sine");
      setTimeout(() => {
        overlay.remove();
        clearInterval(id);
        cb();
      }, 350);
      return;
    }
    beep(600 - n * 40, 0.06, "sine");
    overlay.textContent = n;
  }, 700);
}

// ================================
// CONTROLS: keyboard, prevent scroll, touch swipe, focus capture
// ================================
/* Key mapping includes WASD. Prevent default for arrow keys/WASD so page won't scroll. */
const keyMap = {
  ArrowUp: { dx: 0, dy: -1 },
  ArrowDown: { dx: 0, dy: 1 },
  ArrowLeft: { dx: -1, dy: 0 },
  ArrowRight: { dx: 1, dy: 0 },
  w: { dx: 0, dy: -1 },
  s: { dx: 0, dy: 1 },
  a: { dx: -1, dy: 0 },
  d: { dx: 1, dy: 0 },
  W: { dx: 0, dy: -1 },
  S: { dx: 0, dy: 1 },
  A: { dx: -1, dy: 0 },
  D: { dx: 1, dy: 0 }
};

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    toggleGame();
    return;
  }
  if (keyMap[e.key]) {
    e.preventDefault(); // <-- prevents page scrolling
    const { dx: ndx, dy: ndy } = keyMap[e.key];
    // disallow 180 turn
    if (dx === -ndx && dy === -ndy) return;
    dx = ndx; dy = ndy;
  }
});

// Focus canvas to improve keyboard handling
function setupCanvasFocus() {
  if (!canvas) return;
  canvas.setAttribute("tabindex", "0");
  canvas.style.outline = "none";
  canvas.addEventListener("click", () => canvas.focus());
  canvas.addEventListener("touchstart", () => canvas.focus(), { passive: true });
}
setupCanvasFocus(); // Call early, but safe if canvas null

// Touch swipe support
let touchStartX = 0, touchStartY = 0;
function setupTouchControls() {
  if (!canvas) return;
  canvas.addEventListener("touchstart", (e) => {
    if (!e.touches || e.touches.length === 0) return;
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }, { passive: true });

  canvas.addEventListener("touchend", (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const t = e.changedTouches[0];
    const dxSwipe = t.clientX - touchStartX;
    const dySwipe = t.clientY - touchStartY;
    const absX = Math.abs(dxSwipe), absY = Math.abs(dySwipe);
    const threshold = 24; // px
    if (Math.max(absX, absY) < threshold) return;

    if (absX > absY) {
      // horizontal
      if (dxSwipe > 0) setDirectionIfNotOpposite(1, 0);
      else setDirectionIfNotOpposite(-1, 0);
    } else {
      // vertical
      if (dySwipe > 0) setDirectionIfNotOpposite(0, 1);
      else setDirectionIfNotOpposite(0, -1);
    }
  }, { passive: true });
}
setupTouchControls(); // Call early

function setDirectionIfNotOpposite(ndx, ndy) {
  if (dx === -ndx && dy === -ndy) return;
  dx = ndx; dy = ndy;
}

// ================================
// GAME STATE HANDLERS
// ================================
function startGameInternal() {
  // reset
  snake = [{ x: 10, y: 10 }];
  dx = 1; dy = 0;
  score = 0; foodEaten = 0; bonusGiven = false;
  speedLevel = 1; gameSpeed = 150;
  gameState = "playing";
  gameRunning = true;

  document.getElementById("score").textContent = score;
  document.getElementById("highScore").textContent = highScore;

  // server-side play tracking
  trackPlay();

  generateFood();
  drawGame();

  clearInterval(gameLoop);
  gameLoop = setInterval(updateGame, gameSpeed);
}

function startGame() {
  // show countdown to give user a moment
  showCountdownAndStart(startGameInternal);
}

function gameOver() {
  gameRunning = false;
  clearInterval(gameLoop);
  beep(120, 0.12, "sawtooth"); // game over sound

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("snakeHighScore", highScore);
    document.getElementById("highScore").textContent = highScore;
    showToast("New local high score! 🔥");
  } else {
    showToast("Game Over");
  }

  // Save to server
  saveScore("snake", score);

  gameState = "gameOver";
}


function toggleGame() {
  const btn = document.getElementById("playPauseBtn");
  const status = document.getElementById("gameStatus");

  if (gameState === "ready" || gameState === "gameOver") {
    startGame();
    if (btn) btn.innerHTML = `<i class="fas fa-pause mr-2"></i> Pause`;
    if (status) status.textContent = "Playing";
    return;
  }

  if (gameState === "playing") {
    gameRunning = false;
    gameState = "paused";
    clearInterval(gameLoop);
    if (btn) btn.innerHTML = `<i class="fas fa-play mr-2"></i> Resume`;
    if (status) status.textContent = "Paused";
    showToast("Paused");
  } else if (gameState === "paused") {
    gameRunning = true;
    gameState = "playing";
    gameLoop = setInterval(updateGame, gameSpeed);
    if (btn) btn.innerHTML = `<i class="fas fa-pause mr-2"></i> Pause`;
    if (status) status.textContent = "Playing";
  }
}

function resetGame() {
  gameRunning = false;
  clearInterval(gameLoop);
  snake = [{ x: 10, y: 10 }];
  dx = dy = 0;
  score = 0; foodEaten = 0;
  gameState = "ready";
  generateFood();
  drawGame();
  document.getElementById("score").textContent = score;
  document.getElementById("gameStatus").textContent = "Ready";
  document.getElementById("playPauseBtn").innerHTML = `<i class="fas fa-play mr-2"></i> Start`;
}

// Pause when user switches tabs (prevents points farming while idle)
window.addEventListener("blur", () => {
  if (gameState === "playing") {
    gameRunning = false;
    gameState = "paused";
    clearInterval(gameLoop);
    document.getElementById("playPauseBtn").innerHTML = `<i class="fas fa-play mr-2"></i> Resume`;
    document.getElementById("gameStatus").textContent = "Paused";
    showToast("Paused (tab lost)");
  }
});

// ================================
// INIT
// ================================
function initGame() {
  if (gameInitDone) return;
  gameInitDone = true;

  // Set up canvas and context
  canvas = document.getElementById('gameCanvas');
  ctx = canvas ? canvas.getContext('2d') : null;
  tileCount = canvas ? Math.floor(canvas.width / gridSize) : 0;

  // Safety checks
  if (!canvas || !ctx || tileCount <= 0) {
    console.error("Canvas not found or invalid");
    return;
  }

  // make sure canvas is focusable
  setupCanvasFocus();
  setupTouchControls();

  generateFood();
  drawGame();
  initAchievements();
  trackVisit();

  // update high score display
  const hsEl = document.getElementById("highScore");
  if (hsEl) hsEl.textContent = highScore;

  // minimal styling for toast (optional global)
  const style = document.createElement("style");
  style.textContent = `.snake-toast { backdrop-filter: blur(6px); }`;
  document.head.appendChild(style);
}

window.addEventListener("DOMContentLoaded", initGame);

// expose some functions for buttons
window.toggleGame = toggleGame;
window.resetGame = resetGame;
window.changeDirection = (dir) => {
  // helpers to let HTML buttons call direction safely
  const map = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 }
  };
  const nd = map[dir];
  if (!nd) return;
  setDirectionIfNotOpposite(nd.dx, nd.dy);
};