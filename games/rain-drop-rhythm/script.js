const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const sourceBtn = document.getElementById('sourceBtn');
const scoreEl = document.getElementById('score');

let animationId;
let raindrops = [];
let score = 0;
let gameRunning = false;

// Online sound for hit
const hitSound = new Audio('https://freesound.org/data/previews/256/256113_3263906-lq.mp3'); 
// Background music
const bgMusic = new Audio('https://freesound.org/data/previews/436/436070_2305276-lq.mp3'); 
bgMusic.loop = true;

function createRaindrop() {
    const x = Math.random() * canvas.width;
    const y = -20;
    const size = Math.random() * 20 + 10;
    const speed = Math.random() * 3 + 2;
    raindrops.push({ x, y, size, speed, hit: false });
}

function drawRaindrops() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
        ctx.fillStyle = drop.hit ? 'rgba(255,255,255,0.8)' : 'rgba(0,255,255,0.8)';
        ctx.shadowColor = 'cyan';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.closePath();
        drop.y += drop.speed;
    });
}

function checkHit(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    raindrops.forEach(drop => {
        const dx = drop.x - mx;
        const dy = drop.y - my;
        if (!drop.hit && Math.sqrt(dx*dx + dy*dy) < drop.size) {
            drop.hit = true;
            score += 10;
            scoreEl.textContent = `Score: ${score}`;
            hitSound.currentTime = 0;
            hitSound.play();
        }
    });
}

function gameLoop() {
    drawRaindrops();
    if(Math.random() < 0.02) createRaindrop();
    animationId = requestAnimationFrame(gameLoop);
}

// Event listeners
canvas.addEventListener('click', checkHit);

startBtn.addEventListener('click', () => {
    if(!gameRunning) {
        gameRunning = true;
        bgMusic.play();
        gameLoop();
    }
});

pauseBtn.addEventListener('click', () => {
    if(gameRunning) {
        gameRunning = false;
        cancelAnimationFrame(animationId);
        bgMusic.pause();
    }
});

restartBtn.addEventListener('click', () => {
    raindrops = [];
    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    if(!gameRunning) {
        gameRunning = true;
        bgMusic.currentTime = 0;
        bgMusic.play();
        gameLoop();
    }
});

sourceBtn.addEventListener('click', () => {
    window.open('https://github.com/yourusername/mini-js-games-hub/tree/main/games/rain-drop-rhythm', '_blank');
});
