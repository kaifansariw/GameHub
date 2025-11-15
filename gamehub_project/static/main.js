// Game data
// Game data
const games = [
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    description: "Classic 3x3 grid game",
    image: "/static/assets/tiktactoe.png",
    file: "/static/games/tic-tac-toe.html",
    category: "strategy",
  },
  {
    id: "snake",
    title: "Snake Game",
    description: "Eat food and grow longer",
    image: "/static/assets/snake_game.png",
    file: "/static/games/snake.html",
    category: "arcade",
  },
  {
    id: "simon",
    title: "Simon Says",
    description: "Memory pattern game",
    image: "/static/assets/simon_says.png",
    file: "/static/games/simon.html",
    category: "memory",
  },
  {
    id: "memory",
    title: "Memory Flip",
    description: "Match pairs of cards",
    image: "/static/assets/memory_flip.png",
    file: "/static/games/memory.html",
    category: "memory",
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    description: "Classic hand game",
    image: "/static/assets/rockpaperscissors.png",
    file: "/static/games/rps.html",
    category: "strategy",
  },
  {
    id: "2048",
    title: "2048 Game",
    description: "Slide tiles to reach 2048",
    image: "https://play-lh.googleusercontent.com/I-cDz4JCEufeRmvJCYLJO_p9i4xCcToKpOtzwvwaYoHU1HmcglEHejPceMeNYSDBXAo",
    file: "/static/games/2048.html",
    category: "puzzle"
  },
  {
    id: 'sudoku',
    title: 'Sudoku Puzzle',
    description: 'Classic number placement puzzle',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
    file: 'games/sudoku.html',
    category: 'puzzle'
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    description: 'Clear the field without hitting mines',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
    file: 'games/minesweeper.html',
    category: 'puzzle'
  },
  {
    id: 'breakout',
    title: 'Breakout',
    description: 'Break all the bricks with paddle and ball',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
    file: 'games/breakout.html',
    category: 'arcade'
  },
  {
    id: "balloon-popper",
    title: "Balloon Popper",
    description: "Pop balloons before time runs out",
    image: "https://images.unsplash.com/photo-1501472312651-726afe119ff1?q=80&w=1000",
    file: "/static/games/Balloon Popper/index.html",
    category: "arcade"
  },
  {
    id: "boom-runner",
    title: "Boom Runner",
    description: "Dodge bombs and survive",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?q=80&w=1000",
    file: "/static/games/boom-runner/index.html",
    category: "action"
  },
  {
    id: "brick-breaker",
    title: "Brick Breaker",
    description: "Break all the bricks using the paddle",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
    file: "/static/games/Brick Breaker/index.html",
    category: "arcade"
  },
  {
    id: "bubble-shooter",
    title: "Bubble Shooter",
    description: "Match and pop colorful bubbles",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/Bubble Shooter/index.html",
    category: "puzzle"
  },
  {
    id: "candy-match-mania",
    title: "Candy Match Mania",
    description: "Match candies to score points",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1000",
    file: "/static/games/Candy Match Mania/index.html",
    category: "puzzle"
  },
  {
    id: "code-unlock",
    title: "Code Unlock",
    description: "Crack the code using logic",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    file: "/static/games/code-unlock/index.html",
    category: "logic"
  },
  {
    id: "color-grid",
    title: "Color Grid",
    description: "Solve the color-matching puzzle",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/color grid/index.html",
    category: "puzzle"
  },
  {
    id: "dodge-square",
    title: "Dodge Square",
    description: "Avoid obstacles and survive",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/Dodge Square/index.html",
    category: "action"
  },
  {
    id: "firefly-flow",
    title: "Firefly Flow",
    description: "Guide the fireflies through patterns",
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=1000",
    file: "/static/games/firefly-flow/index.html",
    category: "puzzle"
  },
  {
    id: "flappy-block",
    title: "Flappy Block",
    description: "Flap through obstacles",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000",
    file: "/static/games/Flappy Block/index.html",
    category: "arcade"
  },
  {
    id: "freeze-frame",
    title: "Freeze Frame",
    description: "Stop the motion at the right moment",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1000",
    file: "/static/games/freeze-frame/index.html",
    category: "reflex"
  },
  {
    id: "fruit-slice",
    title: "Fruit Slice",
    description: "Slice fruits with precision",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=1000",
    file: "/static/games/Fruit Slice/index.html",
    category: "arcade"
  },
  {
    id: "glow-chain",
    title: "Glow Chain",
    description: "Trigger glowing chain reactions",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000",
    file: "/static/games/glow-chain/index.html",
    category: "strategy"
  },
  {
    id: "glow-drops",
    title: "Glow Drops",
    description: "Tap glowing drops before they disappear",
    image: "https://images.unsplash.com/photo-1483794344563-d27a8d18014e?q=80&w=1000",
    file: "/static/games/glow-drops/index.html",
    category: "arcade"
  },
  {
    id: "glow-tap",
    title: "Glow Tap",
    description: "Tap glowing circles in time",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000",
    file: "/static/games/glow-tap/index.html",
    category: "reflex"
  },
  {
    id: "gravity-flip-ball",
    title: "Gravity Flip Ball",
    description: "Flip gravity to move the ball",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000",
    file: "/static/games/gravity-flip-ball/index.html",
    category: "puzzle"
  },
  {
    id: "hangman-hero",
    title: "Hangman Hero",
    description: "Guess the hidden words",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/Hangman Hero/index.html",
    category: "word"
  },
  {
    id: "jump-counter",
    title: "Jump Counter",
    description: "Jump and increase your score",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1000",
    file: "/static/games/jump-counter/index.html",
    category: "arcade"
  },
  {
    id: "jump-tag",
    title: "Jump Tag",
    description: "Tag the targets by jumping",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/jump-tag/index.html",
    category: "arcade"
  },
  {
    id: "logic-path",
    title: "Logic Path",
    description: "Guide the ball using logic",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/logic-path/index.html",
    category: "logic"
  },
  {
    id: "memory-blink",
    title: "Memory Blink",
    description: "Remember blinking patterns",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000",
    file: "/static/games/memory-blink/index.html",
    category: "memory"
  },
  {
    id: "pattern-memory",
    title: "Pattern Memory",
    description: "Remember and repeat the patterns",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/pattern memory/index.html",
    category: "memory"
  },
  {
    id: "pipe-twister",
    title: "Pipe Twister",
    description: "Rotate pipes to connect the flow",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/pipe-twister/index.html",
    category: "puzzle"
  },
  {
    id: "reaction-speed-test",
    title: "Reaction Speed Test",
    description: "Test your reflex speed",
    image: "https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?q=80&w=1000",
    file: "/static/games/Reaction Speed Test/index.html",
    category: "reflex"
  },
  {
    id: "sand-draw",
    title: "Sand Draw",
    description: "Draw in virtual sand",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000",
    file: "/static/games/sand-draw/index.html",
    category: "creative"
  },
  {
    id: "sliding-puzzle",
    title: "Sliding Puzzle",
    description: "Slide blocks to complete the image",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000",
    file: "/static/games/Sliding Puzzle/index.html",
    category: "puzzle"
  },
  {
    id: "speed-tap-grid",
    title: "Speed Tap Grid",
    description: "Tap targets quickly on a grid",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/speed-tap-grid/index.html",
    category: "reflex"
  },
  {
    id: "symbol-swap",
    title: "Symbol Swap",
    description: "Swap symbols to match rows",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/symbol-swap/index.html",
    category: "puzzle"
  },
  {
    id: "tap-counter",
    title: "Tap Counter",
    description: "Tap repeatedly to score",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/tap-counter/index.html",
    category: "arcade"
  },
  {
    id: "tetris",
    title: "Tetris",
    description: "Classic falling block puzzle",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/Tetris/index.html",
    category: "classic"
  },
  {
    id: "tower-of-hanoi",
    title: "Tower of Hanoi",
    description: "Move disks using minimum moves",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/Tower of Hanoi/index.html",
    category: "logic"
  },
  {
    id: "typing-sprint",
    title: "Typing Sprint",
    description: "Type words quickly to score",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/Typing Sprint/index.html",
    category: "skill"
  },
  {
    id: "vortex-jump",
    title: "Vortex Jump",
    description: "Jump through twisting vortex paths",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1000",
    file: "/static/games/vortex-jump/index.html",
    category: "arcade"
  },
  {
    id: "word-chain",
    title: "Word Chain",
    description: "Form a chain of related words",
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',

    file: "/static/games/word chain/index.html",
    category: "word"
  },
  {
    id: "word-scramble",
    title: "Word Scramble",
    description: "Unscramble letters to form words",
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1000",
    file: "/static/games/Word Scramble/index.html",
    category: "word"
  }
];



// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
});

// Render games with futuristic styling
function renderGames(gamesToRender = games) {
  const gamesGrid = document.getElementById("gamesGrid");
  gamesGrid.innerHTML = "";

  gamesToRender.forEach((game, index) => {
    const gameCard = document.createElement("div");
    gameCard.className = "game-card";
    gameCard.setAttribute("data-aos", "fade-up");
    gameCard.setAttribute("data-aos-delay", index * 100);

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
                <button onclick="playGame('${game.file}')" class="pixel-btn glow-on-hover game-play-btn w-full">
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
  let recentlyPlayed = JSON.parse(
    localStorage.getItem("recentlyPlayed") || "[]"
  );
  const game = games.find((g) => g.file === gameFile);

  if (game) {
    recentlyPlayed = recentlyPlayed.filter((g) => g.id !== game.id);
    recentlyPlayed.unshift(game);
    recentlyPlayed = recentlyPlayed.slice(0, 5);
    localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  }

  window.location.href = gameFile;
}

// Theme toggle functionality
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Update icon
    const icon = themeToggle.querySelector("i");
    icon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";

    // Add animation
    themeToggle.style.transform = "scale(0.8)";
    setTimeout(() => {
      themeToggle.style.transform = "scale(1)";
    }, 150);
  });
}

// Enhanced search with animations
function setupEnhancedSearch() {
  const searchInput = document.getElementById("searchInput");
  const gamesGrid = document.getElementById("gamesGrid");

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Add loading state
    gamesGrid.style.opacity = "0.5";

    setTimeout(() => {
      const filteredGames = games.filter(
        (game) =>
          game.title.toLowerCase().includes(searchTerm) ||
          game.description.toLowerCase().includes(searchTerm) ||
          game.category.toLowerCase().includes(searchTerm)
      );

      renderGames(filteredGames);
      gamesGrid.style.opacity = "1";

      // scroll to "Featured Games" section
      const gamesSection = document.getElementById('games');
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }

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
  const particleContainer = document.createElement("div");
  particleContainer.className = "fixed inset-0 pointer-events-none z-0";
  document.body.appendChild(particleContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className =
      "absolute w-1 h-1 bg-purple-400 rounded-full opacity-30";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.classList.add("floating");
    particleContainer.appendChild(particle);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Update theme toggle icon
  const themeIcon = document.querySelector("#themeToggle i");
  if (themeIcon) {
    themeIcon.className = savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
  }

  renderGames();
  setupEnhancedSearch();
  setupThemeToggle();
  createParticles();
});

// Updating footer year
document.getElementById('footeryear').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
