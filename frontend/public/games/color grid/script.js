// ColorGrid - rotate full rows/columns puzzle
const boardContainer = document.getElementById('gridContainer');
const movesEl = document.getElementById('moves');
const bestEl = document.getElementById('best');
const shuffleBtn = document.getElementById('shuffleBtn');
const resetBtn = document.getElementById('resetBtn');
const sizeSelect = document.getElementById('sizeSelect');
const rowButtonsWrap = document.getElementById('rowButtons');
const colButtonsWrap = document.getElementById('colButtons');
const messageEl = document.getElementById('message');

let SIZE = parseInt(sizeSelect.value,10) || 4;
const COLORS = 6; // palette length (c-0..c-5)
let grid = [];       // current grid [r][c]
let solvedGrid = []; // solved reference
let moves = 0;
let bestKey = (size) => `colorgrid_best_${size}`;
let isAnimating = false;

// create a board element (grid)
function buildBoardElement(size){
  boardContainer.innerHTML = '';
  const board = document.createElement('div');
  board.className = 'board';
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.dataset.size = size;
  // create tiles
  for(let r=0;r<size;r++){
    for(let c=0;c<size;c++){
      const t = document.createElement('div');
      t.className = 'tile';
      t.dataset.r = r;
      t.dataset.c = c;
      t.addEventListener('click', () => tileClicked(r,c));
      board.appendChild(t);
    }
  }
  boardContainer.appendChild(board);
}

// initialize grid with solved pattern (row-major colors)
function makeSolvedGrid(size){
  const g = Array.from({length:size}, (_,r) =>
    Array.from({length:size}, (_,c) => (r*size + c) % COLORS)
  );
  return g;
}

// deep copy
function cloneGrid(g){
  return g.map(row => row.slice());
}

function setGrid(newGrid){
  grid = cloneGrid(newGrid);
  renderGrid();
}

function renderGrid(){
  const board = boardContainer.querySelector('.board');
  const size = grid.length;
  const tiles = board.querySelectorAll('.tile');
  tiles.forEach(tile => {
    const r = +tile.dataset.r;
    const c = +tile.dataset.c;
    const val = grid[r][c];
    tile.className = 'tile';
    tile.classList.add(`c-${val}`);
    tile.textContent = ''; // no text, color-only
  });
  movesEl.textContent = moves;
  const best = localStorage.getItem(bestKey(size));
  bestEl.textContent = best ? best : '—';
  messageEl.textContent = '';
}

// shuffle while ensuring solvable-ish (random rotations)
function shuffleGrid(times=80){
  // start from solved to ensure solvable
  setGrid(solvedGrid);
  for(let i=0;i<times;i++){
    const rOrC = Math.random() < 0.5 ? 'r' : 'c';
    const idx = Math.floor(Math.random() * SIZE);
    const dir = Math.random() < 0.5 ? 'left' : 'right';
    if(rOrC==='r'){
      rotateRowRaw(idx, dir==='left' ? -1 : 1);
    } else {
      rotateColRaw(idx, dir==='left' ? -1 : 1);
    }
  }
  // after shuffle reset moves
  moves = 0;
  renderGrid();
}

// raw rotate without animation - mutate grid
function rotateRowRaw(rowIdx, step=1){
  const n = SIZE;
  const newRow = Array(n);
  for(let c=0;c<n;c++){
    newRow[(c+step+n)%n] = grid[rowIdx][c];
  }
  grid[rowIdx] = newRow;
}

function rotateColRaw(colIdx, step=1){
  const n = SIZE;
  const newCol = Array(n);
  for(let r=0;r<n;r++){
    newCol[(r+step+n)%n] = grid[r][colIdx];
  }
  for(let r=0;r<n;r++) grid[r][colIdx] = newCol[r];
}

// rotate with animation (fade) then apply
function rotateRow(rowIdx, direction = 'right'){
  if(isAnimating) return;
  isAnimating = true;
  const board = boardContainer.querySelector('.board');
  const tiles = [...board.querySelectorAll(`.tile`)].filter(t => +t.dataset.r===rowIdx);
  tiles.forEach(t => t.classList.add('rotating'));
  // apply after short delay
  setTimeout(()=>{
    const step = (direction==='right') ? 1 : -1;
    rotateRowRaw(rowIdx, step);
    moves++;
    renderGrid();
    // brief celebration animation for the row
    const newTiles = [...board.querySelectorAll(`.tile`)].filter(t => +t.dataset.r===rowIdx);
    newTiles.forEach(t => {
      t.classList.add('selected');
      setTimeout(()=> t.classList.remove('selected'), 260);
    });
    checkWin();
    setTimeout(()=>{ isAnimating=false; }, 260);
  }, 180);
}

function rotateCol(colIdx, direction = 'down'){
  if(isAnimating) return;
  isAnimating = true;
  const board = boardContainer.querySelector('.board');
  const tiles = [...board.querySelectorAll(`.tile`)].filter(t => +t.dataset.c===colIdx);
  tiles.forEach(t => t.classList.add('rotating'));
  setTimeout(()=>{
    const step = (direction==='down') ? 1 : -1;
    rotateColRaw(colIdx, step);
    moves++;
    renderGrid();
    const newTiles = [...board.querySelectorAll(`.tile`)].filter(t => +t.dataset.c===colIdx);
    newTiles.forEach(t => {
      t.classList.add('selected');
      setTimeout(()=> t.classList.remove('selected'), 260);
    });
    checkWin();
    setTimeout(()=>{ isAnimating=false; }, 260);
  }, 180);
}

