function getCSRFToken() {
    return document.cookie
        .split(";")
        .map(c => c.trim())
        .find(c => c.startsWith("csrftoken="))
        ?.split("=")[1] || "";
}

function saveScore(score) {
    if (typeof saveScoreToServer === 'function') {
        saveScoreToServer('tic-tac-toe', score);
    }
}


// Tic Tac Toe Game Logic
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = JSON.parse(localStorage.getItem('ticTacToeScores')) || { x: 0, o: 0, draws: 0 };
const statusTextEl = document.getElementById('statusText');
const currentPlayerEl = document.getElementById('currentPlayer');

// Winning combinations
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Initialize game
function initGame() {
    updateScoreDisplay();
    updateCurrentPlayerDisplay();
    updateStatusPill('Current Turn:', 'text-purple-400');
}

// Make a move
function makeMove(cellIndex) {
    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    const cell = document.querySelectorAll('.cell')[cellIndex];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'btn-primary' : 'btn-secondary');
    cell.classList.add('animate__animated', 'animate__bounceIn');

    if (checkWinner()) {
        gameActive = false;
        showResult(`Player ${currentPlayer} Wins! 🎉`);
        updateStatusPill(`Winner: ${currentPlayer}`, currentPlayer === 'X' ? 'text-primary' : 'text-secondary');
        scores[currentPlayer.toLowerCase()]++;
        updateScoreDisplay();
        saveScores();
        if (currentPlayer === 'X') {
            saveScore(scores.x);
        }

    } else if (board.every(cell => cell !== '')) {
        gameActive = false;
        showResult("It's a Draw! 🤝");
        updateStatusPill('Game Over: Draw', 'text-pink-400');
        scores.draws++;
        updateScoreDisplay();
        saveScores();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateCurrentPlayerDisplay();
    }
}

// Check for winner
function checkWinner() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Show game result
function showResult(message) {
    const resultDiv = document.getElementById('gameResult');
    const resultText = document.getElementById('resultText');
    resultText.textContent = message;
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('animate__animated', 'animate__fadeInUp');
}

// Reset game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell btn btn-outline btn-lg h-20 text-3xl font-bold hover:btn-primary';
    });

    document.getElementById('gameResult').classList.add('hidden');
    updateCurrentPlayerDisplay();
    updateStatusPill('Current Turn:', 'text-purple-400');
}

// Update current player display
function updateCurrentPlayerDisplay() {
    currentPlayerEl.textContent = currentPlayer;
    currentPlayerEl.className =
        `stat-value ${currentPlayer === 'X' ? 'text-primary' : 'text-secondary'}`;
}

function updateStatusPill(label, toneClass) {
    if (statusTextEl) {
        statusTextEl.textContent = label;
    }

    const pill = document.getElementById('status-pill');
    if (!pill) return;

    pill.className = `inline-block border px-4 py-1.5 rounded-full text-[10px] font-orbitron uppercase tracking-widest mb-4 ${toneClass}`;
    pill.classList.remove('bg-purple-500/10', 'border-purple-500/20', 'text-purple-400');

    if (toneClass === 'text-primary') {
        pill.classList.add('bg-purple-500/10', 'border-purple-500/30');
    } else if (toneClass === 'text-secondary') {
        pill.classList.add('bg-blue-500/10', 'border-blue-500/30');
    } else if (toneClass === 'text-pink-400') {
        pill.classList.add('bg-pink-500/10', 'border-pink-500/30');
    } else {
        pill.classList.add('bg-purple-500/10', 'border-purple-500/20');
    }
}

// Update score display
function updateScoreDisplay() {
    document.getElementById('xWins').textContent = scores.x;
    document.getElementById('oWins').textContent = scores.o;
    document.getElementById('draws').textContent = scores.draws;
}

// Save scores to localStorage
function saveScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
}

const saveScoreToServer = window.saveScoreToServer || (() => {});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

window.makeMove = makeMove;
window.resetGame = resetGame;
window.getCSRFToken = getCSRFToken;
