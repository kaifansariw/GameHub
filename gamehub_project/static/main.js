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
  },

  {
    id: "mario-forever",
    title: "Mario Forever",
    description: "Run, jump, and collect coins in this fun platform adventure",
    image: "/static/assets/Mario.png",   // Make sure the image exists in this path
    file: "/static/games/Mario-Forever/index.html",   // Path to your HTML game file
    category: "arcade"
}
];

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================

function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("i");
  let savedTheme = localStorage.getItem("theme");

  if (!savedTheme) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    savedTheme = prefersDark ? "dark" : "light";
  }

  document.body.setAttribute("data-theme", savedTheme);
  if (themeIcon) {
    themeIcon.className = savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
  }
  console.log(`🎨 Theme initialized: ${savedTheme}`);
}

function toggleTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("i");
  const currentTheme = document.body.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  if (themeIcon) {
    themeIcon.style.transform = "rotate(360deg)";
    setTimeout(() => {
      themeIcon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
      themeIcon.style.transform = "rotate(0deg)";
    }, 150);
  }

  if (themeToggle) {
    themeToggle.style.transform = "scale(0.8)";
    setTimeout(() => {
      themeToggle.style.transform = "scale(1)";
    }, 150);
  }

  showThemeNotification(newTheme);
  console.log(`🎨 Theme changed to: ${newTheme}`);
}

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
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateY(0)";
  }, 10);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(20px)";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    themeToggle.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTheme();
      }
    });
    themeToggle.setAttribute("tabindex", "0");
    themeToggle.setAttribute("role", "button");
    themeToggle.setAttribute("aria-label", "Toggle dark mode");
  }
}

function setupSystemThemeListener() {
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkModeMediaQuery.addEventListener("change", (e) => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      const newTheme = e.matches ? "dark" : "light";
      document.body.setAttribute("data-theme", newTheme);
      const themeIcon = document.querySelector("#themeToggle i");
      if (themeIcon) {
        themeIcon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
      }
    }
  });
}

// ============================================
// GAME RENDERING AND FILTERS
// ============================================

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

    const ratingContainer = gameCard.querySelector(`#rating-${game.id}`);
    if (ratingContainer) {
      const starRating = createStarRating(game.id, "small");
      ratingContainer.appendChild(starRating);
    }
  });

  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

function getAllCategories() {
  const categories = [...new Set(games.map(game => game.category))];
  return categories.sort();
}

function filterGamesByCategory(category) {
  if (category === "all") {
    renderGamesWithRatings(games);
    return;
  }

  const filteredGames = games.filter(game => game.category === category);
  renderGamesWithRatings(filteredGames);
}

function createCategoryFilters() {
  const categories = getAllCategories();
  const categoryContainer = document.getElementById("categoryFilters");
  if (!categoryContainer) return;

  categoryContainer.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.className = "category-btn active";
  allButton.textContent = "All Games";
  allButton.onclick = () => {
    filterGamesByCategory("all");
    document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
    allButton.classList.add("active");
  };
  categoryContainer.appendChild(allButton);

  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "category-btn";
    button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    button.onclick = () => {
      filterGamesByCategory(category);
      document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    };
    categoryContainer.appendChild(button);
  });
}

// ============================================
// SEARCH AND SUGGESTIONS
// ============================================

function setupImprovedSearch() {
  const searchInput = document.getElementById("searchInput");
  const gamesGrid = document.getElementById("gamesGrid");
  const noResults = document.getElementById("noResults");

  if (!searchInput || !gamesGrid) return;

  const suggestionsContainer = document.createElement("div");
  suggestionsContainer.id = "searchSuggestions";
  suggestionsContainer.className = "search-suggestions";
  searchInput.parentNode.insertBefore(suggestionsContainer, searchInput.nextSibling);

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    suggestionsContainer.innerHTML = "";

    if (searchTerm.length > 0) {
      const suggestions = games.filter(
        (game) =>
          game.title.toLowerCase().includes(searchTerm) ||
          game.description.toLowerCase().includes(searchTerm) ||
          game.category.toLowerCase().includes(searchTerm)
      ).slice(0, 5);

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
            filterGamesBySearch(suggestion.title.toLowerCase());
          };
          suggestionsContainer.appendChild(suggestionItem);
        });
        suggestionsContainer.style.display = "block";
      }

      filterGamesBySearch(searchTerm);
    } else {
      suggestionsContainer.style.display = "none";
      renderGamesWithRatings(games);
      if (noResults) noResults.classList.add('hidden');
      gamesGrid.classList.remove('hidden');
    }
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
      suggestionsContainer.style.display = "none";
    }
  });
}

function filterGamesBySearch(searchTerm) {
  const gamesGrid = document.getElementById("gamesGrid");
  const noResults = document.getElementById("noResults");

  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(searchTerm) ||
      game.description.toLowerCase().includes(searchTerm) ||
      game.category.toLowerCase().includes(searchTerm)
  );

  renderGamesWithRatings(filteredGames);

  if (filteredGames.length === 0 && searchTerm !== "") {
    if (noResults) noResults.classList.remove('hidden');
    gamesGrid.classList.add('hidden');
  } else {
    if (noResults) noResults.classList.add('hidden');
    gamesGrid.classList.remove('hidden');
  }
}

// ============================================
// RATING SYSTEM
// ============================================

