// Candy Match Mania - basic but complete match-3 with swaps, matches, cascade & refill
const COLS = 8;
const ROWS = 8;
const COLORS = 6; // number of candy types (c-0 ... c-5)
const STARTING_MOVES = 30;

const boardEl = document.getElementById('board');
const scoreEl = document.getElementById('score');
const movesEl = document.getElementById('moves');
const restartBtn = document.getElementById('restartBtn');

let grid = []; // 2D array [r][c] storing candy type or null
let score = 0;
let moves = STARTING_MOVES;
let selected = null;
let isProcessing = false;

function createEmptyGrid(){
  grid = Array.from({length: ROWS}, () => Array(COLS).fill(null));
}

function randCandy(){ return Math.floor(Math.random() * COLORS); }

function createTile(r,c){
  const tile = document.createElement('div');
  tile.classList.add('candy');
  tile.dataset.r = r;
  tile.dataset.c = c;
  tile.addEventListener('click', onTileClick);
  return tile;
}

function renderBoard(){
  boardEl.innerHTML = '';
  boardEl.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const tile = createTile(r,c);
      boardEl.appendChild(tile);
    }
  }
  updateTiles();
}

function updateTiles(){
  // update DOM tiles to reflect grid
  [...boardEl.children].forEach(tile => {
    const r = +tile.dataset.r;
    const c = +tile.dataset.c;
    const val = grid[r][c];
    tile.className = 'candy';
    if(val !== null && val !== undefined){
      tile.classList.add(`c-${val}`);
      tile.textContent = ICON_FOR(val);
      tile.style.opacity = '1';
    } else {
      tile.textContent = '';
      tile.style.opacity = '0';
    }
    tile.classList.toggle('selected', selected && selected.r===r && selected.c===c);
  });
}

function ICON_FOR(v){
  // small emoji to visually distinguish
  const icons = ['🍓','🍋','🍏','🫐','🍒','🍬'];
  return icons[v] || '🍭';
}

function fillInitialGrid(){
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      grid[r][c] = randCandy();
    }
  }
  // remove any initial matches
  while(true){
    const m = findAllMatches();
    if(m.length===0) break;
    // replace matched positions
    for(const pos of m){
      grid[pos.r][pos.c] = randCandy();
    }
  }
}

function onTileClick(e){
  if(isProcessing) return;
  const r = +e.currentTarget.dataset.r;
  const c = +e.currentTarget.dataset.c;
  if(!selected){
    selected = {r,c};
    updateTiles();
    return;
  }
  const first = selected;
  const second = {r,c};
  // if same tile unselect
  if(first.r===second.r && first.c===second.c){
    selected = null;
    updateTiles();
    return;
  }
  // check adjacency
  const dr = Math.abs(first.r - second.r);
  const dc = Math.abs(first.c - second.c);
  if((dr===1 && dc===0) || (dr===0 && dc===1)){
    // perform swap attempt
    swapTiles(first, second);
    isProcessing = true;
    setTimeout(()=> {
      const matches = findAllMatches();
      if(matches.length > 0){
        moves = Math.max(0, moves-1);
        movesEl.textContent = moves;
        handleMatchesThenCascade(matches);
      } else {
        // revert swap, no match
        swapTiles(first, second);
        isProcessing = false;
      }
      selected = null;
      updateTiles();
    }, 160);
  } else {
    // not adjacent -> change selection
    selected = {r,c};
    updateTiles();
  }
}

function swapTiles(a,b){
  const tmp = grid[a.r][a.c];
  grid[a.r][a.c] = grid[b.r][b.c];
  grid[b.r][b.c] = tmp;
  updateTiles();
}

function findAllMatches(){
  const matches = []; // array of positions {r,c}

  // horizontal
  for(let r=0;r<ROWS;r++){
    let runVal = null;
    let runStart = 0;
    for(let c=0;c<=COLS;c++){
      const val = (c<COLS) ? grid[r][c] : null;
      if(val !== runVal){
        const runLen = c - runStart;
        if(runVal !== null && runLen >= 3){
          for(let k=runStart;k<c;k++) matches.push({r, c:k});
        }
        runVal = val;
        runStart = c;
      }
    }
  }

  // vertical
  for(let c=0;c<COLS;c++){
    let runVal = null;
    let runStart = 0;
    for(let r=0;r<=ROWS;r++){
      const val = (r<ROWS) ? grid[r][c] : null;
      if(val !== runVal){
        const runLen = r - runStart;
        if(runVal !== null && runLen >= 3){
          for(let k=runStart;k<r;k++) matches.push({r, c:k});
        }
        runVal = val;
        runStart = r;
      }
    }
  }

  // deduplicate positions
  const key = (p)=> `${p.r},${p.c}`;
  const seen = new Set();
  const unique = [];
  for(const p of matches){
    const k = key(p);
    if(!seen.has(k)){ seen.add(k); unique.push(p); }
  }
  return unique;
}

function handleMatchesThenCascade(initialMatches){
  // animate & clear matches repeatedly until none
  const processOnce = (matches) => {
    if(matches.length===0){
      isProcessing = false;
      // check moves out
      if(moves===0) endGame();
      return;
    }
    // award score
    score += matches.length * 10;
    scoreEl.textContent = score;

    // animate pop on DOM
    for(const p of matches){
      const tile = tileAt(p.r,p.c);
      if(tile){
        tile.classList.add('pop');
      }
    }

    // after animation, clear them from grid
    setTimeout(()=>{
      // clear matched positions
      for(const p of matches) grid[p.r][p.c] = null;
      updateTiles();
      // cascade down
      collapseColumns();
      setTimeout(()=>{
        updateTiles();
        // find new matches (chain)
        const nextMatches = findAllMatches();
        processOnce(nextMatches);
      }, 200);
    }, 260);
  };

  processOnce(initialMatches);
}

function tileAt(r,c){
  return boardEl.querySelector(`.candy[data-r="${r}"][data-c="${c}"]`);
}

function collapseColumns(){
  // for each column, move non-null down, fill top with new candies
  for(let c=0;c<COLS;c++){
    const stack = [];
    for(let r=ROWS-1;r>=0;r--){
      if(grid[r][c] !== null && grid[r][c] !== undefined){
        stack.push(grid[r][c]);
        grid[r][c] = null;
      }
    }
    // place back from bottom
    let r = ROWS-1;
    for(const val of stack){
      grid[r][c] = val;
      r--;
    }
    // fill remaining top with new random candies
    while(r>=0){
      grid[r][c] = randCandy();
      r--;
    }
  }
}

function endGame(){
  isProcessing = true;
  // small modal via alert for simplicity
  setTimeout(()=> {
    alert(`Game over! Your score: ${score}`);
    isProcessing = false;
  }, 200);
}

function resetGame(){
  score = 0;
  moves = STARTING_MOVES;
  scoreEl.textContent = score;
  movesEl.textContent = moves;
  selected = null;
  isProcessing = false;
  createEmptyGrid();
  fillInitialGrid();
  renderBoard();
}

// initialization
createEmptyGrid();
fillInitialGrid();
renderBoard();

restartBtn.addEventListener('click', resetGame);

// small tweak: prevent accidental text selection on double click
document.addEventListener('selectstart', e => e.preventDefault());
