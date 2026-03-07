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
    file: '/static/games/sudoku.html',
    category: 'puzzle'
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    description: 'Clear the field without hitting mines',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
    file: '/static/games/minesweeper.html',
    category: 'puzzle'
  },
  {
    id: 'breakout',
    title: 'Breakout',
    description: 'Break all the bricks with paddle and ball',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop&crop=center&auto=format&q=80',
    file: '/static/games/breakout.html',
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
  },
  {
    id: 'typing-speed-test',
    title: 'Typing Speed Test',
    description: 'A clean, fast, minimalistic typing speed test game with multiple modes and a smooth UI.',
    image: '/static/assets/typing-speed-test.png',
    file: '/static/games/typing-speed-test/index.html',
    category: 'productivity'
  },
  {
    id: 'DashX',
    title: 'Dash X',
    description: 'A fast-paced endless runner game set in a neon-lit futuristic cityscape.',
    image: '/static/assets/DashX_logo.png',
    file: '/static/games/DashX/index.html',
    category: 'arcade'
  },
  {
    id: 'Flappy',
    title: ' Flappy Bird',
    description: 'An arcade game where a bird had to pass from obstacles.',
    image: '/static/games/flappyBird/Logo.png',
    file: '/static/games/flappyBird/flappy.html',
    category: 'arcade'
  },
  {
  id: "whack-a-mole",
  title: "Whack-A-Mole",
  description: "Whack the moles before time runs out",
  image: "/static/assets/Whake-a-mole.png",
  file: "/static/games/whack-a-mole.html",
  category: "arcade"
}
];

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================

/**
 * Initialize theme on page load
 * Checks localStorage and system preference
 */
function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("i");
  
  // Check for saved theme preference or default to system preference
  let savedTheme = localStorage.getItem("theme");
  
  // If no saved theme, detect system preference
  if (!savedTheme) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    savedTheme = prefersDark ? "dark" : "light";
  }
  
  // Apply theme
document.body.setAttribute("data-theme", savedTheme);
  
  // Update icon
  if (themeIcon) {
    themeIcon.className = savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
  }
  
  // Log for debugging
  console.log(`🎨 Theme initialized: ${savedTheme}`);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("i");
  
  // Get current theme
  const currentTheme = document.body.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  // Apply new theme with smooth transition
  document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
  document.body.setAttribute("data-theme", newTheme);

  
  // Save to localStorage
  localStorage.setItem("theme", newTheme);
  
  // Update icon with rotation animation
  if (themeIcon) {
    themeIcon.style.transform = "rotate(360deg)";
    setTimeout(() => {
      themeIcon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
      themeIcon.style.transform = "rotate(0deg)";
    }, 150);
  }
  
  // Add scale animation to button
  if (themeToggle) {
    themeToggle.style.transform = "scale(0.8)";
    setTimeout(() => {
      themeToggle.style.transform = "scale(1)";
    }, 150);
  }
  
  // Show theme change notification (optional)
  showThemeNotification(newTheme);
  
  console.log(`🎨 Theme changed to: ${newTheme}`);
}

/**
 * Show a subtle notification when theme changes (optional)
 */
function showThemeNotification(theme) {
  const notification = document.createElement("div");
  notification.className = "theme-notification";
  notification.textContent = `${theme === "dark" ? "🌙" : "☀️"} ${theme === "dark" ? "Dark" : "Light"} Mode`;
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    padding: 12px 24px;
    border-radius: 12px;
    color: var(--text-primary);
    font-family: 'Orbitron', monospace;
    font-weight: 600;
    z-index: 1000;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateY(0)";
  }, 10);
  
  // Remove after 2 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(20px)";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

/**
 * Setup theme toggle button event listener
 */
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    
    // Add keyboard accessibility
    themeToggle.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTheme();
      }
    });
    
    // Make it focusable
    themeToggle.setAttribute("tabindex", "0");
    themeToggle.setAttribute("role", "button");
    themeToggle.setAttribute("aria-label", "Toggle dark mode");
  }
}

/**
 * Listen for system theme changes
 */
