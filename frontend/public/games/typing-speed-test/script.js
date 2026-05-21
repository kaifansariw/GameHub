// ELEMENTS
const box = document.getElementById('box');
const input = document.getElementById('input');
const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const accEl = document.getElementById('accuracy');
const progress = document.getElementById('progress-bar');
const startBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const customText = document.getElementById('customText');
const modeSelect = document.getElementById('mode');
const darkToggle = document.getElementById('darkToggle');
const soundToggle = document.getElementById('soundToggle');
const highlightToggle = document.getElementById('highlightWords');

let wordsDefault = ["future","yellow","coding","planet","magic","orange","design","system","javascript","typing",
  "creative","engineer","internet","learning","challenge","practice","keyboard","speed","accuracy","dynamic"];

// STATE
let text = '';
let wordList = [];
let currentWordIndex = 0;
let started = false;
let elapsed = 0;
let intervalId = null;
let countdown = null; // seconds remaining for timed mode
let audioCtx = null;
let soundsOn = true;

// UTIL: basic beep using WebAudio
function beep(freq=440, duration=0.06, type='sine', vol=0.02){
  if(!soundsOn) return;
  try {
    if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g); g.connect(audioCtx.destination);
    o.start();
    setTimeout(()=>{ o.stop(); }, duration*1000);
  } catch { /* ignore */ }
}

// Dark mode from localStorage
function applySavedTheme(){
  const saved = localStorage.getItem('ts_dark');
  if(saved === '1') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
}
applySavedTheme();

darkToggle.addEventListener('click', ()=>{
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('ts_dark', isDark ? '1' : '0');
});

// Sound toggle
soundToggle.addEventListener('change', (e)=>{ soundsOn = e.target.checked; });

// Build text content (custom or random)
function buildText(){
  const custom = (customText.value || '').trim();
  if(custom.length>0){
    text = custom.replace(/\s+/g,' ').trim();
  } else {
    // build random words sentence of ~25 words
    const count = 20 + Math.floor(Math.random()*8);
    let arr=[];
    for(let i=0;i<count;i++) arr.push(wordsDefault[Math.floor(Math.random()*wordsDefault.length)]);
    text = arr.join(' ');
  }
  wordList = text.split(' ');
  renderWords();
}

// Render words into box with spans
function renderWords(){
  box.innerHTML = '';
  wordList.forEach((w, i)=>{
    const span = document.createElement('span');
    span.className = 'word';
    span.dataset.idx = i;
    span.textContent = w + (i < wordList.length-1 ? ' ' : '');
    box.appendChild(span);
  });
  currentWordIndex = 0;
  markCurrentWord();
}

// Mark current word
function markCurrentWord(){
  const spans = box.querySelectorAll('.word');
  spans.forEach(s => s.classList.remove('current','correct','incorrect'));
  if(!highlightToggle.checked) return;
  const cur = spans[currentWordIndex];
  if(cur) cur.classList.add('current');
}

// Start/Restart logic
function resetState(){
  if(intervalId) clearInterval(intervalId);
  intervalId = null;
  started = false;
  elapsed = 0;
  countdown = null;
  input.value = '';
  timeEl.textContent = 'Time: 0s';
  wpmEl.textContent = 'WPM: —';
  accEl.textContent = 'Accuracy: —';
  progress.style.width = '0%';
}

function startTest(){
  resetState();
  buildText();
  input.disabled = false;
  input.focus();
  // prepare timer mode
  const mode = modeSelect.value;
  if(mode.startsWith('timed')){
    const sec = mode === 'timed-30' ? 30 : 60;
    countdown = sec;
    timeEl.textContent = `Time: ${countdown}s`;
  }
}

// Progress helpers
function updateProgress(correctChars){
  const pct = Math.min(100, (correctChars / Math.max(1, text.length)) * 100);
  progress.style.width = pct + '%';
}

// Timer tick
function tick(){
  const mode = modeSelect.value;
  if(mode.startsWith('timed')){
    if(countdown > 0){
      countdown -= 1;
      timeEl.textContent = `Time: ${countdown}s`;
      if(countdown === 0){
        finishTest(true);
      }
    }
  } else {
    elapsed += 1;
    timeEl.textContent = `Time: ${elapsed}s`;
  }
}

// Finishing the test
function finishTest(timed=false){
  if(intervalId) clearInterval(intervalId);
  input.disabled = true;
  // calculate correct chars
  const val = input.value;
  let correctChars = 0;
  for(let i=0;i<val.length;i++){
    if(val[i] === text[i]) correctChars++;
  }
  // WPM: (correctChars/5) / minutes
  const secondsUsed = timed ? ((modeSelect.value==='timed-30')?30:60) : Math.max(1, elapsed);
  const wpm = Math.round((correctChars / 5) / (secondsUsed / 60));
  const acc = text.length===0 ? 0 : ((correctChars / text.length) * 100).toFixed(1);
  wpmEl.textContent = `WPM: ${wpm}`;
  accEl.textContent = `Accuracy: ${acc}%`;
  updateProgress(correctChars);
  beep(880, 0.08, 'sine', 0.04); // completion sound
}

// Input handling + word-by-word logic
input.addEventListener('input', (e)=>{
  const val = e.target.value;
  // begin timer on first character
  if(!started){
    started = true;
    // set interval per second
    intervalId = setInterval(tick, 1000);
    beep(520, 0.02, 'sine', 0.01); // start sound
  } else {
    // keypress feedback
    beep(700, 0.01, 'sine', 0.005);
  }

  // determine current word index by splitting input on spaces
  const typedWords = val.split(/\s+/);
  let typedCurrent = typedWords[typedWords.length-1] || '';
  // If user pressed space finishing a word, compare and advance
  if(val.endsWith(' ')){
    const finishedWord = typedWords[typedWords.length-2] || '';
    const idx = currentWordIndex;
    const spans = box.querySelectorAll('.word');
    if(finishedWord === wordList[idx]){
      if(highlightToggle.checked) spans[idx].classList.add('correct');
    } else {
      if(highlightToggle.checked) spans[idx].classList.add('incorrect');
      beep(220, 0.05, 'sawtooth', 0.03); // error beep
    }
    currentWordIndex = Math.min(wordList.length-1, currentWordIndex+1);
    markCurrentWord();
  } else {
    // live partial correctness for current word (optional)
    const idx = currentWordIndex;
    const spans = box.querySelectorAll('.word');
    if(spans[idx] && highlightToggle.checked){
      const expected = wordList[idx];
      if(expected.startsWith(typedCurrent) || typedCurrent === '') {
        spans[idx].classList.remove('incorrect');
      } else {
        spans[idx].classList.add('incorrect');
      }
    }
  }

  // check for full completion
  if(val.trim() === text.trim()){
    finishTest(false);
  }
});

// Buttons
startBtn.addEventListener('click', ()=>{
  soundsOn = soundToggle.checked;
  startTest();
});

restartBtn.addEventListener('click', ()=>{
  soundsOn = soundToggle.checked;
  startTest();
});

// UI toggles
highlightToggle.addEventListener('change', ()=>{ markCurrentWord(); });

// initialize default run
(function init(){
  // set sound flag checkbox initial state
  soundsOn = document.getElementById('soundToggle').checked;
  // load theme icon state (visual only)
  applySavedTheme();
  buildText();
  renderStartState();
})();

function renderStartState(){
  box.innerHTML = '';
  const p = document.createElement('p');
  p.style.color = 'var(--muted)';
  p.style.margin = '6px 0';
  p.textContent = 'Click Start to begin or paste custom text above.';
  box.appendChild(p);
}