function initializeGameRatings() {
  if (!localStorage.getItem("gameRatings")) {
    const initialRatings = {};
    games.forEach(game => {
      initialRatings[game.id] = { average: 0, totalRatings: 0, userRating: null };
    });
    localStorage.setItem("gameRatings", JSON.stringify(initialRatings));
  }
}

function rateGame(gameId, rating) {
  const ratings = JSON.parse(localStorage.getItem("gameRatings") || "{}");
  const gameRating = ratings[gameId] || { average: 0, totalRatings: 0, userRating: null };
  const oldUserRating = gameRating.userRating || 0;
  gameRating.userRating = rating;

  const totalRatings = gameRating.totalRatings;
  const currentAverage = gameRating.average;
  const totalStars = (currentAverage * totalRatings) - oldUserRating;

  if (oldUserRating === 0) gameRating.totalRatings = totalRatings + 1;
  gameRating.average = (totalStars + rating) / gameRating.totalRatings;

  ratings[gameId] = gameRating;
  localStorage.setItem("gameRatings", JSON.stringify(ratings));
}

function getGameRating(gameId) {
  const ratings = JSON.parse(localStorage.getItem("gameRatings") || "{}");
  return ratings[gameId] || { average: 0, totalRatings: 0, userRating: null };
}

function createStarRating(gameId, size = "small") {
  const rating = getGameRating(gameId);
  const container = document.createElement("div");
  container.className = `star-rating ${size}`;

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.innerHTML = "★";
    if (i <= Math.floor(rating.average)) star.classList.add("filled");
    else if (i === Math.ceil(rating.average) && rating.average % 1 !== 0) star.classList.add("half");

    star.addEventListener("click", () => {
      rateGame(gameId, i);
      const parent = container.parentNode;
      const newRating = createStarRating(gameId, size);
      parent.replaceChild(newRating, container);
    });
    container.appendChild(star);
  }

  const count = document.createElement("span");
  count.className = "rating-count";
  count.textContent = `(${rating.totalRatings})`;
  container.appendChild(count);
  return container;
}

// ============================================
// ANALYTICS AND UTILS
// ============================================

function initializeGameStats() {
  if (!localStorage.getItem("gameStats")) {
    const initialStats = {};
    games.forEach(game => {
      initialStats[game.id] = { plays: 0, lastPlayed: null, totalTime: 0 };
    });
    localStorage.setItem("gameStats", JSON.stringify(initialStats));
  }
}

function trackGamePlay(gameId) {
  const stats = JSON.parse(localStorage.getItem("gameStats") || "{}");
  const gameStat = stats[gameId] || { plays: 0, lastPlayed: null, totalTime: 0 };
  gameStat.plays += 1;
  gameStat.lastPlayed = new Date().toISOString();
  stats[gameId] = gameStat;
  localStorage.setItem("gameStats", JSON.stringify(stats));
}

function getTopPlayedGames(limit = 5) {
  const stats = JSON.parse(localStorage.getItem("gameStats") || "{}");
  return Object.entries(stats)
    .sort((a, b) => b[1].plays - a[1].plays)
    .slice(0, limit)
    .map(([gameId, stat]) => {
      const game = games.find(g => g.id === gameId);
      return game ? { ...game, ...stat } : null;
    })
    .filter(Boolean);
}

function createParticles() {
  const particleContainer = document.createElement("div");
  particleContainer.className = "fixed inset-0 pointer-events-none z-0";
  document.body.appendChild(particleContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 floating";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particleContainer.appendChild(particle);
  }
}

function getCSRFToken() {
  return document.cookie
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith("csrftoken="))
    ?.split("=")[1] || "";
}

function playGame(gameFile) {
  if (window !== window.parent) return;
  const game = games.find(g => g.file === gameFile);
  if (game) {
    let recent = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");
    recent = recent.filter(g => g.id !== game.id);
    recent.unshift(game);
    recent = recent.slice(0, 5);
    localStorage.setItem("recentlyPlayed", JSON.stringify(recent));
    trackGamePlay(game.id);
  }
  window.location.href = gameFile;
}

function setupGameCardAccessibility() {
  document.querySelectorAll(".game-card").forEach(card => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.querySelector(".game-play-btn")?.click();
      }
    });
  });
}

function addFocusStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .game-card:focus, .category-btn:focus, .search-input:focus {
      outline: 2px solid var(--neon-purple);
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }

  initializeTheme();
  setupThemeToggle();
  setupSystemThemeListener();

  initializeGameStats();
  initializeGameRatings();

  renderGamesWithRatings();
  setupImprovedSearch();
  createCategoryFilters();
  createParticles();
  setupGameCardAccessibility();
  addFocusStyles();

  const footerYear = document.getElementById('footeryear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  console.log("✅ GameHub initialized successfully!");
  console.log(`📊 Total games loaded: ${games.length}`);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

window.addEventListener("offline", () => {
  const banner = document.getElementById("network-status");
  if (banner) {
    banner.querySelector("#network-text").textContent = "You are offline";
    banner.classList.remove("hidden");
    banner.classList.add("offline");
  }
});

window.addEventListener("online", () => {
  const banner = document.getElementById("network-status");
  if (banner) {
    banner.querySelector("#network-text").textContent = "You are back online";
    banner.classList.remove("hidden", "offline");
    banner.classList.add("online");
    setTimeout(() => banner.classList.add("hidden"), 3000);
  }
});
