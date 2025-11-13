const player = document.getElementById("player");
const gameArea = document.getElementById("game-area");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const restartBtn = document.getElementById("restart-btn");
const jumpSound = document.getElementById("jump-sound");
const hitSound = document.getElementById("hit-sound");

let gameInterval;
let obstacleInterval;
let score = 0;
let playerBottom = 0;
let isJumping = false;
let obstacles = [];
let gamePaused = false;

function startGame() {
    resetGame();
    gameInterval = setInterval(gameLoop, 20);
    obstacleInterval = setInterval(createObstacle, 2000);
}

function pauseGame() {
    gamePaused = true;
}

function resumeGame() {
    gamePaused = false;
}

function restartGame() {
    resetGame();
    startGame();
}

function resetGame() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    obstacles.forEach(obs => obs.remove());
    obstacles = [];
    playerBottom = 0;
    isJumping = false;
    score = 0;
    scoreEl.textContent = score;
    player.style.bottom = playerBottom + "px";
    gamePaused = false;
}

function jump() {
    if (!isJumping && !gamePaused) {
        isJumping = true;
        jumpSound.play();
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight >= 100) {
                clearInterval(jumpInterval);
                fall();
            } else {
                jumpHeight += 5;
                playerBottom += 5;
                player.style.bottom = playerBottom + "px";
            }
        }, 20);
    }
}

function fall() {
    const fallInterval = setInterval(() => {
        if (playerBottom <= 0) {
            playerBottom = 0;
            player.style.bottom = playerBottom + "px";
            isJumping = false;
            clearInterval(fallInterval);
        } else {
            playerBottom -= 5;
            player.style.bottom = playerBottom + "px";
        }
    }, 20);
}

function createObstacle() {
    if (gamePaused) return;
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.left = "600px";
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);

    const moveObstacle = setInterval(() => {
        if (gamePaused) return;
        let obstacleLeft = parseInt(obstacle.style.left);
        if (obstacleLeft <= -40) {
            obstacle.remove();
            obstacles.shift();
            score++;
            scoreEl.textContent = score;
            clearInterval(moveObstacle);
        } else if (obstacleLeft < 100 && playerBottom < 40) {
            hitSound.play();
            alert("Game Over! Your Score: " + score);
            restartGame();
            clearInterval(moveObstacle);
        } else {
            obstacle.style.left = obstacleLeft - 5 + "px";
        }
    }, 20);
}

function gameLoop() {
    // can add glow effect dynamically or more advanced UI later
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump();
});

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
resumeBtn.addEventListener("click", resumeGame);
restartBtn.addEventListener("click", restartGame);
