// Sudoku Game Logic
let sudokuGrid = Array(9).fill().map(() => Array(9).fill(0));
let solutionGrid = Array(9).fill().map(() => Array(9).fill(0));
let initialGrid = Array(9).fill().map(() => Array(9).fill(0));
let selectedCell = null;
let gameStartTime = null;
let gameTimer = null;
let mistakes = 0;
let hintsUsed = 0;
let maxHints = 3;
let currentDifficulty = 'easy';
let gameState = 'ready'; // 'ready', 'playing', 'completed', 'failed'
let totalMoves = 0;
let correctMoves = 0;

// Difficulty settings
const difficulties = {
    easy: { clues: 45, name: 'Easy' },
    medium: { clues: 35, name: 'Medium' },
    hard: { clues: 25, name: 'Hard' },
    expert: { clues: 17, name: 'Expert' }
};

// Achievements system
const achievements = [
    {
        id: 'firstMove',
        name: 'First Move',
        description: 'Make your first input',
        condition: () => totalMoves >= 1,
        icon: 'fas fa-play',
        color: 'text-green-500'
    },
    {
        id: 'speedDemon',
        name: 'Speed Demon',
        description: 'Complete puzzle under 10 min',
        condition: () => gameState === 'completed' && getElapsedTime() < 600,
        icon: 'fas fa-clock',
        color: 'text-blue-500'
    },
    {
        id: 'perfectGame',
        name: 'Perfect Game',
        description: 'No mistakes',
        condition: () => gameState === 'completed' && mistakes === 0,
        icon: 'fas fa-bullseye',
        color: 'text-purple-500'
    },
    {
        id: 'noHelpNeeded',
        name: 'No Help Needed',
        description: 'Win without hints',
        condition: () => gameState === 'completed' && hintsUsed === 0,
        icon: 'fas fa-brain',
        color: 'text-yellow-500'
    }
];

let unlockedAchievements = JSON.parse(localStorage.getItem('sudokuAchievements') || '[]');

// Initialize game
function initGame() {
    createGridHTML();
    setupEventListeners();
    initAchievements();
    generateNewPuzzle();
    updateStats();
    console.log('Sudoku game initialized successfully!');
}

// Create the HTML grid
function createGridHTML() {
    const gridContainer = document.getElementById('sudokuGrid');
    gridContainer.innerHTML = '';

    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        cell.className = 'sudoku-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => selectCell(i));
        gridContainer.appendChild(cell);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Keyboard input
    document.addEventListener('keydown', handleKeyPress);

    // Difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentDifficulty = btn.dataset.difficulty;
            updateDifficultyButtons();
            generateNewPuzzle();
        });
    });
}

// Handle keyboard input
function handleKeyPress(e) {
    if (selectedCell === null || gameState !== 'playing') return;

    const key = e.key;
    if (key >= '1' && key <= '9') {
        inputNumber(parseInt(key));
    } else if (key === 'Delete' || key === 'Backspace') {
        clearCell();
    }
}

// Generate a complete valid Sudoku solution
function generateSolution() {
    // Clear the solution grid
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            solutionGrid[i][j] = 0;
        }
    }

    // Fill the grid using backtracking
    fillGrid(solutionGrid);
}

// Fill grid using backtracking algorithm
function fillGrid(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for (let num of numbers) {
                    if (isValidMove(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (fillGrid(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Check if a move is valid (excludes the current position)
function isValidMove(grid, row, col, num) {
    // Check row (exclude current position)
    for (let x = 0; x < 9; x++) {
        if (x !== col && grid[row][x] === num) return false;
    }

    // Check column (exclude current position)
    for (let x = 0; x < 9; x++) {
        if (x !== row && grid[x][col] === num) return false;
    }

    // Check 3x3 box (exclude current position)
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const checkRow = boxRow + i;
            const checkCol = boxCol + j;
            if ((checkRow !== row || checkCol !== col) && grid[checkRow][checkCol] === num) {
                return false;
            }
        }
    }

    return true;
}

// Shuffle array utility
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Generate a new puzzle
function generateNewPuzzle() {
    resetGame();
    generateSolution();

    // Copy solution to current grid
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            sudokuGrid[i][j] = solutionGrid[i][j];
        }
    }

    // Remove numbers based on difficulty
    const clues = difficulties[currentDifficulty].clues;
    const cellsToRemove = 81 - clues;
    const positions = [];

    // Create array of all positions
    for (let i = 0; i < 81; i++) {
        positions.push(i);
    }

    // Shuffle positions
    shuffleArray(positions);

    // Remove numbers from random positions
    for (let i = 0; i < cellsToRemove; i++) {
        const pos = positions[i];
        const row = Math.floor(pos / 9);
        const col = pos % 9;
        sudokuGrid[row][col] = 0;
    }

    // Store initial grid for reference
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            initialGrid[i][j] = sudokuGrid[i][j];
        }
    }

    updateGridDisplay();
    updateStats();
    startTimer();
    gameState = 'playing';
}

// Reset game state
function resetGame() {
    gameState = 'ready';
    mistakes = 0;
    hintsUsed = 0;
    totalMoves = 0;
    correctMoves = 0;
    selectedCell = null;
    stopTimer();
    clearHighlights();
}