function setupSystemThemeListener() {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  
  darkModeMediaQuery.addEventListener("change", (e) => {
    // Only auto-update if user hasn't manually set a preference
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      const newTheme = e.matches ? "dark" : "light";
      document.body.setAttribute("data-theme", newTheme);
      
      const themeIcon = document.querySelector("#themeToggle i");
      if (themeIcon) {
        themeIcon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
      }

      
      console.log(`🎨 System theme changed to: ${newTheme}`);
    }
  });
}

// ============================================
// GAME RENDERING AND SEARCH
// ============================================

// Render games with futuristic styling
function renderGames(gamesToRender = games) {
  const gamesGrid = document.getElementById("gamesGrid");
  if (!gamesGrid) return;
  
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

  // Refresh AOS if available
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// Enhanced search with animations
function setupEnhancedSearch() {
  const searchInput = document.getElementById("searchInput");
  const gamesGrid = document.getElementById("gamesGrid");
  const noResults = document.getElementById("noResults"); // Reference the new ID from index.html
  
  if (!searchInput || !gamesGrid) return;

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    // Add loading state effect
    gamesGrid.style.opacity = "0.5";

    setTimeout(() => {
      const filteredGames = games.filter(
        (game) =>
          game.title.toLowerCase().includes(searchTerm) ||
          game.description.toLowerCase().includes(searchTerm) ||
          game.category.toLowerCase().includes(searchTerm)
      );

      // 1. Render the games
      renderGames(filteredGames);
      gamesGrid.style.opacity = "1";

      // 2. Handle the "No Results" visibility
      if (filteredGames.length === 0 && searchTerm !== "") {
        // Show the message, hide the grid
        if (noResults) noResults.classList.remove('hidden');
        gamesGrid.classList.add('hidden');
      } else {
        // Hide the message, show the grid
        if (noResults) noResults.classList.add('hidden');
        gamesGrid.classList.remove('hidden');
      }

      // 3. Scroll to section if searching
      const gamesSection = document.getElementById('games');
      if (gamesSection && searchTerm) {
        gamesSection.scrollIntoView({ behavior: "smooth", block: "start" });
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
    particle.className = "absolute w-1 h-1 bg-purple-400 rounded-full opacity-30";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.classList.add("floating");
    particleContainer.appendChild(particle);
  }
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
    });
  }
  
  // Initialize theme FIRST (before anything else renders)
  initializeTheme();
  
  // Setup theme toggle
  setupThemeToggle();
  
  // Setup system theme listener
  setupSystemThemeListener();
  
  // Render games
  renderGames();
  
  // Setup search
  setupEnhancedSearch();
  
  // Create particles
  createParticles();

  // Render progress section
  renderProgressSection();
  
  // Update footer year if element exists
  const footerYear = document.getElementById('footeryear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
  
  console.log("✅ GameHub initialized successfully!");
  console.log(`📊 Total games loaded: ${games.length}`);
});

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


function getCSRFToken() {
  return document.cookie
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith("csrftoken="))
    ?.split("=")[1] || "";
}

function playGame(gameFile) {

  // ❗ 1) Block iframe scoring and redirect
  if (window !== window.parent) return;

  const game = games.find(g => g.file === gameFile);

  if (game) {
    // ❗ 2) Recently played
    let recent = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");

    recent = recent.filter(g => g.id !== game.id);
    recent.unshift(game);
    recent = recent.slice(0, 5);

    localStorage.setItem("recentlyPlayed", JSON.stringify(recent));

    // NOTE: Visit will be tracked by the individual game page on load to avoid duplicate counts.
  }

  // ❗ 4) Redirect to game
  window.location.href = gameFile;
}

main.js

// ============================================
// GAME STATISTICS AND ANALYTICS
// ============================================

// ============================================
// PROGRESS SECTION RENDERING
// ============================================

