const symbols = ["🔴", "🔵", "🟢", "🟡", "🟣", "🟠"];
let targetPattern = [];
let currentPattern = [];
let selectedIndex = null;
let timer = 60;
let interval = null;
let paused = false;

const line = document.getElementById("symbol-line");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");
const messageEl = document.getElementById("message");
const timerEl = document.getElementById("timer");

const swapSound = document.getElementById("swap-sound");
const successSound = document.getElementById("success-sound");
const failSound = document.getElementById("fail-sound");

// Generate random pattern
function generatePattern(length = 8) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(symbols[Math.floor(Math.random() * symbols.length)]);
  }
  return arr;
}

// Render symbols
function renderLine() {
  line.innerHTML = "";
  currentPattern.forEach((sym, i) => {
    const span = document.createElement("span");
    span.className = "symbol";
    span.textContent = sym;
    span.addEventListener("click", () => selectSymbol(i));
    if (i === selectedIndex) span.classList.add("selected");
    line.appendChild(span);
  });
}

// Handle selection and swap
function selectSymbol(index) {
  if (paused) return;
  if (selectedIndex === null) {
    selectedIndex = index;
    renderLine();
  } else {
    [currentPattern[selectedIndex], currentPattern[index]] = [currentPattern[index], currentPattern[selectedIndex]];
    swapSound.play();
    selectedIndex = null;
    renderLine();
    checkWin();
  }
}

// Check win
function checkWin() {
  if (currentPattern.join("") === targetPattern.join("")) {
    messageEl.textContent = "🎉 You Matched the Pattern!";
    successSound.play();
    clearInterval(interval);
  }
}

// Timer
function startTimer() {
  interval = setInterval(() => {
    if (!paused) {
      timer--;
      timerEl.textContent = `Time: ${timer}s`;
      if (timer <= 0) {
        clearInterval(interval);
        messageEl.textContent = `💀 Time's up! Pattern was: ${targetPattern.join("")}`;
        failSound.play();
      }
    }
  }, 1000);
}

// Controls
startBtn.addEventListener("click", () => {
  timer = 60;
  paused = false;
  targetPattern = generatePattern();
  currentPattern = [...generatePattern()];
  selectedIndex = null;
  messageEl.textContent = "";
  renderLine();
  clearInterval(interval);
  startTimer();
});

pauseBtn.addEventListener("click", () => {
  paused = !paused;
  pauseBtn.textContent = paused ? "Resume" : "Pause";
});

restartBtn.addEventListener("click", () => {
  timer = 60;
  paused = false;
  targetPattern = generatePattern();
  currentPattern = [...generatePattern()];
  selectedIndex = null;
  messageEl.textContent = "";
  renderLine();
  clearInterval(interval);
  startTimer();
