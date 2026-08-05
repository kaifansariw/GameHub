const tiles = document.querySelectorAll(".tile");
const startBtn = document.getElementById("startBtn");
const scoreEl = document.getElementById("score");
const msg = document.getElementById("message");

let sequence = [];
let userSequence = [];
let level = 0;
let clickable = false;

startBtn.addEventListener("click", startGame);

tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    if (!clickable) return;
    const id = tile.id;
    userSequence.push(id);
    flash(tile);

    if (userSequence.at(-1) != sequence[userSequence.length - 1]) {
      endGame();
      return;
    }

    if (userSequence.length === sequence.length) {
      level++;
      scoreEl.textContent = "Score: " + level;
      userSequence = [];
      setTimeout(nextRound, 900);
    }
  });
});

function startGame() {
  sequence = [];
  userSequence = [];
  level = 0;
  msg.textContent = "";
  scoreEl.textContent = "Score: 0";
  nextRound();
}

function nextRound() {
  clickable = false;
  const rand = Math.floor(Math.random() * 4);
  sequence.push(rand);
  playSequence();
}

function playSequence() {
  let i = 0;

  const interval = setInterval(() => {
    const tile = document.getElementById(sequence[i]);
    flash(tile);
    i++;

    if (i >= sequence.length) {
      clearInterval(interval);
      clickable = true;
    }
  }, 700);
}

function flash(tile) {
  tile.classList.add("active");
  setTimeout(() => tile.classList.remove("active"), 300);
}

function endGame() {
  alert("Game Over! Final Score: " + level);
  clickable = false;
}
