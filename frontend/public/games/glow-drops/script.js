/* Glow Drops - advanced canvas game
   Uses:
     - Unsplash hotlink for background
     - WebAudio synth for drop pop sound
     - Online sample for background music (streamed)
   Place in games/glow-drops/script.js
*/

(() => {
  // Config
  const config = {
    startTime: 60, // seconds
    spawnInterval: { easy: 900, normal: 700, hard: 500 }, // ms base
    dropLife: { easy: 2500, normal: 2000, hard: 1500 }, // ms
    obstacleChance: { easy: 0.08, normal: 0.12, hard: 0.18 },
    maxDrops: { easy: 6, normal: 9, hard: 12 },
    comboWindow: 750 // ms between pops for combo
  };

  // DOM
  const canvas = document.getElementById('gameCanvas');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const restartBtn = document.getElementById('restartBtn');
  const soundToggle = document.getElementById('soundToggle');
  const volumeControl = document.getElementById('volume');
  const difficultySelect = document.getElementById('difficulty');
  const overlay = document.getElementById('overlay');

  const scoreEl = document.getElementById('score');
  const livesEl = document.getElementById('lives');
  const timeEl = document.getElementById('time');
  const comboEl = document.getElementById('combo');

  // Canvas setup
  const ctx = canvas.getContext('2d', { alpha: true });
  let dpr = Math.max(1, window.devicePixelRatio || 1);

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Audio setup (WebAudio synth for pop to avoid external files)
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = AudioContext ? new AudioContext() : null;
  let bgAudio = null;
  const bgMusicUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // online sample

  function playBgMusic() {
    if (!audioCtx) return;
    if (bgAudio) { bgAudio.play().catch(()=>{}); return; }
    bgAudio = new Audio(bgMusicUrl);
    bgAudio.loop = true;
    bgAudio.crossOrigin = 'anonymous';
    bgAudio.volume = Number(volumeControl.value || 0.6);
    bgAudio.play().catch(()=>{ /* autoplay/suspend issues ignored */});
  }
  function pauseBgMusic() { if (bgAudio) bgAudio.pause(); }

  function playPopSound(volume = 0.6) {
    if (!audioCtx || !soundToggle.checked) return;
    const now = audioCtx.currentTime;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(900 + Math.random() * 300, now);
    g.gain.setValueAtTime(volume, now);
    o.connect(g);
    g.connect(audioCtx.destination);
    o.start(now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    o.stop(now + 0.15);
  }

  // Game state
  let state = {
    running: false,
    score: 0,
    lives: 3,
    timeLeft: config.startTime,
    drops: [],
    lastSpawn: 0,
    lastPopTime: 0,
    combo: 1,
    spawnTimer: null,
    gameLoopId: null
  };

  // Utils
  function rand(min, max) { return Math.random() * (max - min) + min; }
  function now(){ return performance.now(); }

  // Entities: drops and obstacles
  function createDrop(isObstacle=false) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const radius = rand(18, 46);
    return {
      id: Math.random().toString(36).slice(2,9),
      x: rand(radius, w - radius),
      y: rand(radius, h - radius),
      r: radius,
      created: now(),
      life: getDropLife(),
      isObstacle,
      popped: false,
      glow: rand(0.6, 1.2),
      hue: isObstacle ? 220 : rand(150, 300) // obstacles are bluish-gray
    };
  }

  function getDifficulty() { return difficultySelect.value || 'normal'; }
  function getSpawnInterval() { return config.spawnInterval[getDifficulty()]; }
  function getDropLife() { return config.dropLife[getDifficulty()]; }
  function getObstacleChance() { return config.obstacleChance[getDifficulty()]; }
  function getMaxDrops() { return config.maxDrops[getDifficulty()]; }

  // Spawn logic
  function spawnLogic() {
    const t = now();
    const shouldSpawn = (t - state.lastSpawn) > getSpawnInterval();
    if (!shouldSpawn) return;
    state.lastSpawn = t;
    // spawn up to max
    if (state.drops.length < getMaxDrops()) {
      const isObs = Math.random() < getObstacleChance();
      state.drops.push(createDrop(isObs));
    }
  }

  // Rendering helpers
  function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // subtle vignette
    const g = ctx.createLinearGradient(0,0,0,canvas.height);
    g.addColorStop(0, 'rgba(255,255,255,0.02)');
    g.addColorStop(1, 'rgba(0,0,0,0.08)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,canvas.width/dpr, canvas.height/dpr);
  }

  function drawDrop(drop) {
    const t = now();
    const age = t - drop.created;
    const lifeRatio = 1 - Math.min(1, age / drop.life);
    const x = drop.x, y = drop.y, r = drop.r;

    // glow radial
    const grd = ctx.createRadialGradient(x, y, r*0.1, x, y, r*3);
    const hue = drop.hue;
    // brighter center
    grd.addColorStop(0, `hsla(${hue},85%,60%,${0.95 * drop.glow})`);
    grd.addColorStop(0.25, `hsla(${hue},85%,55%,${0.55 * drop.glow})`);
    grd.addColorStop(0.6, `hsla(${hue},65%,45%,${0.22 * lifeRatio})`);
    grd.addColorStop(1, `rgba(4,6,10,0)`);
    ctx.beginPath();
    ctx.fillStyle = grd;
    ctx.arc(x, y, r*1.1, 0, Math.PI*2);
    ctx.fill();

    // inner glossy disk
    ctx.beginPath();
    ctx.arc(x - r*0.25, y - r*0.25, r*0.6, 0, Math.PI*2);
    ctx.fillStyle = drop.isObstacle ? 'rgba(10,14,26,0.6)' : 'rgba(255,255,255,0.18)';
    ctx.fill();

    // stroke
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.lineWidth = Math.max(1, Math.min(3, r*0.06));
    ctx.strokeStyle = drop.isObstacle ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.06)';
    ctx.stroke();

    // quick life ring for timing
    ctx.beginPath();
    ctx.arc(x,y,r + 10, -Math.PI/2, -Math.PI/2 + (Math.PI*2)*(age / drop.life));
    ctx.lineWidth = 2;
    ctx.strokeStyle = drop.isObstacle ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.06)';
    ctx.stroke();
  }

  function drawRipples() {
    state.ripples.forEach(r => {
      const elapsed = now() - r.t;
      const p = elapsed / r.ttl;
      const radius = p * r.maxR;
      ctx.beginPath();
      ctx.arc(r.x, r.y, radius, 0, Math.PI*2);
      ctx.lineWidth = Math.max(1, (1-p)*6);
      ctx.strokeStyle = `hsla(${r.hue},80%,60%,${0.25*(1-p)})`;
      ctx.stroke();
    });
  }

  // Pop handling (create ripple + audio + score)
  function popDrop(drop) {
    if (drop.popped) return;
    drop.popped = true;
    const t = now();
    // compute combo
    if (t - state.lastPopTime < config.comboWindow) {
      state.combo = Math.min(5, state.combo + 1);
    } else {
      state.combo = 1;
    }
    state.lastPopTime = t;

    // sound
    playPopSound(0.5 * Number(volumeControl.value || 0.6));

    // scoring
    if (drop.isObstacle) {
      // penalty
      state.score = Math.max(0, state.score - Math.round(25 * state.combo));
      state.lives = Math.max(0, state.lives - 1);
      showPulse('-1 life', '#ff6b6b', drop.x, drop.y);
    } else {
      const base = Math.round(10 + (drop.r / 6));
      const gained = base * state.combo;
      state.score += gained;
      showPulse('+' + gained, '#7ee787', drop.x, drop.y);
    }

    // create ripple effect (temporary)
    const ripple = {
      x: drop.x, y: drop.y, t: now(), ttl: 600, maxR: drop.r*3, hue: drop.hue
    };
    state.ripples.push(ripple);

    // remove drop with fade
    setTimeout(() => {
      state.drops = state.drops.filter(d => d !== drop);
    }, 80);
  }

  // Visual feedback text
  function showPulse(text, color, x, y) {
    state.pulses.push({ text, color, x, y, t: now() });
  }

  // Game loop
  function step() {
    const t = now();

    // spawn
    spawnLogic();

    // update time
    if (state.lastTick) {
      const dt = (t - state.lastTick) / 1000;
      if (state.running) {
        state.timeLeft = Math.max(0, state.timeLeft - dt);
      }
    }
    state.lastTick = t;

    // expire drops
    state.drops = state.drops.filter(d => {
      if (d.popped) return false;
      const age = t - d.created;
      if (age > d.life) {
        // unpopped drop expired -> penalty slightly
        state.lives = Math.max(0, state.lives - 0.25 | 0);
        showPulse('-1', '#ff8a8a', d.x, d.y);
        return false;
      }
      return true;
    });

    // ripples cleanup
    state.ripples = state.ripples.filter(r => (t - r.t) < r.ttl);
    state.pulses = state.pulses.filter(p => (t - p.t) < 900);

    // draw
    render();

    // HUD
    scoreEl.textContent = Math.round(state.score);
    livesEl.textContent = Math.max(0, Math.floor(state.lives));
    timeEl.textContent = Math.ceil(state.timeLeft);
    comboEl.textContent = `x${state.combo}`;

    // Check game over conditions
    if (state.timeLeft <= 0 || state.lives <= 0) {
      endGame();
      return;
    }

    // loop
    if (state.running) {
      state.gameLoopId = requestAnimationFrame(step);
    }
  }

  function render() {
    clear();
    // scale for drawing shapes consistent with CSS pixels
    // draw drops
    state.drops.forEach(drawDrop);
    
    drawRipples();

    // pulses
    state.pulses.forEach((p, idx) => {
      const age = now() - p.t;
      const alpha = 1 - (age / 900);
      ctx.font = '600 18px Inter, system-ui, Arial';
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.fillText(p.text, p.x + 8, p.y - 12 - (idx*12));
      ctx.globalAlpha = 1;
    });
  }

  // Input handling (mouse/touch)
  function getCanvasPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function handleClick(e) {
    if (!state.running) return;
    const pos = getCanvasPos(e);
    // find topmost drop under cursor (reverse order)
    for (let i = state.drops.length -1; i >= 0; i--) {
      const d = state.drops[i];
      const dx = pos.x - d.x;
      const dy = pos.y - d.y;
      if ((dx*dx + dy*dy) <= (d.r * d.r)) {
        popDrop(d);
        return;
      }
    }
    // clicked empty space: small penalty
    state.score = Math.max(0, state.score - 1);
    showPulse('-1', '#ff9b9b', pos.x, pos.y);
  }

  canvas.addEventListener('mousedown', handleClick);
  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); handleClick(e); }, {passive:false});

  // Game control functions
  function startGame() {
    // reset or resume from paused state
    if (!audioCtx) {
      // nothing
    } else if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(()=>{});
    }
    if (soundToggle.checked) playBgMusic();
    state.running = true;
    playPauseBtn.textContent = 'Pause';
    // if new game
    if (!state.started || state.ended) {
      state.started = true;
      state.ended = false;
      state.score = 0;
      state.lives = 3;
      state.timeLeft = config.startTime;
      state.drops = [];
      state.ripples = [];
      state.pulses = [];
      state.combo = 1;
      state.lastPopTime = 0;
      state.lastSpawn = 0;
    }
    cancelAnimationFrame(state.gameLoopId);
    state.gameLoopId = requestAnimationFrame(step);
  }

  function pauseGame() {
    state.running = false;
    playPauseBtn.textContent = 'Play';
    pauseBgMusic();
    cancelAnimationFrame(state.gameLoopId);
  }

  function restartGame() {
    pauseGame();
    state.started = false;
    state.ended = false;
    startGame();
  }

  function endGame() {
    state.running = false;
    state.ended = true;
    pauseBgMusic();
    cancelAnimationFrame(state.gameLoopId);
    overlay.innerHTML = `<div class="card">
      <h2>Game Over</h2>
      <p>Score: <strong>${Math.round(state.score)}</strong></p>
      <p>Thanks for playing — click Restart to try again.</p>
    </div>`;
    overlay.classList.remove('hidden');

    // Track play for hub pro-badges (if present)
    try {
      const playData = JSON.parse(localStorage.getItem('gamePlays') || '{}');
      const name = 'Glow Drops';
      if (!playData[name]) playData[name] = { plays: 0, success: 0 };
      playData[name].plays += 1;
      // success if score > 0
      if (state.score > 0) playData[name].success += 1;
      localStorage.setItem('gamePlays', JSON.stringify(playData));
    } catch{ /* ignore */ }
  }

  // Hook up controls
  playPauseBtn.addEventListener('click', () => {
    if (!state.running) { overlay.classList.add('hidden'); startGame(); }
    else pauseGame();
  });
  restartBtn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    restartGame();
  });

  soundToggle.addEventListener('change', () => {
    if (!soundToggle.checked) pauseBgMusic();
    else if (state.running) playBgMusic();
  });

  volumeControl.addEventListener('input', () => {
    if (bgAudio) bgAudio.volume = Number(volumeControl.value);
  });

  difficultySelect.addEventListener('change', () => {
    // small reset in- game: prune extra drops if max lowered
    state.drops = state.drops.slice(0, getMaxDrops());
  });

  // Dismiss overlay when clicking it
  overlay.addEventListener('click', () => {
    overlay.classList.add('hidden');
  });

  // Initialize state arrays
  state.ripples = [];
  state.pulses = [];

  // Start paused with overlay instructions
  overlay.innerHTML = `<div class="card">
    <h2>Glow Drops</h2>
    <p>Click Play to start. Click glowing drops to score points. Avoid obstacles!</p>
    <p style="margin-top:10px;font-size:13px;color:rgba(255,255,255,0.7)">Tip: Try Normal difficulty first.</p>
  </div>`;
  overlay.classList.remove('hidden');

  // initial render to show background
  render();

  // ensure audio context can start on first user gesture
  document.addEventListener('pointerdown', () => {
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(()=>{});
  }, { once: true });

  // accessibility: keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); if (state.running) pauseGame(); else startGame(); }
    if (e.key === 'r') { restartGame(); }
  });

  // adapt canvas for initial CSS size
  window.setTimeout(resizeCanvas, 50);
})();
