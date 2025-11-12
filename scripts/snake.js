// Snake Game Logic (Purple-Blue Neon Theme)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gameLoop;

// Initialize game
function initGame() {
    document.getElementById('highScore').textContent = highScore;
    generateFood();
    drawGame();
}

// Generate food at random position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// Draw game elements
function drawGame() {
    // Background gradient (purple-blue)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e1b4b'); // deep indigo
    gradient.addColorStop(1, '#312e81'); // rich purple-blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Snake (bright neon purple)
    for (let i = 0; i < snake.length; i++) {
        const intensity = 1 - i / snake.length;
        ctx.fillStyle = `rgba(168, 85, 247, ${0.7 * intensity + 0.3})`; // bright purple
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 10;
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
    }
    ctx.shadowBlur = 0;

    // Food (animated neon pink pulse)
    const pulse = Math.sin(Date.now() / 200) * 4 + gridSize - 6;
    ctx.shadowColor = '#ec4899';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#f472b6';
    ctx.fillRect(
        food.x * gridSize + 2,
        food.y * gridSize + 2,
        pulse,
        pulse
    );
    ctx.shadowBlur = 0;
}


// Update game state
function updateGame() {
    if (!gameRunning) return;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Collision detection
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }

    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    drawGame();
}

// Direction controls
function changeDirection(direction) {
    if (!gameRunning) return;

    switch (direction) {
        case 'up':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'down':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'left':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'right':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);

    const status = document.getElementById('gameStatus');
    const btn = document.getElementById('playPauseBtn');

    status.textContent = 'Game Over';
    btn.innerHTML = '<i class="fas fa-play mr-2"></i>Restart';

    // ✅ Reset movement and show final score
    dx = 0;
    dy = 0;

    // ✅ Save high score if beaten
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
}

function toggleGame() {
    const btn = document.getElementById('playPauseBtn');
    const status = document.getElementById('gameStatus');

    // If game over, restart fresh
    if (status.textContent === 'Game Over') {
        resetGame();
    }

    if (!gameRunning) {
        if (dx === 0 && dy === 0) {
            dx = 1;  // Start moving right
            dy = 0;
        }

        gameRunning = true;
        gameLoop = setInterval(updateGame, 150);
        btn.innerHTML = '<i class="fas fa-pause mr-2"></i>Pause';
        status.textContent = 'Playing';
    } else {
        gameRunning = false;
        clearInterval(gameLoop);
        btn.innerHTML = '<i class="fas fa-play mr-2"></i>Resume';
        status.textContent = 'Paused';
    }
}

// Reset
function resetGame() {
    gameRunning = false;
    clearInterval(gameLoop);

    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;

    document.getElementById('score').textContent = score;
    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i> Start';
    document.getElementById('gameStatus').textContent = 'Ready';

    generateFood();
    drawGame();
}

// Keyboard Controls
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': e.preventDefault(); changeDirection('up'); break;
        case 'ArrowDown': e.preventDefault(); changeDirection('down'); break;
        case 'ArrowLeft': e.preventDefault(); changeDirection('left'); break;
        case 'ArrowRight': e.preventDefault(); changeDirection('right'); break;
        case ' ': e.preventDefault(); toggleGame(); break;
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', initGame);