function renderProgressSection() {
  if (!window.GameHubScores) return;

  var allScores = window.GameHubScores.getAllScores();
  var scoreEntries = Object.entries(allScores);
  var gamesPlayedCount = scoreEntries.length;
  var totalScore = window.GameHubScores.getTotalScore();

  // Update stats overview
  var gamesPlayedEl = document.getElementById('progressGamesPlayed');
  if (gamesPlayedEl) gamesPlayedEl.textContent = gamesPlayedCount;

  var totalScoreEl = document.getElementById('progressTotalScore');
  if (totalScoreEl) totalScoreEl.textContent = totalScore.toLocaleString();

  // Best game (highest score, excluding lowerIsBetter)
  var bestGameEl = document.getElementById('progressBestGame');
  if (bestGameEl && scoreEntries.length > 0) {
    var best = null;
    var bestId = null;
    scoreEntries.forEach(function (entry) {
      var id = entry[0], data = entry[1];
      if (!data.lowerIsBetter && (best === null || data.highScore > best.highScore)) {
        best = data;
        bestId = id;
      }
    });
    if (bestId) {
      var gameObj = games.find(function (g) { return g.id === bestId; });
      bestGameEl.textContent = gameObj ? gameObj.title : bestId;
      bestGameEl.style.fontSize = '0.9rem';
    }
  }

  // Recently played count
  var recentCountEl = document.getElementById('progressRecentCount');
  if (recentCountEl) {
    try {
      var recent = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
      recentCountEl.textContent = recent.length;
    } catch (e) {
      recentCountEl.textContent = '0';
    }
  }

  // Render high scores list
  var container = document.getElementById('highScoresContainer');
  var noScoresMsg = document.getElementById('noScoresMsg');
  if (!container) return;

  if (scoreEntries.length === 0) {
    if (noScoresMsg) noScoresMsg.style.display = 'block';
    return;
  }

  if (noScoresMsg) noScoresMsg.style.display = 'none';

  // Sort by highScore descending (put lowerIsBetter games at end)
  scoreEntries.sort(function (a, b) {
    if (a[1].lowerIsBetter && !b[1].lowerIsBetter) return 1;
    if (!a[1].lowerIsBetter && b[1].lowerIsBetter) return -1;
    return b[1].highScore - a[1].highScore;
  });

  var html = '';
  scoreEntries.forEach(function (entry) {
    var gameId = entry[0], data = entry[1];
    var gameObj = games.find(function (g) { return g.id === gameId; });
    var title = gameObj ? gameObj.title : gameId;
    var img = gameObj ? gameObj.image : '';
    var label = data.scoreLabel || 'High Score';
    var scoreDisplay = data.lowerIsBetter
      ? formatTime(data.highScore)
      : data.highScore.toLocaleString();
    var lastPlayed = data.lastPlayed
      ? new Date(data.lastPlayed).toLocaleDateString()
      : '';

    html += '<div class="high-score-item glass-card">';
    if (img) {
      html += '<img src="' + img + '" alt="' + title + '" class="high-score-img" loading="lazy" />';
    }
    html += '<div class="high-score-info">';
    html += '<div class="font-orbitron font-bold text-sm">' + title + '</div>';
    html += '<div class="font-rajdhani text-gray-400 text-xs">' + label + '</div>';
    html += '</div>';
    html += '<div class="high-score-value">';
    html += '<div class="font-orbitron font-bold text-lg text-purple-400">' + scoreDisplay + '</div>';
    if (lastPlayed) {
      html += '<div class="font-rajdhani text-gray-500 text-xs">' + lastPlayed + '</div>';
    }
    html += '</div>';
    html += '</div>';
  });

  // Keep noScoresMsg in DOM but hidden; insert new content before it
  container.innerHTML = html + (noScoresMsg ? noScoresMsg.outerHTML : '');
  var newNoMsg = container.querySelector('#noScoresMsg');
  if (newNoMsg) newNoMsg.style.display = 'none';
}