// Select a cell
function selectCell(index) {
    if (gameState !== 'playing') return;

    const row = Math.floor(index / 9);
    const col = index % 9;

    // Don't allow selection of given cells
    if (initialGrid[row][col] !== 0) return;

    selectedCell = index;
    updateCellHighlights();
}

// Input a number
function inputNumber(num) {
    if (selectedCell === null || gameState !== 'playing') return;

    const row = Math.floor(selectedCell / 9);
    const col = selectedCell % 9;

    // Don't allow input in given cells
    if (initialGrid[row][col] !== 0) return;

    totalMoves++;

    // Always place the number first
    sudokuGrid[row][col] = num;

    // Check if the move creates any conflicts
    const hasConflicts = !isValidMove(sudokuGrid, row, col, num);

    if (hasConflicts) {
        mistakes++;
        showMistake(selectedCell);
        // Show conflict immediately
        setTimeout(() => {
            const conflicts = findConflicts();
            conflicts.forEach(index => showConflict(index));
            setTimeout(clearHighlights, 1500);
        }, 500);
    } else {
        correctMoves++;
        clearCellHighlight(selectedCell);

        // Check if puzzle is completed
        if (isPuzzleComplete()) {
            gameState = 'completed';
            stopTimer();
            showCompletionMessage();
            checkAchievements();
        }
    }

    updateGridDisplay();
    updateStats();
    checkAchievements();
}

// Clear selected cell
function clearCell() {
    if (selectedCell === null || gameState !== 'playing') return;

    const row = Math.floor(selectedCell / 9);
    const col = selectedCell % 9;

    // Don't allow clearing given cells
    if (initialGrid[row][col] !== 0) return;

    sudokuGrid[row][col] = 0;
    clearCellHighlight(selectedCell);
    updateGridDisplay();
    updateStats();
}

// Get hint
function getHint() {
    if (selectedCell === null || gameState !== 'playing' || hintsUsed >= maxHints) return;

    const row = Math.floor(selectedCell / 9);
    const col = selectedCell % 9;

    // Don't give hints for given cells
    if (initialGrid[row][col] !== 0) return;

    hintsUsed++;
    const correctNumber = solutionGrid[row][col];
    sudokuGrid[row][col] = correctNumber;

    showHint(selectedCell);

    if (isPuzzleComplete()) {
        gameState = 'completed';
        stopTimer();
        showCompletionMessage();
        checkAchievements();
    }

    updateGridDisplay();
    updateStats();
}

// Validate current solution
function validateSolution() {
    if (gameState !== 'playing') return;

    console.log('Checking solution...');
    console.log('Current grid:', sudokuGrid);

    clearHighlights();
    const conflicts = findConflicts();

    console.log('Found conflicts:', conflicts);

    if (conflicts.length > 0) {
        conflicts.forEach(index => {
            console.log('Highlighting conflict at index:', index);
            showConflict(index);
        });
        showCheckMessage(`Found ${conflicts.length} conflict(s)! Check highlighted cells.`);
        setTimeout(clearHighlights, 3000);
    } else if (isPuzzleComplete()) {
        gameState = 'completed';
        stopTimer();
        showCompletionMessage();
        checkAchievements();
    } else {
        // Count filled cells for better message
        let filledCells = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (sudokuGrid[i][j] !== 0) filledCells++;
            }
        }
        showCheckMessage(`No conflicts found! ${filledCells}/81 cells filled. Keep going!`);
    }

    updateStats();
}

// Show check result message
function showCheckMessage(message) {
    // Create a temporary message element
    const messageEl = document.createElement('div');
    messageEl.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce';
    messageEl.textContent = message;

    document.body.appendChild(messageEl);

    setTimeout(() => {
        messageEl.remove();
    }, 2500);
}

// Find conflicts in current grid
function findConflicts() {
    const conflicts = [];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = sudokuGrid[row][col];
            if (num !== 0) {
                // Check if this number appears elsewhere in the same row
                for (let c = 0; c < 9; c++) {
                    if (c !== col && sudokuGrid[row][c] === num) {
                        conflicts.push(row * 9 + col);
                        conflicts.push(row * 9 + c);
                    }
                }

                // Check if this number appears elsewhere in the same column
                for (let r = 0; r < 9; r++) {
                    if (r !== row && sudokuGrid[r][col] === num) {
                        conflicts.push(row * 9 + col);
                        conflicts.push(r * 9 + col);
                    }
                }

                // Check if this number appears elsewhere in the same 3x3 box
                const boxRow = Math.floor(row / 3) * 3;
                const boxCol = Math.floor(col / 3) * 3;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const checkRow = boxRow + i;
                        const checkCol = boxCol + j;
                        if ((checkRow !== row || checkCol !== col) && sudokuGrid[checkRow][checkCol] === num) {
                            conflicts.push(row * 9 + col);
                            conflicts.push(checkRow * 9 + checkCol);
                        }
                    }
                }
            }
        }
    }

    // Remove duplicates
    return [...new Set(conflicts)];
}

