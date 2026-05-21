const canvas = document.getElementById("sandCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

let drawing = false;
let particles = [];
let animationId;
let color = document.getElementById("color-picker").value;
let thickness = document.getElementById("thickness").value;

const drawSound = document.getElementById("draw-sound");

// Obstacles
const obstacles = [];
for(let i=0; i<5; i++){
    obstacles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 30 + Math.random()*50
    });
}

// Particle class
class Particle {
    constructor(x, y, color, size){
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size;
        this.life = 50;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fill();
    }
    update(){
        this.life--;
        this.y -= 0.5;
        this.draw();
    }
}

// Mouse events
canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);
canvas.addEventListener("mousemove", (e) => {
    if(drawing){
        const particle = new Particle(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, color, thickness);
        particles.push(particle);
        drawSound.currentTime = 0;
        drawSound.play();
    }
});

// Animation loop
function animate(){
    ctx.fillStyle = "rgba(17,17,17,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Draw obstacles
    obstacles.forEach(obs => {
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius,0,Math.PI*2);
        ctx.fillStyle = "rgba(255,0,255,0.2)";
        ctx.shadowColor = "#ff00ff";
        ctx.shadowBlur = 20;
        ctx.fill();
    });

    particles.forEach((p, index) => {
        p.update();
        if(p.life <=0) particles.splice(index,1);
    });

    animationId = requestAnimationFrame(animate);
}

// Controls
document.getElementById("start-btn").addEventListener("click", ()=> animate());
document.getElementById("pause-btn").addEventListener("click", ()=> cancelAnimationFrame(animationId));
document.getElementById("resume-btn").addEventListener("click", ()=> animate());
document.getElementById("restart-btn").addEventListener("click", ()=>{
    particles = [];
    ctx.clearRect(0,0,canvas.width,canvas.height);
});

document.getElementById("color-picker").addEventListener("change", (e)=> color = e.target.value);
document.getElementById("thickness").addEventListener("change", (e)=> thickness = e.target.value);
