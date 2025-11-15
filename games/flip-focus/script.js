const board = document.getElementById("game-board");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const restartBtn = document.getElementById("restart-btn");

const clickSound = document.getElementById("click-sound");
const wrongSound = document.getElementById("wrong-sound");
const bgMusic = document.getElementById("bg-music");

let score = 0;
let lives = 3;
let interval;
let gamePaused = false;

function createOrb(id) {
    const orb = document.createElement("div");
    orb.classList.add("orb");
    orb.dataset.id = id;
    orb.addEventListener("click", () => {
        if (gamePaused) return;
        if (orb.classList.contains("obstacle")) {
            lives--;
            livesEl.textContent = lives;
            wrongSound.play();
            if (lives <= 0) stopGame();
            return;
        }
        orb.classList.add("clicked");
        score++;
        scoreEl.textContent = score;
        clickSound.play();
    });
    return orb;
}

function addObstacles(count) {
    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * board.children.length);
        const child = board.children[index];
        if (!child.classList.contains("obstacle")) {
            child.classList.add("obstacle");
        }
    }
}

function startGame() {
    board.innerHTML = "";
    score = 0;
    lives = 3;
    scoreEl.textContent = score;
    livesEl.textContent = lives;
    gamePaused = false;
    bgMusic.play();

    for (let i = 0; i < 10; i++) {
        board.appendChild(createOrb(i));
    }
    addObstacles(3);

    interval = setInterval(() => {
        if (!gamePaused) {
            // Randomly glow orbs
            board.childNodes.forEach((orb) => {
                if (!orb.classList.contains("clicked")) {
                    orb.style.boxShadow = `0 0 15px #0ff, 0 0 30px #0ff, 0 0 45px #0ff`;
                }
            });
        }
    }, 1000);
}

function stopGame() {
    gamePaused = true;
    clearInterval(interval);
    alert("Game Over! Your Score: " + score);
    bgMusic.pause();
}

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", () => {
    gamePaused = true;
    bgMusic.pause();
});
resumeBtn.addEventListener("click", () => {
    gamePaused = false;
    bgMusic.play();
});
restartBtn.addEventListener("click", startGame);
