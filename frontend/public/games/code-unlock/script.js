const bulbContainer = document.getElementById('bulb-sequence');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');
const statusEl = document.getElementById('status');

const successSound = document.getElementById('success-sound');
const failSound = document.getElementById('fail-sound');

let sequence = [];
let userSequence = [];
let bulbs = [];
let gameStarted = false;
let paused = false;

// Number of bulbs
const BULB_COUNT = 6;

// Initialize bulbs
function initBulbs() {
  bulbContainer.innerHTML = '';
  bulbs = [];
  for (let i = 0; i < BULB_COUNT; i++) {
    const bulb = document.createElement('div');
    bulb.classList.add('bulb');
    bulb.addEventListener('click', () => handleClick(i));
    bulbContainer.appendChild(bulb);
    bulbs.push(bulb);
  }
}

// Generate random sequence
function generateSequence() {
  sequence = [];
  for (let i = 0; i < BULB_COUNT; i++) {
    sequence.push(Math.floor(Math.random() * BULB_COUNT));
  }
  console.log('Sequence:', sequence);
}

// Start game
function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  paused = false;
  userSequence = [];
  statusEl.textContent = 'Game started! Click the bulbs in order.';
  generateSequence();
  animateSequence();
}

// Animate sequence for player
function animateSequence() {
  bulbs.forEach(b => b.classList.remove('glow'));
  sequence.forEach((index, i) => {
    setTimeout(() => {
      if (!paused) {
        bulbs[index].classList.add('glow');
        setTimeout(() => bulbs[index].classList.remove('glow'), 500);
      }
    }, i * 700);
  });
}

// Handle click
function handleClick(index) {
  if (!gameStarted || paused) return;

  bulbs[index].classList.add('glow');
  setTimeout(() => bulbs[index].classList.remove('glow'), 300);

  userSequence.push(index);

  if (userSequence.at(-1) !== sequence[userSequence.length - 1]) {
    failSound.play();
    statusEl.textContent = 'Wrong bulb! Try again.';
    userSequence = [];
  } else {
    successSound.play();
    if (userSequence.length === sequence.length) {
      statusEl.textContent = '🎉 You unlocked the code!';
      gameStarted = false;
    }
  }
}

// Pause game
pauseBtn.addEventListener('click', () => {
  paused = !paused;
  statusEl.textContent = paused ? 'Game paused' : 'Game resumed';
});

// Restart game
restartBtn.addEventListener('click', () => {
  gameStarted = false;
  paused = false;
  userSequence = [];
  statusEl.textContent = 'Game restarted! Click Start.';
  bulbs.forEach(b => b.classList.remove('glow'));
});

// Start button
startBtn.addEventListener('click', startGame);

// Initialize on load
initBulbs();
