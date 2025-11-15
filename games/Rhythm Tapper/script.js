const noteArea = document.getElementById("noteArea");
const scoreEl = document.getElementById("score");
const comboEl = document.getElementById("combo");
const music = document.getElementById("music");
const startBtn = document.getElementById("startBtn");

let score = 0;
let combo = 0;
let notes = [];
let gameRunning = false;

// Beat timings (ms)
const beats = [500, 1000, 1500, 2000, 2400, 2800, 3300, 3800, 4200];

function startGame() {
    score = 0;
    combo = 0;
    scoreEl.textContent = 0;
    comboEl.textContent = 0;

    noteArea.innerHTML = "";
    notes = [];

    gameRunning = true;
    music.currentTime = 0;
    music.play();

    spawnNotes();
    animateNotes();
}

function spawnNotes() {
    beats.forEach(time => {
        setTimeout(() => {
            if (!gameRunning) return;
            createNote();
        }, time);
    });
}

function createNote() {
    const note = document.createElement("div");
    note.classList.add("note");
    note.style.top = "-20px";
    noteArea.appendChild(note);
    notes.push({ element: note, y: -20 });
}

function animateNotes() {
    if (!gameRunning) return;

    notes.forEach((note, index) => {
        note.y += 4;
        note.element.style.top = note.y + "px";

        if (note.y > 400 && note.y < 440) {
            note.element.onclick = () => hitNote(index);
        }

        if (note.y > 500) {
            missNote(index);
        }
    });

    requestAnimationFrame(animateNotes);
}

function hitNote(index) {
    let note = notes[index];

    score += 100;
    combo += 1;

    scoreEl.textContent = score;
    comboEl.textContent = combo;

    note.element.remove();
    notes.splice(index, 1);
}

function missNote(index) {
    combo = 0;
    comboEl.textContent = 0;

    notes[index].element.remove();
    notes.splice(index, 1);
}

startBtn.onclick = () => {
    if (!gameRunning) startGame();
};
