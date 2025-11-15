/* Music Guess — Song Identifier
   Place audio files in ./assets/ and update the `songs` array below.
*/

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const replayBtn = document.getElementById('replayBtn');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const choicesEl = document.getElementById('choices');
const scoreEl = document.getElementById('score');
const roundEl = document.getElementById('round');
const totalRoundsEl = document.getElementById('totalRounds');
const timeLeftEl = document.getElementById('timeLeft');
const highScoreEl = document.getElementById('highScore');

let score = 0;
let round = 0;
let totalRounds = 5;         // default, can be changed
let highScore = +localStorage.getItem('musicGuessHigh') || 0;
let currentSong = null;
let currentOptions = [];
let timer = null;
let timePerRound = 8;        // seconds
let countdown = timePerRound;
let gameRunning = false;

// SONG LIST -- update with your own files
// Each item: { title: 'Song Title - Artist', path: 'assets/song-file.mp3', start: 0 }
// Use short clips if possible. `start` is optional to begin playback at a certain offset.
const songs = [
  { title: 'Song One — Artist A', path: 'assets/song1.mp3', start: 0 },
  { title: 'Song Two — Artist B', path: 'assets/song2.mp3', start: 0 },
  { title: 'Song Three — Artist C', path: 'assets/song3.mp3', start: 0 },
  { title: 'Song Four — Artist D', path: 'assets/song4.mp3', start: 0 },
  { title: 'Song Five — Artist E', path: 'assets/song5.mp3', start: 0 },
  { title: 'Song Six — Artist F', path: 'assets/song6.mp3', start: 0 }
];

// UI init
highScoreEl.textContent = highScore;
totalRoundsEl.textContent = totalRounds;
scoreEl.textContent = score;
roundEl.textContent = round;
timeLeftEl.textContent = countdown;

// Helpers
function pickRandom(arr, n) {
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

function startGame() {
  score = 0;
  round = 0;
  gameRunning = true;
  scoreEl.textContent = score;
  roundEl.textContent = round;
  nextBtn.disabled = true;
  startBtn.disabled = true;
  playNextRound();
}

function endGame() {
  gameRunning = false;
  startBtn.disabled = false;
  nextBtn.disabled = true;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('musicGuessHigh', highScore);
    highScoreEl.textContent = highScore;
  }
  alert(`Game over! Your score: ${score} ${score > highScore ? '(New high score!)' : ''}`);
}

function playNextRound() {
  if (!gameRunning) return;
  if (round >= totalRounds) {
    endGame();
    return;
  }
  round++;
  roundEl.textContent = round;
  // pick a random song as correct
  currentSong = pickRandom(songs, 1)[0];
  // pick 3 wrong options
  const wrongs = pickRandom(songs.filter(s => s.title !== currentSong.title), 3);
  currentOptions = [currentSong, ...wrongs].sort(() => Math.random() - 0.5);
  renderChoices();
  // set audio
  setupAudio(currentSong);
  // reset timer
  startCountdown();
  nextBtn.disabled = true;
}

function setupAudio(song) {
  audio.src = song.path;
  audio.pause();
  audio.currentTime = song.start || 0;
  // we play only short preview on playBtn click
}

playBtn.addEventListener('click', () => {
  if (!audio.src) return;
  // play a short preview window (2.5s)
  const previewLength = 2.5;
  const startAt = audio.currentTime || 0;
  audio.currentTime = currentSong.start || startAt;
  audio.play().catch(e => console.warn('Audio play failed', e));
  // stop after previewLength
  setTimeout(() => {
    audio.pause();
  }, previewLength * 1000);
});

replayBtn.addEventListener('click', () => {
  if (!audio.src) return;
  // replay same preview
  playBtn.click();
});

function renderChoices() {
  choicesEl.innerHTML = '';
  currentOptions.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = opt.title;
    btn.dataset.index = idx;
    btn.addEventListener('click', onChoiceClick);
    choicesEl.appendChild(btn);
  });
}

function disableChoices() {
  document.querySelectorAll('.choice').forEach(el => {
    el.classList.add('disabled');
    el.disabled = true;
  });
}

function onChoiceClick(e) {
  if (!gameRunning) return;
  const idx = +e.currentTarget.dataset.index;
  const chosen = currentOptions[idx];
  disableChoices();
  stopCountdown();
  // evaluate
  if (chosen.title === currentSong.title) {
    e.currentTarget.classList.add('correct');
    const gained = 100 + Math.max(0, Math.floor(countdown / 1)); // faster => more points
    score += gained;
    scoreEl.textContent = score;
  } else {
    e.currentTarget.classList.add('wrong');
    // highlight correct
    Array.from(document.querySelectorAll('.choice')).find(c => c.textContent === currentSong.title)
      .classList.add('correct');
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
  playNextRound();
});

startBtn.addEventListener('click', () => {
  startGame();
});

// Countdown logic
function startCountdown() {
  countdown = timePerRound;
  timeLeftEl.textContent = countdown;
  clearInterval(timer);
  timer = setInterval(() => {
    countdown--;
    timeLeftEl.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(timer);
      timeLeftEl.textContent = 0;
      // treat as miss
      disableChoices();
      // highlight correct answer
      Array.from(document.querySelectorAll('.choice')).find(c => c.textContent === currentSong.title)
        .classList.add('correct');
      nextBtn.disabled = false;
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(timer);
}

// Defensive: if audio fails
audio.addEventListener('error', () => {
  console.warn('Audio failed to load:', audio.src);
});

// init UI with placeholder until game starts
renderChoices();