// Check if puzzle is complete
function isPuzzleComplete() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudokuGrid[row][col] === 0) return false;
        }
    }
    return true;
}

// Update grid display
function updateGridDisplay() {
    const cells = document.querySelectorAll('.sudoku-cell');

    cells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const value = sudokuGrid[row][col];

        cell.textContent = value === 0 ? '' : value;

        // Set cell type classes
        cell.classList.remove('given', 'selected');

        if (initialGrid[row][col] !== 0) {
            cell.classList.add('given');
        }

        if (index === selectedCell) {
            cell.classList.add('selected');
        }
    });
}

// Update cell highlights
function updateCellHighlights() {
    const cells = document.querySelectorAll('.sudoku-cell');
    cells.forEach((cell, index) => {
        cell.classList.remove('selected');
        if (index === selectedCell) {
            cell.classList.add('selected');
        }
    });
}

// Clear all highlights
function clearHighlights() {
    const cells = document.querySelectorAll('.sudoku-cell');
    cells.forEach(cell => {
        cell.classList.remove('conflict', 'hint');
    });
}

// Clear specific cell highlight
function clearCellHighlight(index) {
    const cell = document.querySelectorAll('.sudoku-cell')[index];
    cell.classList.remove('conflict', 'hint');
}

// Show mistake animation
function showMistake(index) {
    const cell = document.querySelectorAll('.sudoku-cell')[index];
    cell.classList.add('conflict');
    setTimeout(() => cell.classList.remove('conflict'), 1000);
}

// Show hint animation
function showHint(index) {
    const cell = document.querySelectorAll('.sudoku-cell')[index];
    cell.classList.add('hint');
    setTimeout(() => cell.classList.remove('hint'), 2000);
}

// Show conflict animation
function showConflict(index) {
    const cell = document.querySelectorAll('.sudoku-cell')[index];
    cell.classList.add('conflict');
}

// Timer functions
function startTimer() {
    gameStartTime = Date.now();
    gameTimer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function updateTimer() {
    if (gameStartTime) {
        const elapsed = getElapsedTime();
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('timer').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function getElapsedTime() {
    return Math.floor((Date.now() - gameStartTime) / 1000);
}

// Update statistics
function updateStats() {
    document.getElementById('mistakes').textContent = mistakes;
    document.getElementById('hintsUsed').textContent = hintsUsed;

    // Calculate completion percentage
    let filledCells = 0;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudokuGrid[row][col] !== 0) filledCells++;
        }
    }

    const completionPercent = Math.round((filledCells / 81) * 100);
    document.getElementById('completionPercent').textContent = `${completionPercent}%`;
    document.getElementById('completionProgress').style.width = `${completionPercent}%`;

    // Calculate accuracy
    const accuracy = totalMoves === 0 ? 100 : Math.round((correctMoves / totalMoves) * 100);
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    document.getElementById('accuracyProgress').style.width = `${accuracy}%`;

    // Update cell counts
    document.getElementById('filledCells').textContent = filledCells;
    document.getElementById('emptyCells').textContent = 81 - filledCells;
    document.getElementById('conflicts').textContent = findConflicts().length;
}

// Update difficulty buttons
function updateDifficultyButtons() {
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === currentDifficulty) {
            btn.classList.add('active');
        }
    });
}

// Achievement functions
function checkAchievements() {
    achievements.forEach(achievement => {
        if (!unlockedAchievements.includes(achievement.id) && achievement.condition()) {
            unlockAchievement(achievement.id);
        }
    });
}

function unlockAchievement(achievementId) {
    unlockedAchievements.push(achievementId);
    localStorage.setItem('sudokuAchievements', JSON.stringify(unlockedAchievements));

    const achievementElements = document.querySelectorAll('.achievement');
    const achievement = achievements.find(a => a.id === achievementId);
    const index = achievements.findIndex(a => a.id === achievementId);

    if (achievementElements[index]) {
        achievementElements[index].classList.remove('locked');
        achievementElements[index].classList.add('unlocked');
    }

    console.log(`Achievement unlocked: ${achievement.name}`);
}

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

// Message functions
function showCompletionMessage() {
    const time = getElapsedTime();
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Save to server
    if (typeof saveScoreToServer === 'function') {
        let score = 0;
        const baseScores = {
            easy: 500,
            medium: 1000,
            hard: 2000,
            expert: 5000
        };
        score = baseScores[currentDifficulty] || 500;
        // Bonus for time (less time = more points, e.g. 3600s max)
        score += Math.max(0, 3600 - time);
        // Bonus for mistakes
        score += Math.max(0, 500 - (mistakes * 50));
        // Penalty for hints
        score -= (hintsUsed * 100);

        saveScoreToServer('sudoku', Math.max(0, score));
    }

    alert(`🎉 Congratulations! Puzzle completed!\n\nTime: ${timeStr}\nMistakes: ${mistakes}\nHints used: ${hintsUsed}\nDifficulty: ${difficulties[currentDifficulty].name}`);
}


function showFailureMessage() {
    // No longer used since we have unlimited tries
    alert(`Keep trying! You can make unlimited attempts.`);
}

// New game function
function newGame() {
    generateNewPuzzle();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);