function formatTime(seconds) {
  var m = Math.floor(seconds / 60);
  var s = seconds % 60;
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

// Initialize game statistics
function initializeGameStats() {
  // Create stats object if it doesn't exist
  if (!localStorage.getItem("gameStats")) {
    const initialStats = {};
    games.forEach(game => {
      initialStats[game.id] = {
        plays: 0,
        lastPlayed: null,
        totalTime: 0
      };
    });
    localStorage.setItem("gameStats", JSON.stringify(initialStats));
  }
}

// Track game play
function trackGamePlay(gameId) {
  const stats = JSON.parse(localStorage.getItem("gameStats") || "{}");
  const gameStat = stats[gameId] || { plays: 0, lastPlayed: null, totalTime: 0 };
  
  gameStat.plays += 1;
  gameStat.lastPlayed = new Date().toISOString();
  
  stats[gameId] = gameStat;
  localStorage.setItem("gameStats", JSON.stringify(stats));
}

// Get game statistics
function getGameStats(gameId) {
  const stats = JSON.parse(localStorage.getItem("gameStats") || "{}");
  return stats[gameId] || { plays: 0, lastPlayed: null, totalTime: 0 };
}

// Get top played games
function getTopPlayedGames(limit = 5) {
  const stats = JSON.parse(localStorage.getItem("gameStats") || "{}");
  return Object.entries(stats)
    .sort((a, b) => b[1].plays - a[1].plays)
    .slice(0, limit)
    .map(([gameId, stat]) => {
      const game = games.find(g => g.id === gameId);
      return { ...game, ...stat };
    })
    .filter(game => game !== undefined);
}

// Update game card with play count
function updateGameCardWithStats() {
  // This function can be called to update game cards with play statistics
  // Implementation depends on UI design
}

// ============================================
// ENHANCED GAME CATEGORIES
// ============================================

// Get all unique categories
function getAllCategories() {
  const categories = [...new Set(games.map(game => game.category))];
  return categories.sort();
}

// Filter games by category
function filterGamesByCategory(category) {
  if (category === "all") {
    renderGames(games);
    return;
  }
  
  const filteredGames = games.filter(game => game.category === category);
  renderGames(filteredGames);
}

// Create category filter UI
function createCategoryFilters() {
  const categories = getAllCategories();
  const categoryContainer = document.getElementById("categoryFilters");
  
  if (!categoryContainer) return;
  
  // Add "All" category
  const allButton = document.createElement("button");
  allButton.className = "category-btn active";
  allButton.textContent = "All Games";
  allButton.onclick = () => {
    filterGamesByCategory("all");
    // Update active state
    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.classList.remove("active");
    });
    allButton.classList.add("active");
  };
  
  categoryContainer.appendChild(allButton);
  
  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "category-btn";
    button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    button.onclick = () => {
      filterGamesByCategory(category);
      // Update active state
      document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
    };
    
    categoryContainer.appendChild(button);
  });
}

// ============================================
// IMPROVED GAME SEARCH WITH SUGGESTIONS
// ============================================

// Enhanced search with suggestions
function setupImprovedSearch() {
  const searchInput = document.getElementById("searchInput");
  const gamesGrid = document.getElementById("gamesGrid");
  
  if (!searchInput || !gamesGrid) return;

  // Create search suggestions container
  const suggestionsContainer = document.createElement("div");
  suggestionsContainer.id = "searchSuggestions";
  suggestionsContainer.className = "search-suggestions";
  searchInput.parentNode.insertBefore(suggestionsContainer, searchInput.nextSibling);

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    // Clear previous suggestions
    suggestionsContainer.innerHTML = "";
    
    if (searchTerm.length > 0) {
      // Filter games for suggestions
      const suggestions = games.filter(
        (game) =>
          game.title.toLowerCase().includes(searchTerm) ||
          game.description.toLowerCase().includes(searchTerm) ||
          game.category.toLowerCase().includes(searchTerm)
      ).slice(0, 5); // Limit to 5 suggestions
      
      if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
          const suggestionItem = document.createElement("div");
          suggestionItem.className = "suggestion-item";
          suggestionItem.innerHTML = `
            <img src="${suggestion.image}" alt="${suggestion.title}" class="suggestion-img" />
            <div class="suggestion-content">
              <h4>${suggestion.title}</h4>
              <p>${suggestion.category}</p>
            </div>
          `;
          suggestionItem.onclick = () => {
            searchInput.value = suggestion.title;
            suggestionsContainer.innerHTML = "";
            const filteredGames = games.filter(
              (game) =>
                game.title.toLowerCase().includes(searchTerm) ||
                game.description.toLowerCase().includes(searchTerm) ||
                game.category.toLowerCase().includes(searchTerm)
            );
            renderGames(filteredGames);
          };
          suggestionsContainer.appendChild(suggestionItem);
        });
        suggestionsContainer.style.display = "block";
      }
    } else {
      suggestionsContainer.style.display = "none";
    }
  });
  
  // Hide suggestions when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
      suggestionsContainer.style.display = "none";
    }
  });
}

