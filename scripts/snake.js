// Snake Game Logic
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
let foodEaten = 0;
let speedLevel = 1;
let gameSpeed = 150;
let gameState = 'ready'; // 'ready', 'playing', 'paused', 'gameOver'

// Achievements system
const achievements = [
    { id: 'firstBite', name: 'First Bite', description: 'Eat your first food', condition: () => foodEaten >= 1, icon: 'fas fa-baby', color: 'text-yellow-500' },
    { id: 'growingFast', name: 'Growing Fast', description: 'Reach length 5', condition: () => snake.length >= 5, icon: 'fas fa-fire', color: 'text-orange-500' },
    { id: 'snakeMaster', name: 'Snake Master', description: 'Reach length 10', condition: () => snake.length >= 10, icon: 'fas fa-crown', color: 'text-purple-500' },
    { id: 'centuryClub', name: 'Century Club', description: 'Score 100 points', condition: () => score >= 100, icon: 'fas fa-trophy', color: 'text-yellow-400' }
];

let unlockedAchievements = JSON.parse(localStorage.getItem('snakeAchievements') || '[]');

// Update progress indicators
function updateProgress() {
    // Update length progress (max 20 for display)
    const lengthPercent = Math.min((snake.length / 20) * 100, 100);
    document.getElementById('lengthProgress').style.width = lengthPercent + '%';
    document.getElementById('snakeLength').textContent = snake.length;
    
    // Update speed level (every 5 food eaten increases speed)
    const newSpeedLevel = Math.floor(foodEaten / 5) + 1;
    if (newSpeedLevel !== speedLevel) {
        speedLevel = newSpeedLevel;
        gameSpeed = Math.max(80, 150 - (speedLevel - 1) * 10); // Increase speed, minimum 80ms
        if (gameRunning) {
            clearInterval(gameLoop);
            gameLoop = setInterval(updateGame, gameSpeed);
        }
    }
    
    const speedPercent = Math.min((speedLevel / 10) * 100, 100);
    document.getElementById('speedProgress').style.width = speedPercent + '%';
    document.getElementById('speedLevel').textContent = speedLevel;
    
    // Update food eaten
    document.getElementById('foodEaten').textContent = foodEaten;
}

// Check and unlock achievements
function checkAchievements() {
    achievements.forEach(achievement => {
        if (!unlockedAchievements.includes(achievement.id) && achievement.condition()) {
            unlockAchievement(achievement.id);
        }
    });
}

// Unlock achievement
function unlockAchievement(achievementId) {
    unlockedAchievements.push(achievementId);
    localStorage.setItem('snakeAchievements', JSON.stringify(unlockedAchievements));
    
    // Update UI
    const achievementElements = document.querySelectorAll('.achievement');
    const achievement = achievements.find(a => a.id === achievementId);
    const index = achievements.findIndex(a => a.id === achievementId);
    
    if (achievementElements[index]) {
        achievementElements[index].classList.remove('locked');
        achievementElements[index].classList.add('unlocked');
    }
    
    // Show notification (you could add a toast notification here)
    console.log(`Achievement unlocked: ${achievement.name}`);
}

// Initialize achievements display
function initAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = '';
    
    achievements.forEach((achievement, index) => {
        const isUnlocked = unlockedAchievements.includes(achievement.id);
        const achievementEl = document.createElement('div');
        achievementEl.className = `achievement ${isUnlocked ? 'unlocked' : 'locked'}`;
        achievementEl.innerHTML = `
            <i class="${achievement.icon} ${achievement.color}"></i>
            <span>${achievement.name} - ${achievement.description}</span>
        `;
        achievementsList.appendChild(achievementEl);
    });
}

// Initialize game
function initGame() {
    // Check if canvas and context are available
    if (!canvas || !ctx) {
        console.error('Canvas or context not found!');
        return;
    }
    
    console.log('Initializing Snake Game...');
    console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
    console.log('Tile count:', tileCount);
    
    // Set initial game state
    gameState = 'ready';
    gameRunning = false;
    
    document.getElementById('highScore').textContent = highScore;
    document.getElementById('gameStatus').textContent = 'Ready';
    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play mr-2"></i> Start';
    
    generateFood();
    drawGame();
    updateProgress();
    initAchievements();
    
    console.log('Game initialized successfully!');
}

