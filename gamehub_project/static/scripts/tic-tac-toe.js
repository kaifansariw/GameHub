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
        scores[currentPlayer.toLowerCase()]++;
        updateScoreDisplay();
        saveScores();
        if (currentPlayer === 'X') {
            saveScore(scores.x);
        }

    } else if (board.every(cell => cell !== '')) {
        gameActive = false;
        showResult("It's a Draw! 🤝");
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
}

// Update current player display
function updateCurrentPlayerDisplay() {
    document.getElementById('currentPlayer').textContent = currentPlayer;
    document.getElementById('currentPlayer').className =
        `stat-value ${currentPlayer === 'X' ? 'text-primary' : 'text-secondary'}`;
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

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);