// ============================================
// GAME RATING SYSTEM
// ============================================

// Initialize game ratings
function initializeGameRatings() {
  if (!localStorage.getItem("gameRatings")) {
    const initialRatings = {};
    games.forEach(game => {
      initialRatings[game.id] = {
        average: 0,
        totalRatings: 0,
        userRating: null
      };
    });
    localStorage.setItem("gameRatings", JSON.stringify(initialRatings));
  }
}

// Rate a game
function rateGame(gameId, rating) {
  const ratings = JSON.parse(localStorage.getItem("gameRatings") || "{}");
  const gameRating = ratings[gameId] || { average: 0, totalRatings: 0, userRating: null };
  
  // Store user's rating
  const oldUserRating = gameRating.userRating || 0;
  gameRating.userRating = rating;
  
  // Update average
  const totalRatings = gameRating.totalRatings;
  const currentAverage = gameRating.average;
  
  // Remove old user rating from total
  const totalStars = (currentAverage * totalRatings) - oldUserRating;
  
  // If this is a new rating, increment total count
  if (oldUserRating === 0) {
    gameRating.totalRatings = totalRatings + 1;
  }
  
  // Add new rating
  const newTotalStars = totalStars + rating;
  gameRating.average = newTotalStars / gameRating.totalRatings;
  
  ratings[gameId] = gameRating;
  localStorage.setItem("gameRatings", JSON.stringify(ratings));
}

// Get game rating
function getGameRating(gameId) {
  const ratings = JSON.parse(localStorage.getItem("gameRatings") || "{}");
  return ratings[gameId] || { average: 0, totalRatings: 0, userRating: null };
}

// Create star rating element
function createStarRating(gameId, size = "small") {
  const rating = getGameRating(gameId);
  const container = document.createElement("div");
  container.className = `star-rating ${size}`;
  
  // Create stars
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.innerHTML = "★";
    star.dataset.rating = i;
    
    if (i <= Math.floor(rating.average)) {
      star.classList.add("filled");
    } else if (i === Math.ceil(rating.average) && rating.average % 1 !== 0) {
      star.classList.add("half");
    }
    
    // Add click event for user rating
    star.addEventListener("click", () => {
      rateGame(gameId, i);
      // Re-render the rating display
      const parent = container.parentNode;
      const newRating = createStarRating(gameId, size);
      parent.replaceChild(newRating, container);
    });
    
    container.appendChild(star);
  }
  
  // Add rating count
  const count = document.createElement("span");
  count.className = "rating-count";
  count.textContent = `(${rating.totalRatings})`;
  container.appendChild(count);
  
  return container;
}

// ============================================
// IMPROVED GAME CARD RENDERING WITH RATING
// ============================================

