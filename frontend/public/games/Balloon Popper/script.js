const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let balloons = [];
let score = 0;
let missed = 0;

function spawnBalloon() {
    const balloon = {
        x: Math.random() * canvas.width,
        y: canvas.height + 40,
        radius: 25 + Math.random() * 10,
        speed: 2 + Math.random() * 2,
        color: getRandomColor()
    };
    balloons.push(balloon);
}

function getRandomColor() {
    const colors = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function drawBalloon(balloon) {
    ctx.beginPath();
    ctx.fillStyle = balloon.color;
    ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balloons.forEach((balloon, i) => {
        balloon.y -= balloon.speed;

        drawBalloon(balloon);

        if (balloon.y + balloon.radius < 0) {
            balloons.splice(i, 1);
            missed++;
            document.getElementById("missed").textContent = missed;

            if (missed >= 5) gameOver();
        }
    });

    requestAnimationFrame(update);
}
function addGamePoints(category, action) {
  fetch("/accounts/add-points/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, action }),
  })
    .then(res => res.json())
    .then(data => console.log("Points added:", data))
    .catch(err => console.error("Point error:", err));
}

canvas.addEventListener("click", (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    balloons.forEach((balloon, i) => {
        const distance = Math.hypot(balloon.x - mouseX, balloon.y - mouseY);

        if (distance < balloon.radius) {
            balloons.splice(i, 1);
            score++;
            document.getElementById("score").textContent = score;
            addGamePoints("balloon_popper", "pop_balloon");
        }
    });
});

function gameOver() {
    alert("Game Over! Score: " + score);
    resetGame();
}

function resetGame() {
    balloons = [];
    score = 0;
    missed = 0;

    document.getElementById("score").textContent = score;
    document.getElementById("missed").textContent = missed;
}

document.getElementById("restart-btn").addEventListener("click", resetGame);

// Balloon spawner
setInterval(spawnBalloon, 800);

update();
