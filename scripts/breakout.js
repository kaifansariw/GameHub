class Breakout {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game state
        this.gameState = 'ready'; // ready, playing, paused, gameOver, levelComplete
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.ballLaunched = false;
        
        // Game objects
        this.paddle = {
            x: this.canvas.width / 2 - 60,
            y: this.canvas.height - 30,
            width: 120,
            height: 15,
            speed: 8,
            color: '#6a11cb'
        };
        
        this.balls = [];
        this.bricks = [];
        this.powerUps = [];
        this.lasers = [];
        
        // Power-up effects
        this.powerUpEffects = {
            bigPaddle: { active: false, timer: 0, duration: 10000 },
            multiball: { active: false, timer: 0 },
            laser: { active: false, timer: 0, duration: 8000 }
        };
        
        // Level configurations
        this.levels = [
            { rows: 4, cols: 10, brickHealth: 1, description: "Warm up - Basic bricks" },
            { rows: 5, cols: 10, brickHealth: 1, description: "Getting started - More bricks" },
            { rows: 5, cols: 12, brickHealth: 2, description: "Tougher bricks - 2 hits needed" },
            { rows: 6, cols: 12, brickHealth: 2, description: "Dense formation" },
            { rows: 6, cols: 14, brickHealth: 3, description: "Super tough bricks" },
            { rows: 7, cols: 14, brickHealth: 3, description: "Master level - Good luck!" }
        ];
        
        // Mouse tracking
        this.mouseX = this.canvas.width / 2;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAudio();
        this.resetBall();
        this.createLevel();
        this.updateUI();
        this.gameLoop();
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
        // Mouse movement for paddle
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
        });
        
        // Mouse click to launch ball
        this.canvas.addEventListener('click', () => {
            if (!this.ballLaunched && this.gameState === 'playing') {
                this.launchBall();
            }
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.togglePause();
            }
        });
        
        // Button controls
        document.getElementById('startBtn').addEventListener('click', () => this.startGame());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
    }
    
    startGame() {
        this.gameState = 'playing';
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'inline-flex';
        
        if (window.gameAudio) {
            window.gameAudio.playSound('click');
        }
    }
    
    togglePause() {
        if (this.gameState === 'playing') {
            this.gameState = 'paused';
            document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-play"></i> Resume';
        } else if (this.gameState === 'paused') {
            this.gameState = 'playing';
            document.getElementById('pauseBtn').innerHTML = '<i class="fas fa-pause"></i> Pause';
        }
    }
    
    resetGame() {
        this.gameState = 'ready';
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.ballLaunched = false;
        
        // Reset power-ups
        Object.keys(this.powerUpEffects).forEach(key => {
            this.powerUpEffects[key].active = false;
            this.powerUpEffects[key].timer = 0;
        });
        
        // Reset paddle
        this.paddle.width = 120;
        this.paddle.x = this.canvas.width / 2 - this.paddle.width / 2;
        
        // Clear arrays
        this.balls = [];
        this.powerUps = [];
        this.lasers = [];
        
        this.resetBall();
        this.createLevel();
        this.updateUI();
        
        document.getElementById('startBtn').style.display = 'inline-flex';
        document.getElementById('pauseBtn').style.display = 'none';
        
        if (window.gameAudio) {
            window.gameAudio.playSound('move');
        }
    }
    
    resetBall() {
        this.balls = [{
            x: this.canvas.width / 2,
            y: this.paddle.y - 20,
            dx: 0,
            dy: 0,
            radius: 8,
            speed: 6,
            color: '#ffffff'
        }];
        this.ballLaunched = false;
    }
    
    launchBall() {
        if (this.balls.length > 0) {
            const angle = (Math.random() - 0.5) * Math.PI / 3; // Random angle between -60° and 60°
            this.balls[0].dx = Math.sin(angle) * this.balls[0].speed;
            this.balls[0].dy = -Math.cos(angle) * this.balls[0].speed;
            this.ballLaunched = true;
            
            if (window.gameAudio) {
                window.gameAudio.playSound('place_x');
            }
        }
    }
    
    createLevel() {
        this.bricks = [];
        const levelConfig = this.levels[Math.min(this.level - 1, this.levels.length - 1)];
        
        const brickWidth = 70;
        const brickHeight = 25;
        const padding = 5;
        const offsetTop = 80;
        const offsetLeft = (this.canvas.width - (levelConfig.cols * (brickWidth + padding) - padding)) / 2;
        
        const colors = [
            '#ef4444', '#f97316', '#eab308', '#22c55e', 
            '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
        ];
        
        for (let row = 0; row < levelConfig.rows; row++) {
            for (let col = 0; col < levelConfig.cols; col++) {
                this.bricks.push({
                    x: offsetLeft + col * (brickWidth + padding),
                    y: offsetTop + row * (brickHeight + padding),
                    width: brickWidth,
                    height: brickHeight,
                    health: levelConfig.brickHealth + Math.floor(row / 2),
                    maxHealth: levelConfig.brickHealth + Math.floor(row / 2),
                    color: colors[row % colors.length],
                    points: (row + 1) * 10,
                    powerUpChance: 0.15
                });
            }
        }
        
        document.getElementById('levelDescription').textContent = levelConfig.description;
        document.getElementById('currentLevel').textContent = this.level;
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        this.updatePaddle();
        this.updateBalls();
        this.updatePowerUps();
        this.updateLasers();
        this.updatePowerUpEffects();
        this.checkCollisions();
        this.checkWinCondition();
        this.updateUI();
    }
    
    updatePaddle() {
        // Move paddle to mouse position
        this.paddle.x = this.mouseX - this.paddle.width / 2;
        
        // Keep paddle within canvas bounds
        this.paddle.x = Math.max(0, Math.min(this.canvas.width - this.paddle.width, this.paddle.x));
        
        // Update ball position if not launched
        if (!this.ballLaunched && this.balls.length > 0) {
            this.balls[0].x = this.paddle.x + this.paddle.width / 2;
        }
    }
    
    updateBalls() {
        for (let i = this.balls.length - 1; i >= 0; i--) {
            const ball = this.balls[i];
            
            ball.x += ball.dx;
            ball.y += ball.dy;
            
            // Ball collision with walls
            if (ball.x + ball.radius > this.canvas.width || ball.x - ball.radius < 0) {
                ball.dx = -ball.dx;
                if (window.gameAudio) window.gameAudio.playSound('move');
            }
            
            if (ball.y - ball.radius < 0) {
                ball.dy = -ball.dy;
                if (window.gameAudio) window.gameAudio.playSound('move');
            }
            
            // Ball falls below paddle
            if (ball.y > this.canvas.height) {
                this.balls.splice(i, 1);
                if (this.balls.length === 0) {
                    this.loseLife();
                }
            }
        }
    }
    
    updatePowerUps() {
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const powerUp = this.powerUps[i];
            powerUp.y += powerUp.speed;
            
            // Remove power-ups that fall off screen
            if (powerUp.y > this.canvas.height) {
                this.powerUps.splice(i, 1);
            }
        }
    }
    
    updateLasers() {
        for (let i = this.lasers.length - 1; i >= 0; i--) {
            const laser = this.lasers[i];
            laser.y -= laser.speed;
            
            // Remove lasers that go off screen
            if (laser.y < 0) {
                this.lasers.splice(i, 1);
            }
        }
    }
    
    updatePowerUpEffects() {
        const currentTime = Date.now();
        
        // Big paddle effect
        if (this.powerUpEffects.bigPaddle.active) {
            if (currentTime - this.powerUpEffects.bigPaddle.timer > this.powerUpEffects.bigPaddle.duration) {
                this.powerUpEffects.bigPaddle.active = false;
                this.paddle.width = 120;
            }
        }
        
        // Laser effect
        if (this.powerUpEffects.laser.active) {
            if (currentTime - this.powerUpEffects.laser.timer > this.powerUpEffects.laser.duration) {
                this.powerUpEffects.laser.active = false;
            }
        }
    }
    
    checkCollisions() {
        // Ball-paddle collision
        this.balls.forEach(ball => {
            if (ball.y + ball.radius > this.paddle.y &&
                ball.y - ball.radius < this.paddle.y + this.paddle.height &&
                ball.x > this.paddle.x &&
                ball.x < this.paddle.x + this.paddle.width) {
                
                // Calculate bounce angle based on where ball hits paddle
                const hitPos = (ball.x - (this.paddle.x + this.paddle.width / 2)) / (this.paddle.width / 2);
                const bounceAngle = hitPos * Math.PI / 3; // Max 60 degrees
                
                ball.dx = Math.sin(bounceAngle) * ball.speed;
                ball.dy = -Math.abs(Math.cos(bounceAngle) * ball.speed);
                
                if (window.gameAudio) window.gameAudio.playSound('place_x');
            }
        });
        
        // Ball-brick collision
        this.balls.forEach(ball => {
            for (let i = this.bricks.length - 1; i >= 0; i--) {
                const brick = this.bricks[i];
                
                if (ball.x + ball.radius > brick.x &&
                    ball.x - ball.radius < brick.x + brick.width &&
                    ball.y + ball.radius > brick.y &&
                    ball.y - ball.radius < brick.y + brick.height) {
                    
                    // Determine collision side
                    const overlapLeft = (ball.x + ball.radius) - brick.x;
                    const overlapRight = (brick.x + brick.width) - (ball.x - ball.radius);
                    const overlapTop = (ball.y + ball.radius) - brick.y;
                    const overlapBottom = (brick.y + brick.height) - (ball.y - ball.radius);
                    
                    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
                    
                    if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                        ball.dx = -ball.dx;
                    } else {
                        ball.dy = -ball.dy;
                    }
                    
                    this.hitBrick(brick, i);
                    break;
                }
            }
        });
        
        // Laser-brick collision
        for (let i = this.lasers.length - 1; i >= 0; i--) {
            const laser = this.lasers[i];
            
            for (let j = this.bricks.length - 1; j >= 0; j--) {
                const brick = this.bricks[j];
                
                if (laser.x > brick.x &&
                    laser.x < brick.x + brick.width &&
                    laser.y > brick.y &&
                    laser.y < brick.y + brick.height) {
                    
                    this.lasers.splice(i, 1);
                    this.hitBrick(brick, j);
                    break;
                }
            }
        }
        
        // Power-up-paddle collision
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const powerUp = this.powerUps[i];
            
            if (powerUp.y + powerUp.height > this.paddle.y &&
                powerUp.y < this.paddle.y + this.paddle.height &&
                powerUp.x + powerUp.width > this.paddle.x &&
                powerUp.x < this.paddle.x + this.paddle.width) {
                
                this.activatePowerUp(powerUp.type);
                this.powerUps.splice(i, 1);
            }
        }
    }
    
    hitBrick(brick, index) {
        brick.health--;
        
        if (brick.health <= 0) {
            this.score += brick.points;
            
            // Chance to drop power-up
            if (Math.random() < brick.powerUpChance) {
                this.createPowerUp(brick.x + brick.width / 2, brick.y + brick.height);
            }
            
            this.bricks.splice(index, 1);
            
            if (window.gameAudio) {
                window.gameAudio.playSound('win');
            }
        } else {
            if (window.gameAudio) {
                window.gameAudio.playSound('place_o');
            }
        }
    }
    
    createPowerUp(x, y) {
        const types = [
            { type: 'multiball', color: '#3b82f6', icon: '🔵' },
            { type: 'bigpaddle', color: '#22c55e', icon: '🟢' },
            { type: 'laser', color: '#ef4444', icon: '🔴' },
            { type: 'extralife', color: '#eab308', icon: '🟡' }
        ];
        
        const powerUpType = types[Math.floor(Math.random() * types.length)];
        
        this.powerUps.push({
            x: x - 15,
            y: y,
            width: 30,
            height: 30,
            speed: 3,
            type: powerUpType.type,
            color: powerUpType.color,
            icon: powerUpType.icon
        });
    }
    
    activatePowerUp(type) {
        if (window.gameAudio) {
            window.gameAudio.playSound('click');
        }
        
        switch (type) {
            case 'multiball':
                if (this.balls.length > 0) {
                    const mainBall = this.balls[0];
                    for (let i = 0; i < 2; i++) {
                        const angle = (Math.random() - 0.5) * Math.PI / 2;
                        this.balls.push({
                            x: mainBall.x,
                            y: mainBall.y,
                            dx: Math.sin(angle) * mainBall.speed,
                            dy: Math.cos(angle) * mainBall.speed,
                            radius: mainBall.radius,
                            speed: mainBall.speed,
                            color: '#3b82f6'
                        });
                    }
                }
                break;
                
            case 'bigpaddle':
                this.powerUpEffects.bigPaddle.active = true;
                this.powerUpEffects.bigPaddle.timer = Date.now();
                this.paddle.width = 180;
                break;
                
            case 'laser':
                this.powerUpEffects.laser.active = true;
                this.powerUpEffects.laser.timer = Date.now();
                break;
                
            case 'extralife':
                this.lives++;
                break;
        }
    }
    
    loseLife() {
        this.lives--;
        
        if (window.gameAudio) {
            window.gameAudio.playSound('lose');
        }
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.resetBall();
        }
    }
    
    checkWinCondition() {
        if (this.bricks.length === 0) {
            this.level++;
            
            if (this.level > this.levels.length) {
                this.gameComplete();
            } else {
                this.nextLevel();
            }
        }
    }
    
    nextLevel() {
        this.gameState = 'levelComplete';
        
        setTimeout(() => {
            this.resetBall();
            this.createLevel();
            this.gameState = 'playing';
            
            if (window.gameAudio) {
                window.gameAudio.playSound('win');
            }
        }, 2000);
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.showModal('💥', 'Game Over!', `You scored ${this.score} points and reached level ${this.level}!`);
        
        document.getElementById('startBtn').style.display = 'inline-flex';
        document.getElementById('pauseBtn').style.display = 'none';
    }
    
    gameComplete() {
        this.gameState = 'gameOver';
        this.showModal('🏆', 'Congratulations!', `You completed all levels! Final score: ${this.score}`);
        
        document.getElementById('startBtn').style.display = 'inline-flex';
        document.getElementById('pauseBtn').style.display = 'none';
    }
    
    showModal(icon, title, text) {
        document.getElementById('modalIcon').textContent = icon;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalText').textContent = text;
        document.getElementById('gameOverModal').style.display = 'flex';
    }
    
    hideModal() {
        document.getElementById('gameOverModal').style.display = 'none';
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('bricks').textContent = this.bricks.length;
    }
    
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#1e293b');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw game objects
        this.drawBricks();
        this.drawPaddle();
        this.drawBalls();
        this.drawPowerUps();
        this.drawLasers();
        this.drawUI();
        
        // Draw pause overlay
        if (this.gameState === 'paused') {
            this.drawPauseOverlay();
        }
        
        // Draw level complete overlay
        if (this.gameState === 'levelComplete') {
            this.drawLevelCompleteOverlay();
        }
    }
    
    drawBricks() {
        this.bricks.forEach(brick => {
            // Calculate alpha based on health
            const alpha = brick.health / brick.maxHealth;
            
            // Draw brick with gradient
            const gradient = this.ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + brick.height);
            gradient.addColorStop(0, brick.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, brick.color + Math.floor(alpha * 180).toString(16).padStart(2, '0'));
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            
            // Draw border
            this.ctx.strokeStyle = '#ffffff40';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
            
            // Draw health indicator
            if (brick.maxHealth > 1) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.font = '12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(brick.health.toString(), brick.x + brick.width / 2, brick.y + brick.height / 2 + 4);
            }
        });
    }
    
    drawPaddle() {
        // Paddle gradient
        const gradient = this.ctx.createLinearGradient(this.paddle.x, this.paddle.y, this.paddle.x, this.paddle.y + this.paddle.height);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(1, '#6a11cb');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        
        // Paddle glow effect if big paddle is active
        if (this.powerUpEffects.bigPaddle.active) {
            this.ctx.shadowColor = '#22c55e';
            this.ctx.shadowBlur = 10;
            this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
            this.ctx.shadowBlur = 0;
        }
        
        // Laser cannons if laser is active
        if (this.powerUpEffects.laser.active) {
            this.ctx.fillStyle = '#ef4444';
            this.ctx.fillRect(this.paddle.x + 10, this.paddle.y - 5, 8, 5);
            this.ctx.fillRect(this.paddle.x + this.paddle.width - 18, this.paddle.y - 5, 8, 5);
            
            // Auto-fire lasers
            if (Math.random() < 0.1) {
                this.lasers.push({
                    x: this.paddle.x + 14,
                    y: this.paddle.y - 5,
                    width: 2,
                    height: 10,
                    speed: 8,
                    color: '#ef4444'
                });
                
                this.lasers.push({
                    x: this.paddle.x + this.paddle.width - 14,
                    y: this.paddle.y - 5,
                    width: 2,
                    height: 10,
                    speed: 8,
                    color: '#ef4444'
                });
            }
        }
    }
    
    drawBalls() {
        this.balls.forEach(ball => {
            // Ball gradient
            const gradient = this.ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
            gradient.addColorStop(0, '#ffffff');
            gradient.addColorStop(1, ball.color);
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Ball glow
            this.ctx.shadowColor = ball.color;
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawPowerUps() {
        this.powerUps.forEach(powerUp => {
            // Power-up background
            this.ctx.fillStyle = powerUp.color;
            this.ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
            
            // Power-up icon
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(powerUp.icon, powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2 + 6);
        });
    }
    
    drawLasers() {
        this.lasers.forEach(laser => {
            this.ctx.fillStyle = laser.color;
            this.ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
            
            // Laser glow
            this.ctx.shadowColor = laser.color;
            this.ctx.shadowBlur = 5;
            this.ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawUI() {
        // Ready state instruction
        if (this.gameState === 'ready' || !this.ballLaunched) {
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Click to launch ball!', this.canvas.width / 2, this.canvas.height / 2);
        }
    }
    
    drawPauseOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);
    }
    
    drawLevelCompleteOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#22c55e';
        this.ctx.font = '32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Level ${this.level - 1} Complete!`, this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.ctx.fillText(`Loading Level ${this.level}...`, this.canvas.width / 2, this.canvas.height / 2 + 20);
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.breakout = new Breakout();
});