// Generate food at random position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// Draw game elements
function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#f3f4f6'; // Light gray background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines for better visibility
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        // Make head slightly different color
        if (i === 0) {
            ctx.fillStyle = '#059669'; // Darker green for head
        } else {
            ctx.fillStyle = '#10b981'; // Regular green for body
        }
        ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
    }

    // Draw food
    ctx.fillStyle = '#ef4444'; // Red color for food
    ctx.fillRect(food.x * gridSize + 1, food.y * gridSize + 1, gridSize - 2, gridSize - 2);
    
    // Add a small white highlight to food for better visibility
    ctx.fillStyle = '#fecaca';
    ctx.fillRect(food.x * gridSize + 3, food.y * gridSize + 3, gridSize - 8, gridSize - 8);
}

// Update game state
function updateGame() {
    if (!gameRunning || gameState !== 'playing') return;
    
    // Don't move if no direction is set (should not happen with new system)
    if (dx === 0 && dy === 0) {
        console.warn('No direction set!');
        return;
    }

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        console.log('Wall collision detected');
        gameOver();
        return;
    }

    // Check self collision (only check against body segments, not head)
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            console.log('Self collision detected');
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        foodEaten++;
        document.getElementById('score').textContent = score;
        updateProgress();
        checkAchievements();
        generateFood();
    } else {
        snake.pop();
    }

    drawGame();
}

// Change snake direction
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

// Start new game
function startGame() {
    // Reset game state
    snake = [{ x: 10, y: 10 }];
    dx = 1; // Start moving right
    dy = 0;
    score = 0;
    foodEaten = 0;
    speedLevel = 1;
    gameSpeed = 150;
    gameRunning = true;
    gameState = 'playing';
    
    // Update UI
    document.getElementById('score').textContent = score;
    updateProgress();
    generateFood();
    drawGame();
    
    // Start game loop
    gameLoop = setInterval(updateGame, gameSpeed);
    
    // Update button and status
    const btn = document.getElementById('playPauseBtn');
    const status = document.getElementById('gameStatus');
    btn.innerHTML = '<i class="fas fa-pause mr-2"></i> Pause';
    status.textContent = 'Playing';
}

// Toggle game play/pause
function toggleGame() {
    const btn = document.getElementById('playPauseBtn');
    const status = document.getElementById('gameStatus');

    if (gameState === 'ready' || gameState === 'gameOver') {
        // Start new game
        startGame();
    } else if (gameState === 'playing') {
        // Pause game
        gameRunning = false;
        gameState = 'paused';
        clearInterval(gameLoop);
        btn.innerHTML = '<i class="fas fa-play mr-2"></i> Resume';
        status.textContent = 'Paused';
    } else if (gameState === 'paused') {
        // Resume game
        gameRunning = true;
        gameState = 'playing';
        gameLoop = setInterval(updateGame, gameSpeed);
        btn.innerHTML = '<i class="fas fa-pause mr-2"></i> Pause';
        status.textContent = 'Playing';
    }
}

// Game over
function gameOver() {
    gameRunning = false;
    gameState = 'gameOver';
    clearInterval(gameLoop);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        document.getElementById('highScore').textContent = highScore;
    }

    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play mr-2"></i> Start';
    document.getElementById('gameStatus').textContent = 'Game Over';
}

// Reset game
function resetGame() {
    gameRunning = false;
    gameState = 'ready';
    clearInterval(gameLoop);
    
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    foodEaten = 0;
    speedLevel = 1;
    gameSpeed = 150;
    
    document.getElementById('score').textContent = score;
    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play mr-2"></i> Start';
    document.getElementById('gameStatus').textContent = 'Ready';
    
    updateProgress();
    generateFood();
    drawGame();
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            changeDirection('up');
            break;
        case 'ArrowDown':
            e.preventDefault();
            changeDirection('down');
            break;
        case 'ArrowLeft':
            e.preventDefault();
            changeDirection('left');
            break;
        case 'ArrowRight':
            e.preventDefault();
            changeDirection('right');
            break;
        case ' ':
            e.preventDefault();
            toggleGame();
            break;
    }
});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);