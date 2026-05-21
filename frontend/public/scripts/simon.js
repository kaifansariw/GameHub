// Simon Says Game Logic
let sequence = [];
let playerSequence = [];
let level = 1;
let highScore = localStorage.getItem('simonHighScore') || 0;
let gameActive = false;
let showingSequence = false;

const buttons = document.querySelectorAll('.simon-btn');

// Initialize game
function initGame() {
    document.getElementById('highScore').textContent = highScore;
    updateDisplay();
}

// Start game
function startGame() {
    if (gameActive) return;
    
    gameActive = true;
    sequence = [];
    playerSequence = [];
    level = 1;
    
    document.getElementById('startBtn').disabled = true;
    document.getElementById('gameResult').classList.add('hidden');
    updateDisplay();
    
    nextLevel();
}

// Next level
function nextLevel() {
    playerSequence = [];
    addToSequence();
    showSequence();
}

// Add random color to sequence
function addToSequence() {
    const randomColor = Math.floor(Math.random() * 4);
    sequence.push(randomColor);
}

// Show sequence to player
async function showSequence() {
    showingSequence = true;
    document.getElementById('gameStatus').textContent = 'Watch...';
    
    // Disable buttons during sequence
    buttons.forEach(btn => btn.disabled = true);
    
    for (let i = 0; i < sequence.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 600));
        flashButton(sequence[i]);
        await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    // Enable buttons for player input
    buttons.forEach(btn => btn.disabled = false);
    showingSequence = false;
    document.getElementById('gameStatus').textContent = 'Your Turn';
}

// Flash button
function flashButton(buttonIndex) {
    const button = document.getElementById(`btn-${buttonIndex}`);
    const originalClass = button.className;
    
    // Add flash effect
    button.classList.add('animate__animated', 'animate__pulse', 'brightness-150', 'scale-110');
    
    setTimeout(() => {
        button.className = originalClass;
    }, 300);
}

// Handle player input
function playerInput(buttonIndex) {
    if (!gameActive || showingSequence) return;
    
    playerSequence.push(buttonIndex);
    flashButton(buttonIndex);
    
    // Check if current input is correct
    const currentIndex = playerSequence.length - 1;
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        gameOver();
        return;
    }
    
    // Check if player completed the sequence
    if (playerSequence.length === sequence.length) {
        level++;
        updateDisplay();
        
        if (level > highScore) {
            highScore = level - 1;
            localStorage.setItem('simonHighScore', highScore);
            document.getElementById('highScore').textContent = highScore;
        }
        
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
}

// Game over
function gameOver() {
    gameActive = false;
    showingSequence = false;
    
    buttons.forEach(btn => btn.disabled = false);
    document.getElementById('startBtn').disabled = false;
    
    // Show result
    const resultDiv = document.getElementById('gameResult');
    const resultText = document.getElementById('resultText');
    const alertDiv = resultDiv.querySelector('.alert');
    
    if (level - 1 > parseInt(highScore)) {
        resultText.textContent = `New High Score! You reached level ${level - 1}! 🎉`;
        alertDiv.className = 'alert alert-success';
    } else {
        resultText.textContent = `Game Over! You reached level ${level - 1}. Try again!`;
        alertDiv.className = 'alert alert-error';
    }
    
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('animate__animated', 'animate__fadeInUp');
    
    document.getElementById('gameStatus').textContent = 'Game Over';
}

// Reset game
function resetGame() {
    gameActive = false;
    showingSequence = false;
    sequence = [];
    playerSequence = [];
    level = 1;
    
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.className = btn.className.replace(/animate__\w+/g, '').trim();
    });
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('gameResult').classList.add('hidden');
    document.getElementById('gameStatus').textContent = 'Ready';
    
    updateDisplay();
}

// Update display
function updateDisplay() {
    document.getElementById('level').textContent = level;
}

// Add button hover effects
buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
        if (!showingSequence && gameActive) {
            button.classList.add('scale-105');
        }
    });
    
    button.addEventListener('mouseleave', () => {
        button.classList.remove('scale-105');
    });
});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

window.startGame = startGame;
window.resetGame = resetGame;
window.playerInput = playerInput;