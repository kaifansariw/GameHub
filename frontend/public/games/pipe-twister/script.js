const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");
const rotateSound = document.getElementById("rotate-sound");
const successSound = document.getElementById("success-sound");

const restartBtn = document.getElementById("restart");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");

let pipes = [];
let running = true;

// Pipe Class
class Pipe {
    constructor(x, y, type = 'line', rotation = 0) {
        this.x = x;
        this.y = y;
        this.type = type; // 'line', 'elbow', 't', 'cross', 'blocked'
        this.rotation = rotation;
        this.size = 60;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 2);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#0ff";
        ctx.shadowColor = "#0ff";
        ctx.shadowBlur = 20;
        ctx.beginPath();
        if (this.type === 'line') {
            ctx.moveTo(-this.size/2, 0);
            ctx.lineTo(this.size/2, 0);
        } else if (this.type === 'elbow') {
            ctx.moveTo(0,0);
            ctx.lineTo(this.size/2,0);
            ctx.lineTo(this.size/2,this.size/2);
        } else if (this.type === 't') {
            ctx.moveTo(-this.size/2,0);
            ctx.lineTo(this.size/2,0);
            ctx.moveTo(0,0);
            ctx.lineTo(0,this.size/2);
        } else if (this.type === 'cross') {
            ctx.moveTo(-this.size/2,0);
            ctx.lineTo(this.size/2,0);
            ctx.moveTo(0,-this.size/2);
            ctx.lineTo(0,this.size/2);
        }
        ctx.stroke();
        ctx.restore();
    }

    contains(mx, my) {
        return mx > this.x - this.size/2 && mx < this.x + this.size/2 &&
               my > this.y - this.size/2 && my < this.y + this.size/2;
    }

    rotate() {
        this.rotation = (this.rotation + 1) % 4;
        rotateSound.play();
    }
}

// Generate Pipes
function initPipes() {
    pipes = [];
    for(let i=0;i<5;i++) {
        for(let j=0;j<5;j++){
            let type = ['line','elbow','t'][Math.floor(Math.random()*3)];
            let rotation = Math.floor(Math.random()*4);
            pipes.push(new Pipe(60 + j*100, 60 + i*100, type, rotation));
        }
    }
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pipes.forEach(p => p.draw(ctx));
}

canvas.addEventListener('click', e => {
    if(!running) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    pipes.forEach(p => {
        if(p.contains(mx,my)) {
            p.rotate();
        }
    });
    draw();
    checkWin();
});

function checkWin() {
    // Simple placeholder: if all rotations are 0 => win
    if(pipes.every(p => p.rotation===0)) {
        status.textContent = "🎉 You Completed the Puzzle!";
        successSound.play();
        running = false;
    }
}

restartBtn.addEventListener('click', () => {
    initPipes();
    running = true;
    status.textContent = "";
    draw();
});

pauseBtn.addEventListener('click', () => {
    running = false;
    resumeBtn.disabled = false;
});

resumeBtn.addEventListener('click', () => {
    running = true;
    resumeBtn.disabled = true;
});

initPipes();
draw();