// Render games with ratings
function renderGamesWithRatings(gamesToRender = games) {
  const gamesGrid = document.getElementById("gamesGrid");
  if (!gamesGrid) return;
  
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
        <p class="font-rajdhani text-gray-400 mb-2">${game.description}</p>
        <div class="rating-container mb-2" id="rating-${game.id}"></div>
        <button onclick="playGame('${game.file}')" class="pixel-btn glow-on-hover game-play-btn w-full">
          <i class="fas fa-rocket mr-2"></i>Play Now
        </button>
      </div>
    `;

    gamesGrid.appendChild(gameCard);
    
    // Add rating after the card is added to DOM
    const ratingContainer = gameCard.querySelector(`#rating-${game.id}`);
    if (ratingContainer) {
      const starRating = createStarRating(game.id, "small");
      ratingContainer.appendChild(starRating);
    }
  });

  // Refresh AOS if available
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation for game cards
function setupGameCardAccessibility() {
  const gameCards = document.querySelectorAll(".game-card");
  
  gameCards.forEach(card => {
    // Make game cards focusable
    card.setAttribute("tabindex", "0");
    
    // Add keyboard event listener
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const playButton = card.querySelector(".game-play-btn");
        if (playButton) {
          playButton.click();
        }
      }
    });
  });
}

// Add focus styles for accessibility
function addFocusStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .game-card:focus,
    .category-btn:focus,
    .search-input:focus {
      outline: 2px solid var(--primary-accent);
      outline-offset: 2px;
      border-radius: 8px;
    }
    
    .game-card:focus-visible,
    .category-btn:focus-visible,
    .search-input:focus-visible {
      outline: 2px solid var(--primary-accent);
      outline-offset: 2px;
      border-radius: 8px;
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// IMPROVED RECENTLY PLAYED TRACKING
// ============================================

// Enhanced playGame function with statistics
function playGame(gameFile) {
  // ❗ 1) Block iframe scoring and redirect
  if (window !== window.parent) return;

  const game = games.find(g => g.file === gameFile);

  if (game) {
    // ❗ 2) Recently played
    let recent = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");

    recent = recent.filter(g => g.id !== game.id);
    recent.unshift(game);
    recent = recent.slice(0, 5);

    localStorage.setItem("recentlyPlayed", JSON.stringify(recent));
    
    // Track game statistics
    trackGamePlay(game.id);

    // NOTE: Visit will be tracked by the individual game page on load to avoid duplicate counts.
  }

  // ❗ 4) Redirect to game
  window.location.href = gameFile;
}

// ============================================
// INITIALIZE ALL SYSTEMS
// ============================================

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
    });
  }
  
  // Initialize game statistics
  initializeGameStats();
  
  // Initialize game ratings
  initializeGameRatings();
  
  // Initialize theme FIRST (before anything else renders)
  initializeTheme();
  
  // Setup theme toggle
  setupThemeToggle();
  
  // Setup system theme listener
  setupSystemThemeListener();
  
  // Render games with ratings
  renderGamesWithRatings();
  
  // Setup improved search
  setupImprovedSearch();
  
  // Create category filters
  createCategoryFilters();
  
  // Create particles
  createParticles();
  
  // Setup game card accessibility
  setupGameCardAccessibility();
  
  // Add focus styles
  addFocusStyles();

  // Render progress section
  renderProgressSection();
  
  // Update footer year if element exists
  const footerYear = document.getElementById('footeryear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
  
  console.log("✅ GameHub initialized successfully!");
  console.log(`📊 Total games loaded: ${games.length}`);
  
  // Log top played games
  const topGames = getTopPlayedGames(3);
  if (topGames.length > 0) {
    console.log("🔥 Top played games:", topGames.map(g => g.title));
  }
});

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


function getCSRFToken() {
  return document.cookie
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith("csrftoken="))
    ?.split("=")[1] || "";
}

// Duplicate theme toggle system - REMOVED to prevent conflicts

window.addEventListener("offline", () => {
  alert("You are offline. Some features may not work.");
});

window.addEventListener("online", () => {
  location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("network-status");
  const text = document.getElementById("network-text");

  function showOffline() {
    text.textContent = "You are offline";
    banner.classList.remove("hidden", "online");
    banner.classList.add("offline");
  }

  function showOnline() {
    text.textContent = "You are back online";
    banner.classList.remove("hidden", "offline");
    banner.classList.add("online");

    setTimeout(() => {
      banner.classList.add("hidden");
    }, 3000);
  }

  if (!navigator.onLine) {
    showOffline();
  }

  window.addEventListener("offline", showOffline);
  window.addEventListener("online", showOnline);
});
