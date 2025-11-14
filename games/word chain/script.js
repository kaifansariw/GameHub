let currentWord = "";
let usedWords = new Set();
let score = 0;

const currentWordEl = document.getElementById("currentWord");
const input = document.getElementById("userInput");
const msg = document.getElementById("message");
const scoreEl = document.getElementById("score");

document.getElementById("submitBtn").addEventListener("click", handleWord);

function handleWord() {
  const word = input.value.trim().toLowerCase();

  if (word.length < 2) {
    showMessage("❌ Word is too short!");
    return;
  }

  if (usedWords.has(word)) {
    endGame("❌ Word already used!");
    return;
  }

  if (currentWord !== "") {
    if (word[0] !== currentWord[currentWord.length - 1]) {
      endGame(`❌ Word must start with '${currentWord[currentWord.length - 1]}'`);
      return;
    }
  }

  usedWords.add(word);
  currentWord = word;
  currentWordEl.textContent = `Next word must start with: ${currentWord[currentWord.length - 1]}`;
  score++;
  scoreEl.textContent = "Score: " + score;
  msg.textContent = "";
  input.value = "";
}

function showMessage(text) {
  msg.textContent = text;
}

function endGame(reason) {
  alert(`Game Over!\n${reason}\nFinal Score: ${score}`);
  location.reload();
}
