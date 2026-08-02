const gameArea = document.getElementById('game-area');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreEl = document.getElementById('score');

const tapSound = document.getElementById('tap-sound');
const failSound = document.getElementById('fail-sound');

let gameInterval;
let obstacleInterval;
let score = 0;
let running = false;

function createBulb() {
    const bulb = document.createElement('div');
    bulb.className = 'bulb';
    bulb.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
    bulb.style.top = '0px';

    gameArea.appendChild(bulb);

    let fall = setInterval(() => {
        let top = parseInt(bulb.style.top, 10);
        if (top >= gameArea.clientHeight - 50) {
            failSound.play();
            gameArea.removeChild(bulb);
            clearInterval(fall);
        } else {
            bulb.style.top = top + 5 + 'px';
        }
    }, 30);

    bulb.addEventListener('click', () => {
        tapSound.play();
        score += 1;
        scoreEl.textContent = score;
        gameArea.removeChild(bulb);
        clearInterval(fall);
    });
}

function createObstacle() {
    const obs = document.createElement('div');
    obs.className = 'obstacle';
    obs.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
    obs.style.top = '0px';

    gameArea.appendChild(obs);

    let fall = setInterval(() => {
        let top = parseInt(obs.style.top, 10);
        if (top >= gameArea.clientHeight - 50) {
            gameArea.removeChild(obs);
            clearInterval(fall);
        } else {
            obs.style.top = top + 4 + 'px';
        }
    }, 30);
}

function startGame() {
    if (running) return;
    running = true;
    gameInterval = setInterval(createBulb, 1000);
    obstacleInterval = setInterval(createObstacle, 2000);
}

function pauseGame() {
    running = false;
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
}

function restartGame() {
    pauseGame();
    score = 0;
    scoreEl.textContent = score;
    gameArea.innerHTML = '';
    startGame();
}

startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
restartBtn.addEventListener('click', restartGame);
