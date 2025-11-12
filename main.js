// Game data
const games = [
    {
        id: 'tic-tac-toe',
        title: 'Tic Tac Toe',
        description: 'Classic 3x3 grid game',
        image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
        file: 'games/tic-tac-toe.html',
        category: 'strategy'
    },
    {
        id: 'snake',
        title: 'Snake Game',
        description: 'Eat food and grow longer',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
        file: 'games/snake.html',
        category: 'arcade'
    },
    {
        id: 'simon',
        title: 'Simon Says',
        description: 'Memory pattern game',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
        file: 'games/simon.html',
        category: 'memory'
    },
    {
        id: 'memory',
        title: 'Memory Flip',
        description: 'Match pairs of cards',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
        file: 'games/memory.html',
        category: 'memory'
    },
    {
        id: 'rps',
        title: 'Rock Paper Scissors',
        description: 'Classic hand game',
        image: 'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
        file: 'games/rps.html',
        category: 'strategy'
    }
];

// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Render games with futuristic styling
function renderGames(gamesToRender = games) {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';

    gamesToRender.forEach((game, index) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.setAttribute('data-aos', 'fade-up');
        gameCard.setAttribute('data-aos-delay', index * 100);

        gameCard.innerHTML = `
            <div class="relative overflow-hidden rounded-xl mb-4">
                <img src="${game.image}" alt="${game.title}" class="w-full h-48 object-cover" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span class="text-white font-orbitron font-semibold">${game.category}</span>
                </div>
            </div>
            <div class="text-center">
                <h3 class="font-orbitron font-bold text-xl mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ${game.title}
                </h3>
                <p class="font-rajdhani text-gray-400 mb-4">${game.description}</p>
                <button onclick="playGame('${game.file}')" class="game-play-btn w-full">
                    <i class="fas fa-rocket mr-2"></i>Play Now
                </button>
            </div>
        `;

        gamesGrid.appendChild(gameCard);
    });

    // Refresh AOS
    AOS.refresh();
}

// Play game function
function playGame(gameFile) {
    // Store recently played
    let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
    const game = games.find(g => g.file === gameFile);
    
    if (game) {
        recentlyPlayed = recentlyPlayed.filter(g => g.id !== game.id);
        recentlyPlayed.unshift(game);
        recentlyPlayed = recentlyPlayed.slice(0, 5);
        localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
    }

    window.location.href = gameFile;
}



// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        
        // Add animation
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// Enhanced search with animations
function setupEnhancedSearch() {
    const searchInput = document.getElementById('searchInput');
    const gamesGrid = document.getElementById('gamesGrid');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Add loading state
        gamesGrid.style.opacity = '0.5';
        
        setTimeout(() => {
            const filteredGames = games.filter(game => 
                game.title.toLowerCase().includes(searchTerm) ||
                game.description.toLowerCase().includes(searchTerm) ||
                game.category.toLowerCase().includes(searchTerm)
            );
            
            renderGames(filteredGames);
            gamesGrid.style.opacity = '1';
            
            // Show no results message
            if (filteredGames.length === 0 && searchTerm) {
                gamesGrid.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-search text-6xl text-gray-600 mb-4"></i>
                        <h3 class="font-orbitron text-xl text-gray-400 mb-2">No games found</h3>
                        <p class="font-rajdhani text-gray-500">Try searching with different keywords</p>
                    </div>
                `;
            }
        }, 300);
    });
}

// Add particle effect
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'fixed inset-0 pointer-events-none z-0';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-purple-400 rounded-full opacity-30';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.classList.add('floating');
        particleContainer.appendChild(particle);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle icon
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    renderGames();
    setupEnhancedSearch();
    setupThemeToggle();
    createParticles();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});