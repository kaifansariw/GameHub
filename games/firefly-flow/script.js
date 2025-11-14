const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let fireflies = [];
let obstacles = [];
let score = 0;
let animationId;
let gamePaused = false;

const bgm = document.getElementById('bgm');
const hitSound = document.getElementById('hitSound');

class Firefly {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.speed = 2 + Math.random() * 2;
        this.color = 'cyan';
        this.glow = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.glow;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speed;
        this.glow = Math.sin(Date.now() / 100) * 20 + 20;
        this.draw();
    }
}

class Obstacle {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function init(){
    fireflies = [];
    obstacles = [];
    score = 0;
    for(let i=0;i<5;i++){
        fireflies.push(new Firefly(50, 50 + i*60));
    }
    // Add random obstacles
    for(let i=0;i<5;i++){
        obstacles.push(new Obstacle(200 + i*100, Math.random()*350, 20, 50));
    }
}

function detectCollision(firefly, obstacle){
    return firefly.x + firefly.radius > obstacle.x &&
           firefly.x - firefly.radius < obstacle.x + obstacle.width &&
           firefly.y + firefly.radius > obstacle.y &&
           firefly.y - firefly.radius < obstacle.y + obstacle.height;
}

function update(){
    if(gamePaused) return;

    ctx.clearRect(0,0,canvas.width, canvas.height);

    fireflies.forEach(f => {
        f.update();
        obstacles.forEach(obs => {
            obs.draw();
            if(detectCollision(f, obs)){
                hitSound.currentTime = 0;
                hitSound.play();
                f.x = 50; // Reset firefly
                score -= 1;
            }
        });
    });

    document.getElementById('score').textContent = 'Score: ' + score;

    animationId = requestAnimationFrame(update);
}

document.getElementById('startBtn').addEventListener('click', () => {
    bgm.play();
    init();
    gamePaused = false;
    cancelAnimationFrame(animationId);
    update();
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    gamePaused = true;
    bgm.pause();
});

document.getElementById('resumeBtn').addEventListener('click', () => {
    gamePaused = false;
    bgm.play();
    update();
});

document.getElementById('restartBtn').addEventListener('click', () => {
    bgm.currentTime = 0;
    bgm.play();
    init();
    gamePaused = false;
    cancelAnimationFrame(animationId);
    update();
});
