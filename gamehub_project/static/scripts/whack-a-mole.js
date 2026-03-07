// Whack-A-Mole Game Logic

let score = 0;
let timeLeft = 30;
let highScore = Number(localStorage.getItem("whackAMoleHighScore") || 0);
let gameRunning = false;
let gameTimer = null;
let moleTimer = null;
let currentMole = null;
let moleSpeed = 1000; // milliseconds before mole hides
let spawnRate = 800; // milliseconds between mole spawns
let difficulty = 1;
let visitTracked = false;

// DOM Elements
let scoreDisplay;
let timeDisplay;
let highScoreDisplay;
let startBtn;
let resetBtn;
let playAgainBtn;
let gameOverModal;
let finalScoreDisplay;
let newHighScoreMsg;
let moleHoles = [];

// Audio context for sound effects
let audioCtx;


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
    body: JSON.stringify({ game: "whack-a-mole" })
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
    if (!audioCtx) return;
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

function showToast(msg, duration = 1400) {
  const t = document.createElement("div");
  t.className = "whack-toast";
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

// ================================
// GAME INITIALIZATION
// ================================
function initGame() {
  // Get DOM elements
  scoreDisplay = document.getElementById("score");
  timeDisplay = document.getElementById("timeLeft");
  highScoreDisplay = document.getElementById("highScore");
  startBtn = document.getElementById("startBtn");
  resetBtn = document.getElementById("resetBtn");
  playAgainBtn = document.getElementById("playAgainBtn");
  gameOverModal = document.getElementById("gameOverModal");
  finalScoreDisplay = document.getElementById("finalScore");
  newHighScoreMsg = document.getElementById("newHighScoreMsg");

  // Generate mole holes
  generateMoleGrid();

  // Update displays
  updateDisplay();

  // Event listeners
  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);
  playAgainBtn.addEventListener("click", playAgain);

  // Track visit
  trackVisit();
}

function generateMoleGrid() {
  const grid = document.getElementById("moleGrid");
  grid.innerHTML = "";
  moleHoles = [];

  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.className = "mole-hole";
    hole.dataset.index = i;

    const mole = document.createElement("div");
    mole.className = "mole";

    // Create image element for mole
    const moleImg = document.createElement("img");
    moleImg.src = "/static/assets/mole.png";
    moleImg.alt = "Mole";
    moleImg.style.width = "100%";
    moleImg.style.height = "100%";
    moleImg.style.objectFit = "contain";
    mole.appendChild(moleImg);

    hole.appendChild(mole);
    grid.appendChild(hole);

    // Add click handler
    hole.addEventListener("click", () => handleMoleClick(i));

    moleHoles.push({ element: hole, moleElement: mole, active: false });
  }
}

function updateDisplay() {
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  highScoreDisplay.textContent = highScore;
}

// ================================
// GAME LOGIC
// ================================
function startGame() {
  if (gameRunning) return;

  // Reset state
  score = 0;
  timeLeft = 30;
  difficulty = 1;
  moleSpeed = 1000;
  spawnRate = 800;
  gameRunning = true;

  // Update UI
  updateDisplay();
  startBtn.disabled = true;
  gameOverModal.classList.add("hidden");

  // Hide all moles
  moleHoles.forEach(hole => hideMole(hole));

  trackPlay();

  startGameTimer();
  startMoleSpawning();

  beep(440, 0.1);
  showToast("Game Started! Whack those moles!");
}

function startGameTimer() {
  gameTimer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    // Increase difficulty every 10 seconds
    if (timeLeft % 10 === 0 && timeLeft > 0) {
      increaseDifficulty();
    }

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function startMoleSpawning() {
  spawnMole();
  moleTimer = setInterval(() => {
    spawnMole();
  }, spawnRate);
}

function spawnMole() {
  if (!gameRunning) return;

  // Hide current mole if any
  if (currentMole !== null) {
    hideMole(moleHoles[currentMole]);
  }

  // Get random hole that's not currently active
  const availableHoles = moleHoles
    .map((hole, index) => ({ hole, index }))
    .filter(({ hole }) => !hole.active);

  if (availableHoles.length === 0) return;

  const randomIndex = Math.floor(Math.random() * availableHoles.length);
  const { index } = availableHoles[randomIndex];

  // Show mole
  showMole(moleHoles[index], index);
  currentMole = index;

  // Auto-hide mole after moleSpeed milliseconds
  setTimeout(() => {
    if (gameRunning && currentMole === index) {
      hideMole(moleHoles[index]);
      currentMole = null;
    }
  }, moleSpeed);
}

function showMole(hole, index) {
  hole.active = true;
  hole.moleElement.classList.add("active");
}

function hideMole(hole) {
  hole.active = false;
  hole.moleElement.classList.remove("active", "hit");
}

function handleMoleClick(index) {
  if (!gameRunning) return;

  const hole = moleHoles[index];
  if (!hole.active) return;

  // Mole was hit!
  score += 10;
  updateDisplay();


  hole.moleElement.classList.add("hit");


  beep(800, 0.05, "square");

  // Hide mole
  setTimeout(() => {
    hideMole(hole);
    if (currentMole === index) {
      currentMole = null;
    }
  }, 200);
}

function increaseDifficulty() {
  difficulty++;

  // Decrease mole display time (minimum 300ms)
  moleSpeed = Math.max(300, moleSpeed - 100);

  // Decrease spawn rate (minimum 400ms)
  spawnRate = Math.max(400, spawnRate - 100);

  // Restart spawning with new rate
  clearInterval(moleTimer);
  moleTimer = setInterval(() => {
    spawnMole();
  }, spawnRate);

  showToast(`Difficulty increased! Level ${difficulty}`);
  beep(600, 0.1);
}

function endGame() {
  gameRunning = false;


  clearInterval(gameTimer);
  clearInterval(moleTimer);

  // Hide all moles
  moleHoles.forEach(hole => hideMole(hole));


  let isNewHighScore = false;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("whackAMoleHighScore", highScore);
    highScoreDisplay.textContent = highScore;
    isNewHighScore = true;
  }

  // Show game over modal
  finalScoreDisplay.textContent = score;
  if (isNewHighScore) {
    newHighScoreMsg.style.display = "block";
    beep(880, 0.3);
  } else {
    newHighScoreMsg.style.display = "none";
    beep(200, 0.3);
  }

  gameOverModal.classList.remove("hidden");
  startBtn.disabled = false;

  // Save to server
  saveScore("whack-a-mole", score);
}


function resetGame() {
  // Stop any running game
  if (gameRunning) {
    gameRunning = false;
    clearInterval(gameTimer);
    clearInterval(moleTimer);
  }

  // Reset state
  score = 0;
  timeLeft = 30;
  difficulty = 1;
  moleSpeed = 1000;
  spawnRate = 800;
  currentMole = null;

  // Hide all moles
  moleHoles.forEach(hole => hideMole(hole));

  // Update display
  updateDisplay();
  gameOverModal.classList.add("hidden");
  startBtn.disabled = false;

  beep(440, 0.1);
}

function playAgain() {
  resetGame();
  setTimeout(() => startGame(), 100);
}

// ================================
// INITIALIZE ON PAGE LOAD
// ================================
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGame);
} else {
  initGame();
}
