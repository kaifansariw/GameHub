// Memory Flip Game Logic
const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺'];
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let bestScore = localStorage.getItem('memoryBestScore') || null;
let gameActive = true;

// Initialize game
function initGame() {
    createCards();
    shuffleCards();
    renderBoard();
    updateStats();
    
    if (bestScore) {
        document.getElementById('bestScore').textContent = bestScore;
    }
}

// Create card pairs
function createCards() {
    cards = [];
    emojis.forEach(emoji => {
        cards.push({ emoji, flipped: false, matched: false, id: Math.random() });
        cards.push({ emoji, flipped: false, matched: false, id: Math.random() });
    });
}

// Shuffle cards
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Render game board
function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `card-flip aspect-square cursor-pointer transition-all duration-300 ${
            card.flipped || card.matched ? 'flipped' : ''
        }`;
        cardElement.onclick = () => flipCard(index);
        
        cardElement.innerHTML = `
            <div class="card-inner relative w-full h-full">
                <div class="card-front absolute inset-0 bg-primary rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                    <i class="fas fa-question"></i>
                </div>
                <div class="card-back absolute inset-0 bg-base-100 rounded-lg flex items-center justify-center text-4xl shadow-lg border-2 border-primary">
                    ${card.emoji}
                </div>
            </div>
        `;
        
        gameBoard.appendChild(cardElement);
    });
}

// Flip card
function flipCard(index) {
    if (!gameActive || cards[index].flipped || cards[index].matched || flippedCards.length >= 2) {
        return;
    }
    
    cards[index].flipped = true;
    flippedCards.push(index);
    
    const cardElement = document.querySelectorAll('.card-flip')[index];
    cardElement.classList.add('flipped', 'animate__animated', 'animate__flipInY');
    
    if (flippedCards.length === 2) {
        moves++;
        updateStats();
        setTimeout(checkMatch, 1000);
    }
}

// Check for match
function checkMatch() {
    const [first, second] = flippedCards;
    
    if (cards[first].emoji === cards[second].emoji) {
        // Match found
        cards[first].matched = true;
        cards[second].matched = true;
        matchedPairs++;
        
        const cardElements = document.querySelectorAll('.card-flip');
        cardElements[first].classList.add('animate__animated', 'animate__pulse');
        cardElements[second].classList.add('animate__animated', 'animate__pulse');
        
        if (matchedPairs === emojis.length) {
            gameWon();
        }
    } else {
        // No match
        cards[first].flipped = false;
        cards[second].flipped = false;
        
        const cardElements = document.querySelectorAll('.card-flip');
        cardElements[first].classList.remove('flipped');
        cardElements[second].classList.remove('flipped');
        cardElements[first].classList.add('animate__animated', 'animate__shakeX');
        cardElements[second].classList.add('animate__animated', 'animate__shakeX');
    }
    
    flippedCards = [];
    updateStats();
}

// Game won
function gameWon() {
    gameActive = false;
    
    // Check for best score
    if (!bestScore || moves < parseInt(bestScore)) {
        bestScore = moves;
        localStorage.setItem('memoryBestScore', bestScore);
        document.getElementById('bestScore').textContent = bestScore;
    }
    
    // Show result
    const resultDiv = document.getElementById('gameResult');
    const resultText = document.getElementById('resultText');
    resultText.textContent = `Congratulations! You completed the game in ${moves} moves! 🎉`;
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('animate__animated', 'animate__fadeInUp');
}

// Update statistics
function updateStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = `${matchedPairs}/${emojis.length}`;
}

// Reset game
function resetGame() {
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    gameActive = true;
    
    document.getElementById('gameResult').classList.add('hidden');
    initGame();
}

// Add CSS for card flip animation
const style = document.createElement('style');
style.textContent = `
    .card-flip {
        perspective: 1000px;
    }
    
    .card-inner {
        transform-style: preserve-3d;
        transition: transform 0.6s;
    }
    
    .card-flip.flipped .card-inner {
        transform: rotateY(180deg);
    }
    
    .card-front, .card-back {
        backface-visibility: hidden;
    }
    
    .card-back {
        transform: rotateY(180deg);
    }
`;
document.head.appendChild(style);

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', initGame);

window.resetGame = resetGame;