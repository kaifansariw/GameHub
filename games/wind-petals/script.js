const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 800;

let petals = [];
let obstacles = [];
let score = 0;
let animationId;
let gameRunning = false;

// Audio
const windSound = document.getElementById("windSound");
const collectSound = document.getElementById("collectSound");

// Petal class
class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.radius = 10 + Math.random() * 10;
        this.speed = 1 + Math.random() * 2;
        this.angle = Math.random() * Math.PI * 2;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,182,193,0.8)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff69b4";
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 1.5;
        this.angle += 0.05;
    }
}

// Obstacle class
class Obstacle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw() {
        ctx.fillStyle = "rgba(255, 105, 180, 0.7)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff1493";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

// Initialize obstacles
function initObstacles() {
    obstacles = [
        new Obstacle(100, 300, 150, 20),
        new Obstacle(350, 500, 200, 20),
        new Obstacle(200, 650, 180, 20)
    ];
}

// Spawn petals
function spawnPetals() {
    if(petals.length < 15) {
        petals.push(new Petal());
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    petals.forEach((p, i) => {
        p.update();
        p.draw();
        // Check collision with obstacles
        obstacles.forEach(obs => {
            if(p.x > obs.x && p.x < obs.x + obs.w && p.y + p.radius > obs.y && p.y - p.radius < obs.y + obs.h) {
                p.y = obs.y - p.radius; // simple collision response
            }
        });
        // Collect at bottom
        if(p.y > canvas.height) {
            score += 1;
            document.getElementById("score").textContent = score;
            collectSound.play();
            petals.splice(i,1);
        }
    });
    obstacles.forEach(obs => obs.draw());
}

// Animation loop
function animate() {
    draw();
    if(gameRunning) animationId = requestAnimationFrame(animate);
}

// Control buttons
document.getElementById("startBtn").addEventListener("click", () => {
    if(!gameRunning){
        gameRunning = true;
        windSound.play();
        animate();
    }
});

document.getElementById("pauseBtn").addEventListener("click", () => {
    gameRunning = false;
    windSound.pause();
    cancelAnimationFrame(animationId);
});

document.getElementById("restartBtn").addEventListener("click", () => {
    petals = [];
    score = 0;
    document.getElementById("score").textContent = score;
    gameRunning = false;
    windSound.pause();
    cancelAnimationFrame(animationId);
    initObstacles();
});

// Wind control (mouse drag)
canvas.addEventListener("mousemove", e => {
    petals.forEach(p => {
        if(e.buttons > 0){
            let dx = e.offsetX - p.x;
            let dy = e.offsetY - p.y;
            p.x += dx * 0.01;
            p.y += dy * 0.01;
        }
    });
});

// Spawn petals every 0.5 seconds
setInterval(spawnPetals, 500);

// Initialize
initObstacles();
