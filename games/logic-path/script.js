const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreEl = document.getElementById("score");

let animationId;
let paused = false;
let score = 0;

// Orb
const orb = {
    x: 50,
    y: canvas.height / 2,
    radius: 20,
    color: "cyan",
    speed: 3
};

// Obstacles
let obstacles = [];
function generateObstacles() {
    obstacles = [];
    for (let i = 0; i < 10; i++) {
        obstacles.push({
            x: 200 + i * 60,
            y: Math.random() * (canvas.height - 40),
            width: 20,
            height: 20,
            color: "red"
        });
    }
}

// Sounds (online links)
const hitSound = new Audio("https://freesound.org/data/previews/466/466512_7037-lq.mp3");
const scoreSound = new Audio("https://freesound.org/data/previews/320/320655_5260872-lq.mp3");

// Draw orb
function drawOrb() {
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    ctx.fillStyle = orb.color;
    ctx.shadowColor = "#0ff";
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.closePath();
}

// Draw obstacles
function drawObstacles() {
    obstacles.forEach(obs => {
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

// Move orb with arrow keys
document.addEventListener("keydown", e => {
    if (!paused) {
        if (e.key === "ArrowUp") orb.y -= orb.speed;
        if (e.key === "ArrowDown") orb.y += orb.speed;
        if (e.key === "ArrowLeft") orb.x -= orb.speed;
        if (e.key === "ArrowRight") orb.x += orb.speed;
    }
});

// Check collisions
function checkCollisions() {
    for (let obs of obstacles) {
        if (
            orb.x + orb.radius > obs.x &&
            orb.x - orb.radius < obs.x + obs.width &&
            orb.y + orb.radius > obs.y &&
            orb.y - orb.radius < obs.y + obs.height
        ) {
            hitSound.play();
            cancelAnimationFrame(animationId);
            alert("Game Over!");
            return true;
        }
    }
    if (orb.x > canvas.width - orb.radius) {
        scoreSound.play();
        alert("You Win! Score: " + score);
        cancelAnimationFrame(animationId);
        return true;
    }
    return false;
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOrb();
    drawObstacles();
    if (!checkCollisions()) {
        animationId = requestAnimationFrame(draw);
    }
}

// Button functions
startBtn.addEventListener("click", () => {
    paused = false;
    score = 0;
    orb.x = 50;
    orb.y = canvas.height / 2;
    generateObstacles();
    draw();
});

pauseBtn.addEventListener("click", () => {
    paused = true;
    cancelAnimationFrame(animationId);
});

resumeBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        draw();
    }
});

restartBtn.addEventListener("click", () => {
    paused = false;
    score = 0;
    orb.x = 50;
    orb.y = canvas.height / 2;
    generateObstacles();
    draw();
});
