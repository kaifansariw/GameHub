const box = document.getElementById('box');
const input = document.getElementById('input');

const sessionStatus = document.getElementById('sessionStatus');

const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const accEl = document.getElementById('accuracy');

const progress = document.getElementById('progress-bar');

const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');

const customText = document.getElementById('customText');

const modeSelect = document.getElementById('mode');

const soundToggle = document.getElementById('soundToggle');
const highlightToggle = document.getElementById('highlightWords');

let text = '';
let started = false;
let elapsed = 0;
let intervalId = null;
let countdown = null;
let startTimestamp = 0;

function updateProgress(correctChars){
  const pct = Math.min(
    100,
    (correctChars / Math.max(text.length,1)) * 100
  );

  progress.style.width = pct + '%';
}

function renderText(){
  box.innerHTML = '';

  text.split('').forEach((char)=>{
    const span = document.createElement('span');
    span.innerText = char;
    box.appendChild(span);
  });
}

function resetMetrics(){
  elapsed = 0;

  timeEl.innerText = '0S';
  wpmEl.innerText = '—';
  accEl.innerText = '—';

  updateProgress(0);
}

function startTest(){

  const custom = customText.value.trim();

  if(!custom){
    sessionStatus.innerText =
      'Enter custom text first.';
    return;
  }

  text = custom;

  renderText();

  input.disabled = false;
  input.value = '';
  input.focus();

  resetMetrics();

  started = false;

  sessionStatus.innerText =
    'Typing now...';

  if(intervalId){
    clearInterval(intervalId);
  }

  const mode = modeSelect.value;

  if(mode === 'timed-30'){
    countdown = 30;
  }
  else if(mode === 'timed-60'){
    countdown = 60;
  }
  else{
    countdown = null;
  }
}

function finishTest(){

  clearInterval(intervalId);

  input.disabled = true;

  sessionStatus.innerText =
    'Run complete.';
}

function calculateStats(){

  const value = input.value;

  const chars = box.querySelectorAll('span');

  let correct = 0;

  chars.forEach((char,index)=>{

    const typed = value[index];

    char.classList.remove(
      'correct',
      'incorrect',
      'current'
    );

    if(typed == null){
      char.classList.add('current');
    }
    else if(typed === char.innerText){
      char.classList.add('correct');
      correct++;
    }
    else{
      char.classList.add('incorrect');
    }

  });

  const minutes =
    Math.max((Date.now() - startTimestamp)/1000,1)/60;

  const wpm =
    Math.round((correct/5)/minutes);

  const accuracy =
    value.length > 0
      ? ((correct/value.length)*100).toFixed(1)
      : 0;

  wpmEl.innerText = wpm;
  accEl.innerText = accuracy + '%';

  updateProgress(correct);

  if(value === text){
    finishTest();
  }
}

function tick(){

  if(countdown !== null){

    countdown--;

    timeEl.innerText = countdown + 'S';

    if(countdown <= 0){
      finishTest();
    }

  }else{

    elapsed++;

    timeEl.innerText = elapsed + 'S';
  }
}

input.addEventListener('input', ()=>{

  if(!started){

    started = true;

    startTimestamp = Date.now();

    intervalId = setInterval(tick,1000);
  }

  calculateStats();
});

startBtn.addEventListener('click', startTest);

restartBtn.addEventListener('click', ()=>{

  clearInterval(intervalId);

  input.value = '';

  resetMetrics();

  startTest();
});

input.disabled = true;