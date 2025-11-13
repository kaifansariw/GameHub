const tileRow = document.getElementById("tile-row");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const restartBtn = document.getElementById("restart-btn");

const sequenceLength = 8;
const tilesCount = 12;
let sequence = [];
let userIndex = 0;
let clickable = false;
let interval;
let paused = false;

// Sounds via online links
const soundCorrect = new Audio("https://www.soundjay.com/button/sounds/button-3.mp3");
const soundWrong = new Audio("https://www.soundjay.com/button/sounds/button-10.mp3");
const soundStart = new Audio("https://www.soundjay.com/button/sounds/button-2.mp3");
const soundWin = new Audio("https://www.soundjay.com/button/sounds/button-4.mp3");

// Initialize tiles
let tiles = [];
for (let i = 0; i < tilesCount; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tileRow.appendChild(tile);
    tiles.push(tile);

    tile.addEventListener("click", () => {
        if (!clickable || paused) return;
        if (tile.classList.contains("obstacle")) {
            statusEl.textContent = "💥 You clicked an obstacle!";
            soundWrong.play();
            endGame(false);
            return;
        }

        if (tile === sequence[userIndex]) {
            tile.classList.add("glow");
            soundCorrect.play();
            userIndex++;
            if (userIndex >= sequence.length) {
                endGame(true);
            }
        } else {
            soundWrong.play();
            statusEl.textContent = "❌ Wrong tile!";
            endGame(false);
        }
    });
}

function generateSequence() {
    sequence = [];
    const possibleTiles = tiles.filter(t => !t.classList.contains("obstacle"));
    for (let i = 0; i < sequenceLength; i++) {
        const tile = possibleTiles[Math.floor(Math.random() * possibleTiles.length)];
        sequence.push(tile);
    }
}

// Randomly add obstacles
function addObstacles() {
    tiles.forEach(t => t.classList.remove("obstacle"));
    const obsCount = 2; // number of obstacles
    for (let i = 0; i < obsCount; i++) {
        const obsTile = tiles[Math.floor(Math.random() * tiles.length)];
        obsTile.classList.add("obstacle");
    }
}

// Glow sequence display
function displaySequence() {
    let i = 0;
    clickable = false;
    statusEl.textContent = "Watch the sequence...";
    interval = setInterval(() => {
        if (paused) return;
        tiles.forEach(t => t.classList.remove("glow"));
        if (i >= sequence.length) {
            clearInterval(interval);
            tiles.forEach(t => t.classList.remove("glow"));
            clickable = true;
            userIndex = 0;
            statusEl.textContent = "Your turn! Click the tiles in order.";
            return;
        }
        sequence[i].classList.add("glow");
        i++;
    }, 800);
}

function startGame() {
    tiles.forEach(t => t.classList.remove("glow"));
    soundStart.play();
    addObstacles();
    generateSequence();
    displaySequence();
}

function endGame(win) {
    clickable = false;
    clearInterval(interval);
    if (win) {
        statusEl.textContent = "🎉 You won!";
        soundWin.play();
    } else {
        statusEl.textContent += " Game Over!";
    }
}

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", () => paused = true);
resumeBtn.addEventListener("click", () => paused = false);
restartBtn.addEventListener("click", startGame);