// handler when user clicks a tile - focus its row/col (highlight)
let focused = null;
function tileClicked(r,c){
  if(isAnimating) return;
  focused = {r,c};
  highlightFocused();
  // scroll rotate panel if needed — not required
}

function highlightFocused(){
  const board = boardContainer.querySelector('.board');
  board.querySelectorAll('.tile').forEach(t => t.classList.remove('selected'));
  if(!focused) return;
  const tiles = board.querySelectorAll('.tile');
  tiles.forEach(t => {
    const rr = +t.dataset.r;
    const cc = +t.dataset.c;
    if(rr===focused.r || cc===focused.c){
      t.classList.add('selected');
    }
  });
}

// check winning state
function isSolved(){
  const n = SIZE;
  for(let r=0;r<n;r++){
    for(let c=0;c<n;c++){
      if(grid[r][c] !== solvedGrid[r][c]) return false;
    }
  }
  return true;
}

function checkWin(){
  if(isSolved()){
    // update best if necessary
    const key = bestKey(SIZE);
    const prevBest = parseInt(localStorage.getItem(key) || '0',10) || 0;
    if(prevBest===0 || moves < prevBest){
      localStorage.setItem(key, moves);
      bestEl.textContent = moves;
    }
    showWin();
  }
}

// simple modal/overlay
function showWin(){
  const overlay = document.createElement('div');
  overlay.className = 'win-overlay';
  overlay.innerHTML = `
    <div class="win-card">
      <h2>🎉 You solved ColorGrid!</h2>
      <div>Moves: <strong>${moves}</strong></div>
      <div style="margin-top:8px">Grid: ${SIZE} × ${SIZE}</div>
      <button id="continueBtn">Play Again</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('continueBtn').addEventListener('click', ()=>{
    document.body.removeChild(overlay);
    shuffleGrid(60);
  });
}

// UI: build rotate buttons dynamically based on SIZE
function buildRotateControls(size){
  rowButtonsWrap.innerHTML = '';
  colButtonsWrap.innerHTML = '';
  for(let i=0;i<size;i++){
    const rb = document.createElement('div');
    rb.innerHTML = `<button class="btn-rotate" data-row="${i}" data-dir="left">Row ${i+1} ←</button>
                    <button class="btn-rotate" data-row="${i}" data-dir="right">Row ${i+1} →</button>`;
    rowButtonsWrap.appendChild(rb);
    const cb = document.createElement('div');
    cb.innerHTML = `<button class="btn-rotate" data-col="${i}" data-dir="up">Col ${i+1} ↑</button>
                    <button class="btn-rotate" data-col="${i}" data-dir="down">Col ${i+1} ↓</button>`;
    colButtonsWrap.appendChild(cb);
  }

  // wire row buttons
  rowButtonsWrap.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>{
      const row = parseInt(b.dataset.row,10);
      const dir = b.dataset.dir === 'left' ? 'left' : 'right';
      rotateRow(row, dir);
      focused = null;
      highlightFocused();
    });
  });
  colButtonsWrap.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click', ()=>{
      const col = parseInt(b.dataset.col,10);
      const dir = b.dataset.dir === 'up' ? 'up' : 'down';
      // map up=>up (step -1) and down=>down (step 1) handled in rotateCol
      rotateCol(col, dir === 'up' ? 'up' : 'down');
      focused = null;
      highlightFocused();
    });
  });
}

// setup and lifecycle
function setup(size){
  SIZE = size;
  buildBoardElement(size);
  solvedGrid = makeSolvedGrid(size);
  createGridFromSolved();
  moves = 0;
  buildRotateControls(size);
  renderGrid();
}

// create grid as copy of solved
function createGridFromSolved(){
  setGrid(solvedGrid);
}

// reset to solved (not shuffled)
resetBtn.addEventListener('click', ()=>{
  moves = 0;
  createGridFromSolved();
  renderGrid();
});

// shuffle
shuffleBtn.addEventListener('click', ()=>{
  shuffleGrid(80);
});

// size change
sizeSelect.addEventListener('change', (e)=>{
  const s = parseInt(e.target.value,10);
  setup(s);
});

// keyboard shortcuts: arrow keys rotate focused row/col
document.addEventListener('keydown', (e)=>{
  if(!focused || isAnimating) return;
  if(e.key === 'ArrowLeft') rotateRow(focused.r,'left');
  if(e.key === 'ArrowRight') rotateRow(focused.r,'right');
  if(e.key === 'ArrowUp') rotateCol(focused.c,'up');
  if(e.key === 'ArrowDown') rotateCol(focused.c,'down');
});

// initialize default
setup(SIZE);

// small helper: ensure initial shuffle so player has a puzzle
setTimeout(()=> shuffleGrid(60), 200);
