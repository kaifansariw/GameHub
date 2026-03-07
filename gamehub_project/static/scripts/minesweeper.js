class Minesweeper {
    constructor() {
        this.difficulties = {
            easy: { rows: 9, cols: 9, mines: 10 },
            medium: { rows: 16, cols: 16, mines: 40 },
            hard: { rows: 16, cols: 30, mines: 99 }
        };

        this.currentDifficulty = 'easy';
        this.board = [];
        this.gameBoard = [];
        this.gameState = 'ready'; // ready, playing, paused, won, lost
        this.timer = 0;
        this.timerInterval = null;
        this.firstClick = true;
        this.flagCount = 0;
        this.revealedCount = 0;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAudio();
        this.newGame();
    }

    setupAudio() {
        // Initialize audio system when user first interacts
        document.addEventListener('click', () => {
            if (window.gameAudio && !window.gameAudio.initialized) {
                window.gameAudio.init();
            }
        }, { once: true });
    }

    setupEventListeners() {
        // Difficulty selector
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.difficulty-btn.active')?.classList.remove('active');
                btn.classList.add('active');
                this.currentDifficulty = btn.dataset.difficulty;
                this.newGame();
            });
        });

        // Control buttons
        document.getElementById('newGameBtn').addEventListener('click', () => this.newGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('hintBtn').addEventListener('click', () => this.showHint());

        // Prevent right-click context menu on game board
        document.getElementById('gameBoard').addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    newGame() {
        this.gameState = 'ready';
        this.timer = 0;
        this.firstClick = true;
        this.flagCount = 0;
        this.revealedCount = 0;

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        const config = this.difficulties[this.currentDifficulty];
        this.rows = config.rows;
        this.cols = config.cols;
        this.totalMines = config.mines;
        this.totalCells = this.rows * this.cols;
        this.cellsToWin = this.totalCells - this.totalMines;

        this.createBoard();
        this.renderBoard();
        this.updateStats();
        this.hideModal();

        if (window.gameAudio) {
            window.gameAudio.playSound('move');
        }
    }

    createBoard() {
        this.board = [];
        this.gameBoard = [];

        for (let row = 0; row < this.rows; row++) {
            this.board[row] = [];
            this.gameBoard[row] = [];
            for (let col = 0; col < this.cols; col++) {
                this.board[row][col] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                };
                this.gameBoard[row][col] = false;
            }
        }
    }

    placeMines(excludeRow, excludeCol) {
        let minesPlaced = 0;
        while (minesPlaced < this.totalMines) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);

            // Don't place mine on first click or if already has mine
            if ((row === excludeRow && col === excludeCol) || this.board[row][col].isMine) {
                continue;
            }

            this.board[row][col].isMine = true;
            minesPlaced++;
        }

        this.calculateNeighborMines();
    }

    calculateNeighborMines() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (!this.board[row][col].isMine) {
                    let count = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const newRow = row + i;
                            const newCol = col + j;
                            if (this.isValidCell(newRow, newCol) && this.board[newRow][newCol].isMine) {
                                count++;
                            }
                        }
                    }
                    this.board[row][col].neighborMines = count;
                }
            }
        }
    }

    isValidCell(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    renderBoard() {
        const boardElement = document.getElementById('gameBoard');
        boardElement.style.gridTemplateColumns = `repeat(${this.cols}, 35px)`;
        boardElement.innerHTML = '';

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                cell.addEventListener('click', (e) => this.handleCellClick(e, row, col));
                cell.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    this.handleRightClick(row, col);
                });

                boardElement.appendChild(cell);
            }
        }
    }

    handleCellClick(e, row, col) {
        if (this.gameState !== 'ready' && this.gameState !== 'playing') return;

        const cell = this.board[row][col];
        if (cell.isRevealed || cell.isFlagged) return;

        // First click setup
        if (this.firstClick) {
            this.placeMines(row, col);
            this.firstClick = false;
            this.gameState = 'playing';
            this.startTimer();
        }

        if (cell.isMine) {
            this.explodeCell(row, col);
            this.gameOver(false);
            return;
        }

        this.revealCell(row, col);
        this.updateCellDisplay(row, col);

        if (window.gameAudio) {
            window.gameAudio.playSound('click');
        }

        if (this.revealedCount === this.cellsToWin) {
            this.gameOver(true);
        }
    }

    handleRightClick(row, col) {
        if (this.gameState !== 'ready' && this.gameState !== 'playing') return;

        const cell = this.board[row][col];
        if (cell.isRevealed) return;

        if (cell.isFlagged) {
            cell.isFlagged = false;
            this.flagCount--;
        } else {
            cell.isFlagged = true;
            this.flagCount++;
        }

        this.updateCellDisplay(row, col);
        this.updateStats();

        if (window.gameAudio) {
            window.gameAudio.playSound('place');
        }
    }

    revealCell(row, col) {
        if (!this.isValidCell(row, col)) return;

        const cell = this.board[row][col];
        if (cell.isRevealed || cell.isFlagged || cell.isMine) return;

        cell.isRevealed = true;
        this.revealedCount++;

        // Auto-reveal empty cells and their neighbors
        if (cell.neighborMines === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    this.revealCell(row + i, col + j);
                }
            }
        }
    }

    updateCellDisplay(row, col) {
        const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const cell = this.board[row][col];

        cellElement.className = 'cell';

        if (cell.isFlagged) {
            cellElement.classList.add('flagged');
            cellElement.innerHTML = '<i class="fas fa-flag"></i>';
        } else if (cell.isRevealed) {
            cellElement.classList.add('revealed');
            if (cell.neighborMines > 0) {
                cellElement.textContent = cell.neighborMines;
                cellElement.classList.add(`number-${cell.neighborMines}`);
            } else {
                cellElement.textContent = '';
            }
        } else {
            cellElement.textContent = '';
        }
    }

    explodeCell(row, col) {
        const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cellElement.classList.add('exploded');
        cellElement.innerHTML = '<i class="fas fa-bomb"></i>';
    }

    revealAllMines() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.board[row][col];
                const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

                if (cell.isMine && !cell.isFlagged) {
                    cellElement.classList.add('mine');
                    cellElement.innerHTML = '<i class="fas fa-bomb"></i>';
                } else if (!cell.isMine && cell.isFlagged) {
                    // Show wrong flags
                    cellElement.style.background = 'linear-gradient(145deg, #ef4444, #dc2626)';
                    cellElement.innerHTML = '<i class="fas fa-times"></i>';
                }
            }
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateTimer();
        }, 1000);
    }

    updateTimer() {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;
        document.getElementById('timer').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateStats() {
        document.getElementById('mineCount').textContent = this.totalMines - this.flagCount;
        document.getElementById('cellsLeft').textContent = this.cellsToWin - this.revealedCount;
    }

    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            clearInterval(this.timerInterval);
            document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-play"></i> Resume';

            // Hide board content
            document.querySelectorAll('.cell').forEach(cell => {
                if (!cell.style.originalBackground) {
                    cell.style.originalBackground = cell.style.background;
                }
                cell.style.background = 'var(--card-bg)';
                cell.textContent = '⏸️';
            });
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            this.startTimer();
            document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-pause"></i> Pause';

            // Restore board content
            document.querySelectorAll('.cell').forEach(cell => {
                cell.style.background = cell.style.originalBackground || '';
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                this.updateCellDisplay(row, col);
            });
        }
    }

    showHint() {
        if (this.gameState !== 'playing') return;

        // Find a safe cell to reveal
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = this.board[row][col];
                if (!cell.isRevealed && !cell.isFlagged && !cell.isMine) {
                    // Highlight the hint cell
                    const cellElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    cellElement.style.boxShadow = '0 0 20px #fbbf24';
                    cellElement.style.border = '2px solid #f59e0b';

                    setTimeout(() => {
                        cellElement.style.boxShadow = '';
                        cellElement.style.border = '';
                    }, 2000);

                    if (window.gameAudio) {
                        window.gameAudio.playSound('hint');
                    }
                    return;
                }
            }
        }
    }

    gameOver(won) {
        this.gameState = won ? 'won' : 'lost';
        clearInterval(this.timerInterval);

        if (!won) {
            this.revealAllMines();
        }

        // Save to server
        if (typeof saveScoreToServer === 'function') {
            // Score = revealed cells + a bonus for winning based on difficulty
            let score = this.revealedCount;
            if (won) {
                const difficultyBonus = {
                    easy: 100,
                    medium: 300,
                    hard: 1000
                };
                score += (difficultyBonus[this.currentDifficulty] || 100);
            }
            saveScoreToServer('minesweeper', score);
        }

        // Show modal after a short delay

        setTimeout(() => {
            this.showGameOverModal(won);
        }, 1000);

        if (window.gameAudio) {
            if (won) {
                window.gameAudio.playSound('win');
            } else {
                window.gameAudio.playSound('lose');
            }
        }
    }

    showGameOverModal(won) {
        const modal = document.getElementById('gameOverModal');
        const icon = document.getElementById('modalIcon');
        const title = document.getElementById('modalTitle');
        const text = document.getElementById('modalText');

        if (won) {
            icon.textContent = '🎉';
            title.textContent = 'You Won!';
            text.textContent = `Congratulations! You cleared all mines in ${this.formatTime(this.timer)}!`;
            modal.querySelector('.modal-content').style.border = '2px solid var(--success-color)';
        } else {
            icon.textContent = '💥';
            title.textContent = 'Game Over!';
            text.textContent = 'Better luck next time! Watch out for those mines!';
            modal.querySelector('.modal-content').style.border = '2px solid var(--danger-color)';
        }

        modal.style.display = 'flex';
    }

    hideModal() {
        document.getElementById('gameOverModal').style.display = 'none';
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.minesweeper = new Minesweeper();
});
