const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let fruits = [];
let score = 0;
let missed = 0;
let slicing = false;
let mouseTrail = [];

function spawnFruit() {
    const fruit = {
        x: Math.random() * canvas.width,
        y: canvas.height + 50,
        radius: 25,
        speed: Math.random() * 2 + 2,
        sliced: false
    };
    fruits.push(fruit);
}

function drawFruit(fruit) {
    ctx.beginPath();
    ctx.fillStyle = fruit.sliced ? "rgba(255,255,255,0.3)" : "orange";
    ctx.arc(fruit.x, fruit.y, fruit.radius, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw swipe trail
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i < mouseTrail.length - 1; i++) {
        ctx.moveTo(mouseTrail[i].x, mouseTrail[i].y);
        ctx.lineTo(mouseTrail[i + 1].x, mouseTrail[i + 1].y);
    }
    ctx.stroke();

    if (mouseTrail.length > 10) mouseTrail.shift();

    fruits.forEach((fruit, index) => {
        fruit.y -= fruit.speed;

        drawFruit(fruit);

        // Fruit sliced?
        if (slicing) {
            for (let point of mouseTrail) {
                const dist = Math.hypot(fruit.x - point.x, fruit.y - point.y);
                if (dist < fruit.radius && !fruit.sliced) {
                    fruit.sliced = true;
                    score++;
                    document.getElementById("score").textContent = score;
                }
            }
        }

        // Remove fruits
        if (fruit.y < -50) {
            fruits.splice(index, 1);
            if (!fruit.sliced) {
                missed++;
                document.getElementById("missed").textContent = missed;

                if (missed >= 3) gameOver();
            }
        }
    });

    requestAnimationFrame(update);
}

function gameOver() {
    alert("Game Over! Score: " + score);
    resetGame();
}

function resetGame() {
    fruits = [];
    score = 0;
    missed = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("missed").textContent = missed;
}

canvas.addEventListener("mousedown", () => slicing = true);
canvas.addEventListener("mouseup", () => slicing = false);

canvas.addEventListener("mousemove", (e) => {
    mouseTrail.push({ x: e.offsetX, y: e.offsetY });
});

document.getElementById("restart-btn").addEventListener("click", resetGame);

// Spawn fruits continuously
setInterval(spawnFruit, 900);

update();
