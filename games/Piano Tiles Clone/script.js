const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
let score = 0;
let speed = 3;
let gameOver = false;

// Create 4 columns
for (let i = 0; i < 4; i++) {
    let col = document.createElement("div");
    col.classList.add("column");
    game.appendChild(col);
}

function spawnTile() {
    if (gameOver) return;

    const colIndex = Math.floor(Math.random() * 4);
    const column = document.getElementsByClassName("column")[colIndex];

    let tile = document.createElement("div");
    tile.classList.add("tile");
    column.appendChild(tile);

    tile.addEventListener("click", () => {
        if (gameOver) return;

        tile.classList.add("hit");
        score++;
        scoreDisplay.textContent = score;
        tile.remove();
    });

    moveTile(tile);
}

function moveTile(tile) {
    let pos = -100;

    const fall = setInterval(() => {
        if (gameOver) return clearInterval(fall);

        pos += speed;
        tile.style.top = pos + "px";

        // If tile reaches bottom → miss
        if (pos > 500) {
            tile.classList.add("miss");
            endGame();
            clearInterval(fall);
        }
    }, 20);
}

function endGame() {
    gameOver = true;
    alert("Game Over! Final Score: " + score);
    window.location.reload();
}

// Spawn tiles continuously
setInterval(spawnTile, 700);
