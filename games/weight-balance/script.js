let score = 0;
let gameInterval;
let isPaused = false;

const leftPan = document.getElementById("left-pan");
const rightPan = document.getElementById("right-pan");
const bulbs = document.querySelectorAll(".bulb");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");

const successSound = document.getElementById("success-sound");
const failSound = document.getElementById("fail-sound");

function lightBulbs(count) {
    bulbs.forEach((bulb, idx) => {
        bulb.classList.toggle("active", idx < count);
    });
}

function addObstacle() {
    const weight = document.createElement("div");
    weight.className = "weight";
    weight.style.width = `${Math.random() * 40 + 20}px`;
    weight.style.height = `${Math.random() * 40 + 20}px`;
    weight.style.backgroundColor = "red";
    weight.style.position = "absolute";
    weight.style.left = `${Math.random() * 180}px`;
    weight.style.top = "-50px";
    document.body.appendChild(weight);

    let pos = -50;
    const fallInterval = setInterval(() => {
        if (!isPaused) {
            pos += 5;
            weight.style.top = pos + "px";

            const rect = weight.getBoundingClientRect();
            const panRect = leftPan.getBoundingClientRect();
            if (
                rect.top + rect.height >= panRect.top &&
                rect.left + rect.width > panRect.left &&
                rect.right < panRect.right
            ) {
                score++;
                scoreEl.textContent = "Score: " + score;
                successSound.play();
                lightBulbs(score % 6);
                weight.remove();
                clearInterval(fallInterval);
            } else if (pos > window.innerHeight) {
                failSound.play();
                weight.remove();
                clearInterval(fallInterval);
            }
        }
    }, 30);
}

function startGame() {
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(addObstacle, 1000);
    messageEl.textContent = "Game Started!";
}

function pauseGame() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    messageEl.textContent = isPaused ? "Game Paused" : "Game Resumed";
}

function restartGame() {
    isPaused = false;
    score = 0;
    scoreEl.textContent = "Score: " + score;
    lightBulbs(0);
    messageEl.textContent = "Game Restarted!";
}

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
restartBtn.addEventListener("click", restartGame);
