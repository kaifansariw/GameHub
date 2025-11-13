/* Jump Tag — Advanced playable version
   Runner = playerA uses W
   Chaser = playerB uses ArrowUp or Space
   Buttons: Start / Pause / Restart / Mute
   Obstacles spawn and move left. If chaser overlaps runner => chaser wins.
*/

(() => {
  // Canvas & context
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // Controls
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const restartBtn = document.getElementById('restartBtn');
  const muteBtn = document.getElementById('muteBtn');
  const openNew = document.getElementById('openNew');

  // HUD elements
  const timeEl = document.getElementById('time');
  const runnerStateEl = document.getElementById('runnerState');
  const chaserStateEl = document.getElementById('chaserState');
  const roundEl = document.getElementById('round');

  // Sounds (public links)
  const SOUND_JUMP = 'https://actions.google.com/sounds/v1/human_voices/bugle_tune.ogg';
  const SOUND_HIT  = 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg';
  const SOUND_BG   = 'https://actions.google.com/sounds/v1/ambiences/office_ambience.ogg';

  let audioJump = new Audio(SOUND_JUMP);
  let audioHit = new Audio(SOUND_HIT);
  let audioBg = new Audio(SOUND_BG);
  audioBg.loop = true;
  audioBg.volume = 0.12;

  let muted = false;

  // Game state
  let running = false;
  let paused = false;
  let lastTime = 0;
  let elapsed = 0;
  let round = 1;

  // world
  const WORLD = {
    gravity: 1800, // px/s^2
    groundY: canvas.height - 70,
    speedBase: 260
  };

  // players (rectangles with simple sprite)
  function makePlayer(x, color) {
    return {
      x,
      y: WORLD.groundY - 60,
      w: 48,
      h: 60,
      vy: 0,
      onGround: true,
      color,
      speed: 0,
      state: 'alive', // alive, fallen, caught
      glow: color
    };
  }

  const runner = makePlayer(180, '#ffb86b'); // controlled by W
  const chaser = makePlayer(360, '#7dd3fc'); // controlled by UP/Space

  // obstacles array
  let obstacles = [];

  // spawn settings
  let spawnTimer = 0;
  let spawnInterval = 1.1; // seconds

  // scoring & round time
  let roundTimer = 0;
  const ROUND_DURATION = 25 + 5 * 0; // runner must survive this to win

  // images: using online pics (small) as avatar visuals — they will be drawn scaled
  const runnerImg = new Image();
  const chaserImg = new Image();
  runnerImg.src = 'https://images.unsplash.com/photo-1541534401786-3f9c8d6d8cde?w=200&q=60';
  chaserImg.src = 'https://images.unsplash.com/photo-1503264116251-35a269479413?w=200&q=60';

  // helpers
  function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

  // input
  const keys = {};
  window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    // jump keys
    if (e.code === 'KeyW') attemptJump(runner);
    if (e.code === 'ArrowUp' || e.code === 'Space') attemptJump(chaser);
    // pause by P
    if (e.code === 'KeyP') togglePause();
  });
  window.addEventListener('keyup', (e) => { keys[e.code] = false; });

  function attemptJump(player) {
    if (!running || paused) return;
    if (player.onGround && player.state === 'alive') {
      player.vy = -720;
      player.onGround = false;
      if (!muted) audioJump.currentTime = 0, audioJump.play().catch(()=>{});
    }
  }

  // game control handlers
  startBtn.addEventListener('click', () => {
    // track play
    trackGamePlay('Jump Tag');
    startGame();
    // openNew link prepared
    openNew.href = window.location.href;
  });
  pauseBtn.addEventListener('click', togglePause);
  restartBtn.addEventListener('click', () => {
    resetRound();
    startGame();
  });
  muteBtn.addEventListener('click', () => {
    muted = !muted;
    if (muted) {
      audioBg.pause();
      muteBtn.textContent = '🔇';
    } else {
      audioBg.currentTime = 0;
      audioBg.play().catch(()=>{});
      muteBtn.textContent = '🔊';
    }
  });

  function togglePause() {
    if (!running) return;
    paused = !paused;
    pauseBtn.textContent = paused ? 'Resume' : 'Pause';
    if (paused) {
      audioBg.pause();
    } else {
      if (!muted) audioBg.play().catch(()=>{});
      lastTime = performance.now();
      requestAnimationFrame(loop);
    }
  }

  function startGame(){
    if (!running) {
      running = true;
      paused = false;
      pauseBtn.disabled = false;
      restartBtn.disabled = false;
      startBtn.disabled = true;
      if (!muted) audioBg.play().catch(()=>{});
      lastTime = performance.now();
      requestAnimationFrame(loop);
    } else {
      // already running — resume
      paused = false;
      if (!muted) audioBg.play().catch(()=>{});
      lastTime = performance.now();
      requestAnimationFrame(loop);
    }
  }

  function resetRound(){
    // reset state
    running = false;
    paused = false;
    lastTime = 0;
    elapsed = 0;
    roundTimer = 0;
    spawnTimer = 0;
    obstacles = [];
    runner.x = 180; runner.y = WORLD.groundY - runner.h; runner.vy = 0; runner.onGround = true; runner.state = 'alive';
    chaser.x = 360; chaser.y = WORLD.groundY - chaser.h; chaser.vy = 0; chaser.onGround = true; chaser.state = 'alive';
    round = 1;
    timeEl.textContent = '0.0';
    runnerStateEl.textContent = 'Alive';
    chaserStateEl.textContent = 'Chasing';
    roundEl.textContent = round;
    pauseBtn.disabled = true;
    restartBtn.disabled = true;
    startBtn.disabled = false;
    if (!muted) audioBg.pause();
  }

  // collisions
  function rectsOverlap(a,b){
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // obstacle prototype
  function spawnObstacle(){
    // random size
    const h = 28 + Math.round(Math.random()*42);
    const w = 28 + Math.round(Math.random()*40);
    const y = WORLD.groundY - h;
    const speed = WORLD.speedBase + Math.random()*120 + (elapsed*0.6);
    obstacles.push({
      x: canvas.width + 10,
      y,
      w,
      h,
      speed,
      color: '#ff7b72',
      slows: Math.random() < 0.45, // slows on hit
    });
  }

  // game loop
  function loop(ts){
    if (!running || paused) return;
    const dt = Math.min(0.035, (ts - lastTime) / 1000);
    lastTime = ts;
    elapsed += dt;
    roundTimer += dt;
    timeEl.textContent = elapsed.toFixed(1);

    // spawn obstacles
    spawnTimer += dt;
    if (spawnTimer >= spawnInterval){
      spawnTimer = 0;
      // variable interval
      spawnInterval = 0.8 + Math.random()*1.2 - Math.min(0.6, elapsed/60);
      spawnObstacle();
    }

    updatePlayer(runner, dt);
    updatePlayer(chaser, dt);

    // move obstacles left
    for (let i = obstacles.length-1; i >=0; i--){
      const ob = obstacles[i];
      ob.x -= ob.speed * dt;
      if (ob.x + ob.w < -20) obstacles.splice(i,1);
      // collision with players
      const pr = {x: runner.x, y: runner.y, w: runner.w, h: runner.h};
      const pc = {x: chaser.x, y: chaser.y, w: chaser.w, h: chaser.h};
      const po = {x: ob.x, y: ob.y, w: ob.w, h: ob.h};
      if (rectsOverlap(pr, po) && runner.state === 'alive'){
        // runner hit
        runner.state = 'fallen';
        runnerStateEl.textContent = 'Tripped';
        if (!muted) audioHit.currentTime = 0, audioHit.play().catch(()=>{});
        // slow runner
        runner.vy = 0;
        runner.onGround = true;
        // nudge runner back
        runner.x = Math.max(50, runner.x - 34);
      }
      if (rectsOverlap(pc, po) && chaser.state === 'alive'){
        chaser.state = 'slowed';
        chaserStateEl.textContent = 'Slowed';
        if (!muted) audioHit.currentTime = 0, audioHit.play().catch(()=>{});
        chaser.x = Math.min(canvas.width-120, chaser.x - 18);
      }
    }

    // chasing logic: chaser accelerates toward runner if alive
    if (runner.state === 'alive' && chaser.state !== 'caught'){
      // chaser tries to approach runner.x
      const dir = (runner.x - chaser.x) > 0 ? 1 : -1;
      // chaser moves right if behind, left if ahead moderately
      chaser.x += (100 + Math.min(220, elapsed*6)) * dt * Math.sign(runner.x - chaser.x);
      // clamp
      chaser.x = clamp(chaser.x, 80, canvas.width-120);
    }

    // check catch
    if (runner.state !== 'caught' && chaser.state !== 'caught'){
      // simple condition: if chaser overlaps runner horizontally within 20 px and vertical overlap
      if (Math.abs(chaser.x - runner.x) < 36 && Math.abs(chaser.y - runner.y) < 10){
        // caught
        runner.state = 'caught';
        chaser.state = 'victorious';
        runnerStateEl.textContent = 'Caught';
        chaserStateEl.textContent = 'Winner';
        // flash
        canvas.classList.add('flash-win');
        setTimeout(()=>canvas.classList.remove('flash-win'),900);
        if (!muted) audioHit.currentTime = 0, audioHit.play().catch(()=>{});
        // stop round after small pause
        setTimeout(()=>{ endRound('chaser'); }, 800);
      }
    }

    // runner surviving the round/time = runner wins
    if (roundTimer >= ROUND_DURATION){
      // runner wins by survival
      runner.state = 'survived';
      runnerStateEl.textContent = 'Survived';
      chaserStateEl.textContent = 'Failed';
      if (!muted) audioBg.pause();
      canvas.classList.add('flash-win');
      setTimeout(()=>canvas.classList.remove('flash-win'),900);
      setTimeout(()=>{ endRound('runner'); }, 700);
    }

    // draw
    drawAll();

    // continue
    if (running && !paused) requestAnimationFrame(loop);
  }

  function updatePlayer(p, dt){
    // gravity
    p.vy += WORLD.gravity * dt;
    p.y += p.vy * dt;
    // ground collision
    if (p.y >= WORLD.groundY - p.h){
      p.y = WORLD.groundY - p.h;
      p.vy = 0;
      p.onGround = true;
      if (p.state === 'fallen') {
        // after falling, recover after delay
        setTimeout(()=>{ if (p.state==='fallen') { p.state='alive'; runnerStateEl.textContent='Alive'; } }, 800);
      }
    } else {
      p.onGround = false;
    }
    // small running bounce for look
    // players slowly drift forward/back a bit for dynamic feel
    if (p === runner){
      // slight automatic forward movement to keep chase dynamic but not extreme
      if (p.x < 190) p.x += 18*dt;
      if (p.x > 260) p.x -= 8*dt;
    } else {
      // chaser hovers near runner
      // handled in main loop chase logic
    }
  }

  function endRound(winner){
    // stop game loop
    running = false;
    pauseBtn.disabled = true;
    restartBtn.disabled = false;
    startBtn.disabled = false;
    // increment round counter if runner won multiple times
    if (winner === 'runner') round += 1;
    roundEl.textContent = round;
    // small celebration or message
    if (!muted) audioBg.pause();
  }

  // draw function
  function drawAll(){
    // clear
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // sky gradient
    const g = ctx.createLinearGradient(0,0,0,canvas.height);
    g.addColorStop(0,'#081428');
    g.addColorStop(1,'#071927');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // ground
    ctx.fillStyle = '#061523';
    ctx.fillRect(0, WORLD.groundY, canvas.width, canvas.height - WORLD.groundY + 80);

    // decorative glowing orbs (parallax)
    drawGlow(80,60, 36, '#7c3aed', 0.05);
    drawGlow(canvas.width-120,40,26,'#06b6d4', 0.06);

    // draw obstacles
    obstacles.forEach(ob=>{
      // glow rectangle
      ctx.save();
      ctx.fillStyle = '#ff6b6b';
      ctx.shadowColor = 'rgba(255,107,107,0.25)';
      ctx.shadowBlur = 18;
      ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
      ctx.restore();
      // small highlight
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(ob.x+6, ob.y+6, Math.max(6, ob.w-12), Math.max(6, ob.h-12));
    });

    // draw players (image with glow)
    drawPlayerSprite(runner, runnerImg);
    drawPlayerSprite(chaser, chaserImg);

    // UI overlays: outlines
    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 2;
    ctx.strokeRect(2,2,canvas.width-4, canvas.height-4);
  }

  function drawGlow(x,y,r,color,alpha){
    ctx.save();
    ctx.beginPath();
    const radial = ctx.createRadialGradient(x,y,0,x,y,r);
    radial.addColorStop(0, color);
    radial.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radial;
    ctx.globalAlpha = alpha;
    ctx.fillRect(x-r, y-r, r*2, r*2);
    ctx.restore();
  }

  function drawPlayerSprite(p, img){
    // glow
    ctx.save();
    ctx.shadowColor = 'rgba(124,58,237,0.18)';
    ctx.shadowBlur = 24;
    // draw rectangle base to give silhouette
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x-2, p.y-2, p.w+4, p.h+4);

    // draw image inside box clipped
    if (img.complete && img.naturalWidth){
      // draw img scaled to box
      ctx.drawImage(img, p.x, p.y, p.w, p.h);
      // small overlay
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(p.x, p.y + p.h - 16, p.w, 16);
    } else {
      // fallback: emoji
      ctx.fillStyle = '#000';
      ctx.fillRect(p.x, p.y, p.w, p.h);
    }
    ctx.restore();
  }

  // simple play tracker (works with hub)
  function trackGamePlay(gameName){
    try {
      const raw = localStorage.getItem('gamePlays') || '{}';
      const data = JSON.parse(raw);
      if (!data[gameName]) data[gameName] = {plays:0, success:0};
      data[gameName].plays += 1;
      localStorage.setItem('gamePlays', JSON.stringify(data));
      // update pro badges if page hub script listens (it does)
    } catch(e){}
  }

  // initialize
  resetRound();

  // expose small debug on window
  window.JumpTag = { startGame, resetRound };
})();
