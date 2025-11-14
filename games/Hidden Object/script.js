/*
 Mystic Seekers - Hidden Object
 - Use an image at assets/scene.jpg inside the folder
 - Define target items and their hotspot areas relative to image (% coords)
 - Click on image to check hits
 - Hint reveals approximate area
 - Timer, found list, simple feedback
*/

const sceneImg = document.getElementById('sceneImg');
const hotspotLayer = document.getElementById('hotspotLayer');
const targetsListEl = document.getElementById('targets');
const timeEl = document.getElementById('time');
const foundCountEl = document.getElementById('foundCount');
const totalCountEl = document.getElementById('totalCount');
const startBtn = document.getElementById('startBtn');
const hintBtn = document.getElementById('hintBtn');
const restartBtn = document.getElementById('restartBtn');
const toast = document.getElementById('toast');
const endOverlay = document.getElementById('endOverlay');
const endTitle = document.getElementById('endTitle');
const endText = document.getElementById('endText');
const playAgain = document.getElementById('playAgain');

let timer = null;
let secondsLeft = 90;
let started = false;
let found = 0;

// Define target items and hotspot boxes as percentages relative to image (x%, y%, w%, h%)
const TARGETS = [
  { id: 'gold_key', name: 'Gold Key', box: {x: 72, y: 18, w: 8, h: 6}, found:false },
  { id: 'old_book', name: 'Old Book', box: {x: 22, y: 40, w: 10, h: 8}, found:false },
  { id: 'feather', name: 'Feather', box: {x: 48, y: 62, w: 6, h: 6}, found:false },
  { id: 'lantern', name: 'Lantern', box: {x: 12, y: 14, w: 9, h: 10}, found:false },
  { id: 'compass', name: 'Compass', box: {x: 58, y: 22, w: 6, h: 6}, found:false },
  { id: 'gem', name: 'Blue Gem', box: {x: 34, y: 10, w: 6, h: 6}, found:false }
];

// Populate UI targets
function renderTargets(){
  targetsListEl.innerHTML = '';
  TARGETS.forEach(t=>{
    const li = document.createElement('li');
    li.id = 'target-'+t.id;
    li.textContent = t.name;
    if(t.found) li.classList.add('found');
    targetsListEl.appendChild(li);
  });
  totalCountEl.textContent = TARGETS.length;
  foundCountEl.textContent = found;
}

// Convert click to % coordinates and check against boxes
function onSceneClick(e){
  if(!started) return;
  const rect = sceneImg.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  let hit = false;

  for(const t of TARGETS){
    if(t.found) continue;
    const b = t.box;
    if(x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h){
      // found!
      t.found = true;
      found++;
      showToast(`Found: ${t.name}`, 'good');
      renderTargets();
      drawFoundHighlight(b);
      if(found === TARGETS.length) winGame();
      hit = true;
      break;
    }
  }

  if(!hit){
    showToast('Not here — try again', 'bad');
  }
}

// Draw translucent rectangle on hotspot to show found area
function drawFoundHighlight(box){
  const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
  rect.setAttribute('x', box.x + '%');
  rect.setAttribute('y', box.y + '%');
  rect.setAttribute('width', box.w + '%');
  rect.setAttribute('height', box.h + '%');
  rect.setAttribute('fill', 'rgba(52,211,153,0.18)');
  rect.setAttribute('stroke', 'rgba(52,211,153,0.4)');
  rect.setAttribute('stroke-width', '0.6');
  hotspotLayer.appendChild(rect);
}

// Show temporary toast
function showToast(text, type=''){
  toast.textContent = text;
  toast.className = 'toast';
  if(type==='good') toast.style.borderColor = 'rgba(52,211,153,0.2)';
  else if(type==='bad') toast.style.borderColor = 'rgba(251,113,133,0.2)';
  setTimeout(()=> { toast.classList.add('hidden'); }, 1000);
  toast.classList.remove('hidden');
}

// Timer functions
function startTimer(){
  clearInterval(timer);
  secondsLeft = 90;
  timeEl.textContent = formatTime(secondsLeft);
  timer = setInterval(()=>{
    secondsLeft--;
    timeEl.textContent = formatTime(secondsLeft);
    if(secondsLeft <= 0){
      clearInterval(timer);
      loseGame();
    }
  },1000);
}

function formatTime(s){
  const mm = String(Math.floor(s/60)).padStart(2,'0');
  const ss = String(s%60).padStart(2,'0');
  return `${mm}:${ss}`;
}

// Hint: reveal a random unfound target's box briefly
function giveHint(){
  const pool = TARGETS.filter(t=>!t.found);
  if(pool.length === 0) return;
  const pick = pool[Math.floor(Math.random()*pool.length)];
  // draw highlight rect with flash
  const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
  rect.setAttribute('x', pick.box.x + '%');
  rect.setAttribute('y', pick.box.y + '%');
  rect.setAttribute('width', pick.box.w + '%');
  rect.setAttribute('height', pick.box.h + '%');
  rect.setAttribute('fill', 'rgba(249,115,22,0.14)');
  rect.setAttribute('stroke', 'rgba(249,115,22,0.35)');
  rect.setAttribute('stroke-width', '0.8');
  hotspotLayer.appendChild(rect);
  setTimeout(()=> rect.remove(), 1600);
}

// Win / Lose
function winGame(){
  clearInterval(timer);
  endTitle.textContent = "You Win! 🎉";
  endText.textContent = `Found all items with ${formatTime(secondsLeft)} remaining.`;
  endOverlay.classList.remove('hidden');
}
function loseGame(){
  endTitle.textContent = "Time's up!";
  endText.textContent = `You found ${found}/${TARGETS.length}. Try again.`;
  endOverlay.classList.remove('hidden');
}

// Start / Restart handlers
function startGame(){
  // reset state
  TARGETS.forEach(t=> t.found = false);
  found = 0;
  hotspotLayer.innerHTML = '';
  renderTargets();
  startTimer();
  started = true;
  startBtn.disabled = true;
  hintBtn.disabled = false;
  restartBtn.disabled = false;
  endOverlay.classList.add('hidden');
  showToast('Game started! Find the items.');
}

function restartGame(){
  started = false;
  clearInterval(timer);
  hotspotLayer.innerHTML = '';
  TARGETS.forEach(t=> t.found = false);
  found = 0;
  renderTargets();
  timeEl.textContent = formatTime(90);
  startBtn.disabled = false;
  hintBtn.disabled = true;
  restartBtn.disabled = true;
}

sceneImg.addEventListener('click', onSceneClick);
startBtn.addEventListener('click', startGame);
hintBtn.addEventListener('click', giveHint);
restartBtn.addEventListener('click', restartGame);
playAgain.addEventListener('click', ()=>{ restartGame(); startGame(); });

// initial render
renderTargets();
timeEl.textContent = formatTime(90);
