function randomColor() {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  };
}

let target = randomColor();
const targetBox = document.getElementById("targetColor");
const userBox = document.getElementById("userColor");
const result = document.getElementById("result");

function updateUserColor() {
  const r = document.getElementById("r").value;
  const g = document.getElementById("g").value;
  const b = document.getElementById("b").value;
  userBox.style.background = `rgb(${r}, ${g}, ${b})`;
}

document.querySelectorAll("input[type=range]").forEach(slider => {
  slider.addEventListener("input", updateUserColor);
});

function setTargetColor() {
  targetBox.style.background = `rgb(${target.r}, ${target.g}, ${target.b})`;
}
setTargetColor();

document.getElementById("checkBtn").addEventListener("click", () => {
  const r = document.getElementById("r").value;
  const g = document.getElementById("g").value;
  const b = document.getElementById("b").value;

  const diff = Math.abs(r - target.r) +
               Math.abs(g - target.g) +
               Math.abs(b - target.b);

  const accuracy = Math.max(0, 100 - Math.floor((diff / 765) * 100));

  result.textContent = `Accuracy: ${accuracy}%`;
});

document.getElementById("nextBtn").addEventListener("click", () => {
  target = randomColor();
  setTargetColor();
  result.textContent = "";
});
