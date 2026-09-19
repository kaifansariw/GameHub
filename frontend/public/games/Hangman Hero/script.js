const words = ["javascript", "galaxy", "puzzle", "computer", "hangman", "developer", "network"];
let selectedWord = "";
let guessedLetters = [];
let wrongAttempts = 0;

const maxAttempts = 6;

const wordContainer = document.getElementById("word");
const keyboard = document.getElementById("keyboard");
const statusText = document.getElementById("status");
const hangmanImg = document.getElementById("hangman-img");

// Initialize Game
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongAttempts = 0;
    statusText.textContent = "";
    hangmanImg.src = `Assets/0.png`;
    displayWord();
    generateKeyboard();
}

function displayWord() {
    wordContainer.innerHTML = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

function generateKeyboard() {
    keyboard.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const btn = document.createElement("button");
        btn.textContent = String.fromCharCode(i);
        btn.addEventListener("click", () => handleGuess(btn));
        keyboard.appendChild(btn);
    }
}

function handleGuess(btn) {
    const letter = btn.textContent.toLowerCase();
    btn.disabled = true;

    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        displayWord();

        if (!wordContainer.textContent.includes("_")) {
            statusText.textContent = "🎉 You Won! Hero!";
            disableAllButtons();
        }
    } else {
        wrongAttempts++;
        hangmanImg.src = `./Assets/${wrongAttempts}.png`;

        if (wrongAttempts >= maxAttempts) {
            statusText.textContent = `💀 Game Over! Word: ${selectedWord}`;
            disableAllButtons();
        }
    }
}

function disableAllButtons() {
    document.querySelectorAll(".keyboard button").forEach(btn => btn.disabled = true);
}

document.getElementById("reset-btn").addEventListener("click", startGame);

startGame();
