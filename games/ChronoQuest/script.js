// ChronoQuest core logic
const EVENTS = [
  { year: 1776, title: "American Declaration of Independence", desc: "Thirteen colonies declare independence." },
  { year: 1789, title: "French Revolution begins", desc: "Storming of the Bastille and revolution." },
  { year: 1865, title: "End of American Civil War", desc: "Surrender at Appomattox and abolition progress." },
  { year: 1914, title: "Start of World War I", desc: "Archduke Franz Ferdinand assassination." },
  { year: 1939, title: "Start of World War II", desc: "Invasion of Poland." },
  { year: 1969, title: "Apollo 11 Moon Landing", desc: "First humans walk on the moon." },
  { year: 1989, title: "Fall of the Berlin Wall", desc: "Symbolic end of Cold War divisions." },
  { year: 2001, title: "September 11 Attacks", desc: "Terrorist attacks in the United States." },
  { year: 2008, title: "Global Financial Crisis", desc: "Worldwide economic downturn." },
  { year: 1991, title: "Dissolution of the Soviet Union", desc: "Soviet republics declare independence." }
];

// DOM
const timelineEl = document.getElementById('timeline');
const startBtn = document.getElementById('startBtn');
const checkBtn = document.getElementById('checkBtn');
const hintBtn = document.getElementById('hintBtn');
const restartBtn = document.getElementById('restartBtn');
const levelSelect = document.getElementById('level');
const attemptsEl = document.getElementById('attempts');
const scoreEl = document.getElementById('score');
const messageEl = document.getElementById('message');
const template = document.getElementById('card-template');

let currentSet = [];
let attempts = 0;
let score = 0;
let draggedIdx = null;

// utilities
function pickEventsForLevel(level){
  // level 1:4, level2:6, level3:8 (random sample)
  const sizes = {1:4,2:6,3:8};
  const n = sizes[level] || 4;
  const clone = [...EVENTS];
  // shuffle and pick
  for(let i=clone.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [clone[i],clone[j]]=[clone[j],clone[i]];
  }
  return clone.slice(0,n);
}

function renderTimeline(events){
  timelineEl.innerHTML='';
  events.forEach((ev, idx)=>{
    const node = template.content.cloneNode(true);
    const li = node.querySelector('li');
    li.dataset.idx = idx;
    li.setAttribute('draggable','true');
    node.querySelector('.evt-title').textContent = ev.title;
    node.querySelector('.evt-desc').textContent = ev.desc;
    node.querySelector('.evt-year').textContent = "Year: " + ev.year;
    // drag handlers
    li.addEventListener('dragstart', onDragStart);
    li.addEventListener('dragover', onDragOver);
    li.addEventListener('drop', onDrop);
    li.addEventListener('dragend', onDragEnd);
    timelineEl.appendChild(node);
  });
}

function onDragStart(e){
  draggedIdx = Number(this.dataset.idx);
  e.dataTransfer.effectAllowed = 'move';
  this.classList.add('dragging');
}

function onDragOver(e){
  e.preventDefault();
  this.classList.add('drag-over');
}

function onDrop(e){
  e.preventDefault();
  const targetIdx = Number(this.dataset.idx);
  if(draggedIdx === null || draggedIdx === targetIdx) return;
  // swap in currentSet
  [currentSet[draggedIdx], currentSet[targetIdx]] = [currentSet[targetIdx], currentSet[draggedIdx]];
  // re-render
  renderTimeline(currentSet);
  resetDragClasses();
}

function onDragEnd(){
  draggedIdx = null;
  resetDragClasses();
}

function resetDragClasses(){
  timelineEl.querySelectorAll('.card').forEach(c => c.classList.remove('drag-over','dragging'));
}

// Game controls
function startGame(){
  const level = Number(levelSelect.value);
  currentSet = pickEventsForLevel(level);
  // shuffle to present to the player
  currentSet = currentSet.sort(()=>Math.random()-0.5);
  renderTimeline(currentSet);
  attempts = 0;
  updateStatus();
  checkBtn.disabled = false;
  hintBtn.disabled = false;
  messageEl.textContent = "Arrange the cards then click Check Order.";
  messageEl.className = "message";
}

function checkOrder(){
  attempts++;
  const correctOrder = [...currentSet].slice().sort((a,b)=>a.year-b.year);
  let correctCount = 0;
  for(let i=0;i<currentSet.length;i++){
    if(currentSet[i].year === correctOrder[i].year) correctCount++;
  }
  if(correctCount === currentSet.length){
    // win
    const points = Math.max(10, currentSet.length*20 - attempts*2);
    score += points;
    updateStatus();
    messageEl.textContent = 🎉 Perfect! You ordered all events correctly. +${points} points.;
    messageEl.className = "message good";
    checkBtn.disabled = true;
    hintBtn.disabled = true;
  } else {
    updateStatus();
    messageEl.textContent = ❌ ${correctCount}/${currentSet.length} correct. Try again!;
    messageEl.className = "message bad";
  }
}

function updateStatus(){
  attemptsEl.textContent = attempts;
  scoreEl.textContent = score;
}

// Hint: show correct order overlay briefly
function showHint(){
  const hintOverlay = document.createElement('div');
  hintOverlay.className = 'hint-overlay';
  const board = document.createElement('div');
  board.className = 'hint-board';
  const heading = document.createElement('h3');
  heading.textContent = 'Correct chronological order';
  board.appendChild(heading);
  const sorted = [...currentSet].slice().sort((a,b)=>a.year-b.year);
  const row = document.createElement('div');
  row.className = 'hint-row';
  sorted.forEach(ev=>{
    const chip = document.createElement('div');
    chip.className = 'hint-chip';
    chip.textContent = ${ev.year} — ${ev.title};
    row.appendChild(chip);
  });
  board.appendChild(row);
  hintOverlay.appendChild(board);
  document.body.appendChild(hintOverlay);
  // remove after 3s
  setTimeout(()=> hintOverlay.remove(), 3000);
}

// Restart resets the board / score? We'll reset board and keep score unless start pressed
function restart(){
  currentSet = [];
  timelineEl.innerHTML = '';
  messageEl.textContent = "Game reset. Choose level and Start.";
  messageEl.className = "message";
  attempts = 0;
  score = 0;
  updateStatus();
  checkBtn.disabled = true;
  hintBtn.disabled = true;
}

// wire UI
startBtn.addEventListener('click', startGame);
checkBtn.addEventListener('click', checkOrder);
hintBtn.addEventListener('click', showHint);
restartBtn.addEventListener('click', restart);

// accessibility: keyboard reorder (optional simple)
timelineEl.addEventListener('keydown', (e)=>{
  // noop - could be extended to support keyboard reordering later
});
