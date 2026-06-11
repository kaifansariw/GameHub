// Simon Says Game Logic
let sequence = [];
let playerSequence = [];
let level = 1;
let highScore = parseInt(localStorage.getItem('simonHighScore')) || 0;
let gameActive = false;
let showingSequence = false;
let inputLocked = false;
let canReplaySequence = false;
let clickCooldown = false;
let sessionToken = 0;
const pendingTimeouts = new Set();

const colors = ['red', 'blue', 'green', 'yellow'];
const buttons = document.querySelectorAll('.simon-btn');

// Initialize game
function initGame() {
    document.getElementById('highScore').textContent = highScore;
    updateDisplay();
}

function beginSession() {
    sessionToken += 1;
    return sessionToken;
}

function clearPendingTimeouts() {
    pendingTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    pendingTimeouts.clear();
}

function schedule(callback, delay, token = sessionToken) {
    const timeoutId = setTimeout(() => {
        pendingTimeouts.delete(timeoutId);

        if (token !== sessionToken) {
            return;
        }

        callback();
    }, delay);

    pendingTimeouts.add(timeoutId);
    return timeoutId;
}

// Start game
async function startGame() {
    if (gameActive) return;

    const token = beginSession();

    gameActive = true;
    showingSequence = false;
    inputLocked = true;
    canReplaySequence = false;
    clickCooldown = false;

    sequence = [];
    playerSequence = [];
    level = 1;
    
    document.getElementById('startBtn').disabled = true;
    document.getElementById('gameResult').classList.add('hidden');
    updateDisplay();
    document.getElementById('replayBtn').disabled = true;

    await startCountdown(token);

    if (token !== sessionToken || !gameActive) {
        return;
    }

    nextLevel(token);
}

// Countdown before game starts
async function startCountdown(token = sessionToken) {
    document.getElementById('countdownText').classList.remove('hidden');

    const countdownValues = ['3', '2', '1', 'START'];

    for (const value of countdownValues) {
        if (token !== sessionToken) {
            return;
        }

        document.getElementById('countdownText').textContent = value;

        const stillCurrent = await wait(700, token);
        if (!stillCurrent) {
            return;
        }
    }

    document.getElementById('countdownText').classList.add('hidden');
}

function wait(ms, token = sessionToken) {
    return new Promise(resolve => {
        const timeoutId = setTimeout(() => {
            pendingTimeouts.delete(timeoutId);
            resolve(token === sessionToken);
        }, ms);

        pendingTimeouts.add(timeoutId);
    });
}

// Next level
function nextLevel(token = sessionToken) {
    if (token !== sessionToken || !gameActive) return;

    playerSequence = [];
    addToSequence();
    canReplaySequence = true;
    document.getElementById('replayBtn').disabled = false;
    showSequence(token);
}

// Add random color to sequence
function addToSequence() {
    const randomColor = Math.floor(Math.random() * 4);
    sequence.push(randomColor);
}

function replaySequence() {
    if (!gameActive || showingSequence || !canReplaySequence) return;

    playerSequence = [];
    showSequence(sessionToken);
}
// Lock board visually
function lockBoard(message = 'Watch Sequence') {
    inputLocked = true;
    document.getElementById('boardOverlay').classList.remove('hidden');
    document.getElementById('boardOverlay').querySelector('p').textContent = message;

    buttons.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('hover-scale');
    });
}

// Unlock board visually
function unlockBoard() {
    inputLocked = false;
    document.getElementById('boardOverlay').classList.add('hidden');

    if (gameActive) {
        buttons.forEach(btn => {
            btn.disabled = false;
        });
    }
}
// Show sequence to player
async function showSequence(token = sessionToken) {
    if (token !== sessionToken || !gameActive) return;

    showingSequence = true;
    lockBoard('Memorize the Sequence');
    document.getElementById('gameStatus').textContent = 'Watch...';
    
    // Dynamic speed scaling
    const flashDelay = Math.max(250, 700 - (level * 25));

    for (let i = 0; i < sequence.length; i++) {
        const shouldContinue = await wait(flashDelay, token);
        if (!shouldContinue || token !== sessionToken || !gameActive) {
            return;
        }

        flashButton(sequence[i], true);

        const flashVisible = await wait(350, token);
        if (!flashVisible || token !== sessionToken || !gameActive) {
            return;
        }
    }
    
    if (token !== sessionToken || !gameActive) {
        return;
    }

    showingSequence = false;
    unlockBoard();
    document.getElementById('gameStatus').textContent = 'Your Turn';
}

// Flash button
function flashButton(buttonIndex, playback = false) {
    const button = document.getElementById(`btn-${buttonIndex}`);

    if (playback) {
        button.classList.add('playback-active');
    } else {
        button.classList.add('player-active');
    }

    schedule(() => {
        button.classList.remove('playback-active');
        button.classList.remove('player-active');
    }, 300);
}

// Handle player input
async function playerInput(buttonIndex) {
    if (!gameActive || showingSequence || inputLocked || clickCooldown) return;

    clickCooldown = true;

    schedule(() => {
        clickCooldown = false;
    }, 250);

    playerSequence.push(buttonIndex);

    flashButton(buttonIndex, false);

    const currentIndex = playerSequence.length - 1;

    // Wrong input
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        gameOver();
        return;
    }

    // Sequence completed
    if (playerSequence.length === sequence.length) {
        level++;

        updateDisplay();

        if (level - 1 > highScore) {
            highScore = level - 1;
            localStorage.setItem('simonHighScore', highScore);
            document.getElementById('highScore').textContent = highScore;
        }

        document.getElementById('gameStatus').textContent = 'Level Complete!';

        const sameSession = await wait(1000);
        if (!sameSession || !gameActive) {
            return;
        }

        nextLevel();
    }
}

// Game over
function gameOver() {
    gameActive = false;
    showingSequence = false;
    inputLocked = true;
    canReplaySequence = false;
    clickCooldown = false;

    buttons.forEach(btn => btn.disabled = true);
    document.getElementById('startBtn').disabled = false;
    document.getElementById('replayBtn').disabled = true;
    
    lockBoard('Restart Required');
    // Show result
    document.getElementById('resultText').textContent = `Wrong Tile Clicked! You reached Level ${level - 1}`;

    document.getElementById('gameResult').classList.remove('hidden');
    document.getElementById('gameResult').classList.add('animate__animated', 'animate__fadeInUp');

    document.getElementById('gameStatus').textContent = 'Game Over';
}

// Reset game
function resetGame() {
    clearPendingTimeouts();
    beginSession();

    gameActive = false;
    showingSequence = false;
    inputLocked = false;
    clickCooldown = false;
    canReplaySequence = false;
    sequence = [];
    playerSequence = [];
    level = 1;
    
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove(
            'playback-active',
            'player-active',
            'hover-scale'
        );
    });
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('replayBtn').disabled = true;
    document.getElementById('gameResult').classList.add('hidden');
    document.getElementById('boardOverlay').classList.add('hidden');
    document.getElementById('countdownText').classList.add('hidden');
    document.getElementById('gameStatus').textContent = 'Ready';
    
    updateDisplay();
    startGame();
}

// Update display
function updateDisplay() {
    document.getElementById('level').textContent = level;
}

// Add button hover effects
buttons.forEach((button, index) => {
    button.addEventListener('mouseenter', () => {
        if (!showingSequence && gameActive) {
            button.classList.add('hover-scale');
        }
    });
    
    button.addEventListener('mouseleave', () => {
        button.classList.remove('hover-scale');
    });
});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);
