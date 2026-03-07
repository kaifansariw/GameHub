// Rock Paper Scissors Game Logic
const choices = {
  rock: { emoji: "🪨", name: "Rock" },
  paper: { emoji: "📄", name: "Paper" },
  scissors: { emoji: "✂️", name: "Scissors" },
};

let scores = JSON.parse(localStorage.getItem("rpsScores")) || {
  player: 0,
  computer: 0,
  draws: 0,
};

// Initialize game
function initGame() {
  updateScoreDisplay();
}

let roundCount = 0;
const maxRounds = 3;

// Play game
function playGame(playerChoice) {
  if (roundCount >= maxRounds) return;
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);

  // Update display
  updateChoiceDisplay(playerChoice, computerChoice);
  updateScores(result);
  updateScoreDisplay();
  saveScores();

  roundCount++;

  // show final result
  if (roundCount >= maxRounds) {
    updateResult("final", playerChoice, computerChoice);
    disableGameButtons();
    // Save score to server
    if (typeof saveScoreToServer === 'function') {
      saveScoreToServer('rps', scores.player);
    }
  } else {

    updateResult(result, playerChoice, computerChoice, roundCount);
  }
}

// Get random computer choice
function getComputerChoice() {
  const choiceKeys = Object.keys(choices);
  return choiceKeys[Math.floor(Math.random() * choiceKeys.length)];
}

// Determine winner
function determineWinner(player, computer) {
  if (player === computer) return "draw";

  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winConditions[player] === computer ? "player" : "computer";
}

// Update choice display
function updateChoiceDisplay(playerChoice, computerChoice) {
  const playerDisplay = document.getElementById("playerChoice");
  const computerDisplay = document.getElementById("computerChoice");

  // Add animation classes
  playerDisplay.className = "text-8xl mb-4 animate__animated animate__bounceIn";
  computerDisplay.className =
    "text-8xl mb-4 animate__animated animate__bounceIn";

  // Update choices
  playerDisplay.textContent = choices[playerChoice].emoji;
  computerDisplay.textContent = choices[computerChoice].emoji;
}

// Update result display
function updateResult(result, playerChoice, computerChoice, roundCount = 0) {
  const resultDiv = document.getElementById("gameResult");
  const resultText = document.getElementById("resultText");
  const alertDiv = resultDiv.querySelector(".alert");

  let message = "";
  let alertClass = "alert";

  if (result === "final") {
    // final match summary
    if (scores.player > scores.computer) {
      message = `🏆 You won the match! (${scores.player} - ${scores.computer})  👉 Click 'Reset' to start a new game. `;
      alertClass = "alert alert-success";
    } else if (scores.player < scores.computer) {
      message = `💻 Computer won the match! (${scores.computer} - ${scores.player})  👉 Click 'Reset' to start a new game.`;
      alertClass = "alert alert-error";
    } else {
      message = `🤝 The match is a draw! (${scores.player} - ${scores.computer})   👉 Click 'Reset' to start a new game.`;
      alertClass = "alert alert-warning";
    }
  } else {
    message = `Round ${roundCount} of 3: `;
    if (result === "player") {
      message += `You win! ${choices[playerChoice].name} beats ${choices[computerChoice].name}.`;
      alertClass = "alert alert-success";
    } else if (result === "computer") {
      message += `You lose! ${choices[computerChoice].name} beats ${choices[playerChoice].name}.`;
      alertClass = "alert alert-error";
    } else {
      message += `It's a draw! You both chose ${choices[playerChoice].name}.`;
      alertClass = "alert alert-warning";
    }
  }

  resultText.textContent = message;
  alertDiv.className = alertClass;
  resultDiv.classList.remove("hidden");
  resultDiv.classList.add("animate__animated", "animate__fadeInUp");
}

// Update scores
function updateScores(result) {
  switch (result) {
    case "player":
      scores.player++;
      break;
    case "computer":
      scores.computer++;
      break;
    case "draw":
      scores.draws++;
      break;
  }
}

// Update score display
function updateScoreDisplay() {
  document.getElementById("playerWins").textContent = scores.player;
  document.getElementById("computerWins").textContent = scores.computer;
  document.getElementById("draws").textContent = scores.draws;
}

// Save scores to localStorage
function saveScores() {
  localStorage.setItem("rpsScores", JSON.stringify(scores));
}

// Reset game
function resetGame() {
  scores = { player: 0, computer: 0, draws: 0 };
  updateScoreDisplay();
  saveScores();
  roundCount = 0;
  // Reset display
  document.getElementById("playerChoice").textContent = "❓";
  document.getElementById("computerChoice").textContent = "❓";
  document.getElementById("gameResult").classList.add("hidden");

  //   Enable game buttons
  enableGameButtons();
}

// Disable game buttons
function disableGameButtons() {
  const button = document.querySelectorAll(".rps-button");
  button.forEach((btn) => (btn.disable = true));
}

// Enable game buttons
function enableGameButtons() {
  const button = document.querySelectorAll(".rps-button");
  button.forEach((btn) => (btn.disable = false));
}

// Initialize game when page loads
document.addEventListener("DOMContentLoaded", initGame);
