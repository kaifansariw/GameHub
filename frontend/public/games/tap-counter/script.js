const tapLine = document.getElementById("tap-line");
const tapBtn = document.getElementById("tap-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const restartBtn = document.getElementById("restart-btn");
const countDisplay = document.getElementById("count-display");
const message = document.getElementById("message");

const tapSound = document.getElementById("tap-sound");
const winSound = document.getElementById("win-sound");

let count = 0;
let maxCount = 100;
let paused = false;

// Create bulbs
for(let i=0; i<maxCount; i++){
    const bulb = document.createElement("div");
    bulb.classList.add("bulb");
    tapLine.appendChild(bulb);
}

const bulbs = document.querySelectorAll(".bulb");

function updateDisplay() {
    countDisplay.textContent = `${count} / ${maxCount}`;
    bulbs.forEach((b, i) => {
        if(i < count) b.classList.add("active");
        else b.classList.remove("active");
    });
    if(count >= maxCount){
        message.textContent = "🎉 You Win!";
        winSound.play();
        tapBtn.disabled = true;
    }
}

tapBtn.addEventListener("click", () => {
    if(paused) return;
    count++;
    tapSound.play();
    updateDisplay();
});

pauseBtn.addEventListener("click", () => {
    paused = true;
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
    message.textContent = "⏸️ Paused";
});

resumeBtn.addEventListener("click", () => {
    paused = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
    message.textContent = "";
});

restartBtn.addEventListener("click", () => {
    count = 0;
    paused = false;
    tapBtn.disabled = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
    message.textContent = "";
    updateDisplay();
});

// Initial display
updateDisplay();
