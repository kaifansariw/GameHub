class Game2048 {
    constructor() {
        this.grid = [];
        this.previousGrid = [];
        this.previousScore = 0;
        this.score = 0;
        this.moves = 0;
        this.bestScore = parseInt(localStorage.getItem('2048-best-score')) || 0;
        this.gameWon = false;
        this.gameOver = false;
        this.canUndo = false;
        
        this.init();
        this.loadBestScore();
        this.setupEventListeners();
    }

    init() {
        // Initialize empty 4x4 grid
        this.grid = [];
        for (let i = 0; i < 4; i++) {
            this.grid[i] = [0, 0, 0, 0];
        }
        
        // Add two initial tiles
        this.addRandomTile();
        this.addRandomTile();
        
        this.updateDisplay();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    this.move('up');
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    this.move('down');
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    this.move('left');
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    this.move('right');
                    break;
                case 'z':
                case 'Z':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.undoMove();
                    }
                    break;
                case ' ':
                    e.preventDefault();
                    this.newGame();
                    break;
            }
        });

        // Touch support for mobile
        let startX, startY;
        const gameBoard = document.querySelector('.game-board');
        
        gameBoard.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        gameBoard.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 50) this.move('left');
                else if (diffX < -50) this.move('right');
            } else {
                if (diffY > 50) this.move('up');
                else if (diffY < -50) this.move('down');
            }
            
            startX = null;
            startY = null;
        });
    }

    addRandomTile() {
        const emptyCells = [];
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({row: i, col: j});
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    move(direction) {
        // Save state for undo
        this.previousGrid = this.grid.map(row => [...row]);
        this.previousScore = this.score;
        
        let moved = false;

        if (direction === 'left') {
            moved = this.moveLeft();
        } else if (direction === 'right') {
            moved = this.moveRight();
        } else if (direction === 'up') {
            moved = this.moveUp();
        } else if (direction === 'down') {
            moved = this.moveDown();
        }

        if (moved) {
            this.moves++;
            this.canUndo = true;
            this.addRandomTile();
            this.updateDisplay();
            this.updateUndoButton();
            
            // Create particle effect for successful move
            this.createMoveEffect();
            
            if (this.isGameWon() && !this.gameWon) {
                this.gameWon = true;
                this.showGameWon();
            } else if (this.isGameOver()) {
                this.gameOver = true;
                this.showGameOver();
            }
        }
    }

    moveLeft() {
        let moved = false;
        
        for (let i = 0; i < 4; i++) {
            const row = this.grid[i].filter(val => val !== 0);
            
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    this.score += row[j];
                    row.splice(j + 1, 1);
                }
            }
            
            while (row.length < 4) {
                row.push(0);
            }
            
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] !== row[j]) {
                    moved = true;
                }
                this.grid[i][j] = row[j];
            }
        }
        
        return moved;
    }

    moveRight() {
        let moved = false;
        
        for (let i = 0; i < 4; i++) {
            const row = this.grid[i].filter(val => val !== 0);
            
            for (let j = row.length - 1; j > 0; j--) {
                if (row[j] === row[j - 1]) {
                    row[j] *= 2;
                    this.score += row[j];
                    row.splice(j - 1, 1);
                    j--;
                }
            }
            
            while (row.length < 4) {
                row.unshift(0);
            }
            
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] !== row[j]) {
                    moved = true;
                }
                this.grid[i][j] = row[j];
            }
        }
        
        return moved;
    }

    moveUp() {
        let moved = false;
        
        for (let j = 0; j < 4; j++) {
            const column = [];
            for (let i = 0; i < 4; i++) {
                if (this.grid[i][j] !== 0) {
                    column.push(this.grid[i][j]);
                }
            }
            
            for (let i = 0; i < column.length - 1; i++) {
                if (column[i] === column[i + 1]) {
                    column[i] *= 2;
                    this.score += column[i];
                    column.splice(i + 1, 1);
                }
            }
            
            while (column.length < 4) {
                column.push(0);
            }
            
            for (let i = 0; i < 4; i++) {
                if (this.grid[i][j] !== column[i]) {
                    moved = true;
                }
                this.grid[i][j] = column[i];
            }
        }
        
        return moved;
    }

    moveDown() {
        let moved = false;
        
        for (let j = 0; j < 4; j++) {
            const column = [];
            for (let i = 0; i < 4; i++) {
                if (this.grid[i][j] !== 0) {
                    column.push(this.grid[i][j]);
                }
            }
            
            for (let i = column.length - 1; i > 0; i--) {
                if (column[i] === column[i - 1]) {
                    column[i] *= 2;
                    this.score += column[i];
                    column.splice(i - 1, 1);
                    i--;
                }
            }
            
            while (column.length < 4) {
                column.unshift(0);
            }
            
            for (let i = 0; i < 4; i++) {
                if (this.grid[i][j] !== column[i]) {
                    moved = true;
                }
                this.grid[i][j] = column[i];
            }
        }
        
        return moved;
    }

    isGameWon() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }

    isGameOver() {
        // Check for empty cells
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] === 0) {
                    return false;
                }
            }
        }
        
        // Check for possible merges
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const current = this.grid[i][j];
                if (
                    (j < 3 && current === this.grid[i][j + 1]) ||
                    (i < 3 && current === this.grid[i + 1][j])
                ) {
                    return false;
                }
            }
        }
        
        return true;
    }

    updateDisplay() {
        const tileContainer = document.getElementById('tile-container');
        tileContainer.innerHTML = '';
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] !== 0) {
                    const tile = document.createElement('div');
                    tile.className = `tile tile-${this.grid[i][j]} tile-new`;
                    tile.textContent = this.grid[i][j].toLocaleString();
                    
                    // Enhanced positioning for larger board
                    const isMobile = window.innerWidth <= 768;
                    const tileSize = isMobile ? 70 : 90;
                    const gap = isMobile ? 15 : 20;
                    
                    // Calculate exact position to center tiles in grid cells
                    tile.style.left = (j * (tileSize + gap)) + 'px';
                    tile.style.top = (i * (tileSize + gap)) + 'px';
                    tile.style.width = tileSize + 'px';
                    tile.style.height = tileSize + 'px';
                    tile.style.lineHeight = tileSize + 'px';
                    
                    // Add special effects for high value tiles
                    if (this.grid[i][j] >= 1024) {
                        tile.classList.add('tile-legendary');
                    } else if (this.grid[i][j] >= 128) {
                        tile.classList.add('tile-gold');
                    }
                    
                    tileContainer.appendChild(tile);
                }
            }
        }
        
        // Update score display with animations
        this.animateScoreChange('score', this.score);
        document.getElementById('moves').textContent = this.moves;
        
        // Update game progress
        this.updateGameProgress();
        
        // Update best score if necessary
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('2048-best-score', this.bestScore);
            this.animateScoreChange('bestScore', this.bestScore);
            
            // Show new best score notification
            this.showNewBestScore();
        }
        
        // Remove animation class after animation completes
        setTimeout(() => {
            const tiles = document.querySelectorAll('.tile-new');
            tiles.forEach(tile => tile.classList.remove('tile-new'));
        }, 400);
    }

    animateScoreChange(elementId, newValue) {
        const element = document.getElementById(elementId);
        element.style.transform = 'scale(1.1)';
        element.textContent = newValue.toLocaleString();
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }

    showNewBestScore() {
        // Create a floating "New Best!" notification
        const notification = document.createElement('div');
        notification.textContent = '🏆 New Best!';
        notification.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #6a11cb, #2575fc);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 1000;
            animation: newBest 3s ease-out forwards;
            box-shadow: 0 8px 32px rgba(106, 17, 203, 0.4);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
        
        // Add animation keyframes if not exists
        if (!document.getElementById('newbest-styles')) {
            const style = document.createElement('style');
            style.id = 'newbest-styles';
            style.textContent = `
                @keyframes newBest {
                    0% { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.8); }
                    20% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1.1); }
                    80% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-20px) scale(0.8); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    loadBestScore() {
        document.getElementById('bestScore').textContent = this.bestScore;
    }

    showGameWon() {
        const overlay = document.getElementById('game-over');
        const text = document.getElementById('game-over-text');
        
        text.textContent = 'You Win!';
        text.style.color = '#f9f6f2';
        overlay.classList.add('game-won');
        overlay.style.display = 'flex';
        
        // Auto-hide after 3 seconds and continue playing
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.classList.remove('game-won');
        }, 3000);
    }

    showGameOver() {
        const overlay = document.getElementById('game-over');
        const text = document.getElementById('game-over-text');
        
        text.textContent = 'Game Over!';
        text.style.color = '#776e65';
        overlay.classList.add('game-lost');
        overlay.style.display = 'flex';
    }

    undoMove() {
        if (!this.canUndo || this.gameOver) return;
        
        this.grid = this.previousGrid.map(row => [...row]);
        this.score = this.previousScore;
        this.moves = Math.max(0, this.moves - 1);
        this.canUndo = false;
        
        this.updateDisplay();
        this.updateUndoButton();
    }



    getEmptyCells() {
        const empty = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] === 0) {
                    empty.push({row: i, col: j});
                }
            }
        }
        return empty;
    }

    updateUndoButton() {
        const undoBtn = document.getElementById('undoBtn');
        undoBtn.disabled = !this.canUndo;
        undoBtn.classList.toggle('btn-disabled', !this.canUndo);
    }

    createMoveEffect() {
        // Create visual feedback for successful moves
        const gameBoard = document.querySelector('.game-board');
        gameBoard.style.transform = 'scale(1.02)';
        setTimeout(() => {
            gameBoard.style.transform = 'scale(1)';
        }, 100);
    }

    showGameWon() {
        const overlay = document.getElementById('game-over');
        const text = document.getElementById('game-over-text');
        const finalScore = document.getElementById('final-score-text');
        
        text.textContent = '🎉 You Win! 🎉';
        text.style.color = '#f9f6f2';
        finalScore.textContent = `Final Score: ${this.score.toLocaleString()}`;
        overlay.classList.add('game-won');
        overlay.style.display = 'flex';
        
        // Create celebration particles
        this.createCelebrationEffect();
        
        // Auto-hide after 4 seconds and continue playing
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.classList.remove('game-won');
        }, 4000);
    }

    showGameOver() {
        const overlay = document.getElementById('game-over');
        const text = document.getElementById('game-over-text');
        const finalScore = document.getElementById('final-score-text');
        
        text.textContent = '💀 Game Over! 💀';
        text.style.color = '#776e65';
        finalScore.textContent = `Final Score: ${this.score.toLocaleString()}`;
        overlay.classList.add('game-lost');
        overlay.style.display = 'flex';
    }

    createCelebrationEffect() {
        // Create floating celebration particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #ffd700, #ffed4e);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * window.innerWidth}px;
                top: ${window.innerHeight}px;
                animation: celebrate 3s ease-out forwards;
            `;
            document.body.appendChild(particle);
            
            setTimeout(() => {
                document.body.removeChild(particle);
            }, 3000);
        }
        
        // Add celebration keyframes
        if (!document.getElementById('celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'celebration-styles';
            style.textContent = `
                @keyframes celebrate {
                    to {
                        transform: translateY(-${window.innerHeight + 100}px) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateGameProgress() {
        // Find highest tile
        let highest = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.grid[i][j] > highest) {
                    highest = this.grid[i][j];
                }
            }
        }
        
        // Update highest tile display
        document.getElementById('highestTile').textContent = highest;
        
        // Calculate progress percentage (logarithmic scale to 2048)
        let progress = 0;
        if (highest >= 2) {
            progress = Math.min((Math.log2(highest) / Math.log2(2048)) * 100, 100);
        }
        
        // Update progress bar
        document.getElementById('progressBar').style.width = progress + '%';
        
        // Update objective text
        const objectiveElement = document.getElementById('currentObjective');
        if (highest >= 2048) {
            objectiveElement.textContent = 'You won! Keep going for higher scores!';
        } else if (highest >= 1024) {
            objectiveElement.textContent = 'So close! One more merge to 2048!';
        } else if (highest >= 512) {
            objectiveElement.textContent = 'Great progress! Aim for 1024 next!';
        } else if (highest >= 128) {
            objectiveElement.textContent = 'Building momentum! Keep merging!';
        } else {
            objectiveElement.textContent = 'Merge tiles to reach 2048!';
        }
    }

    newGame() {
        this.score = 0;
        this.moves = 0;
        this.gameWon = false;
        this.gameOver = false;
        this.canUndo = false;
        
        // Hide game over overlay
        const overlay = document.getElementById('game-over');
        overlay.style.display = 'none';
        overlay.classList.remove('game-won', 'game-lost');
        
        // Reset buttons
        this.updateUndoButton();
        
        this.init();
    }
}

// Global game instance
let game;

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    game = new Game2048();
});

// Global functions for button controls
function move(direction) {
    if (game && !game.gameOver) {
        game.move(direction);
    }
}

function newGame() {
    if (game) {
        game.newGame();
    }
}

function undoMove() {
    if (game) {
        game.undoMove();
    }
}
