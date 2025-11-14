let puzzle = document.getElementById("puzzle");
let movesText = document.getElementById("moves");
let message = document.getElementById("message");
let shuffleBtn = document.getElementById("shuffleBtn");

let tiles = [];
let moves = 0;

function createPuzzle() {
    tiles = [1,2,3,4,5,6,7,8,""];
    render();
}

function render() {
    puzzle.innerHTML = "";
    tiles.forEach((num, i) => {
        let tile = document.createElement("div");
        tile.classList.add("tile");

        if (num === "") {
            tile.classList.add("empty");
        } else {
            tile.innerText = num;
            tile.addEventListener("click", () => moveTile(i));
        }

        puzzle.appendChild(tile);
    });
}

function shuffle() {
    tiles.sort(() => Math.random() - 0.5);
    moves = 0;
    movesText.innerText = "Moves: 0";
    message.innerText = "";
    render();
}

function moveTile(index) {
    let emptyIndex = tiles.indexOf("");
    let validMoves = [index - 1, index + 1, index - 3, index + 3];

    if (validMoves.includes(emptyIndex)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        moves++;
        movesText.innerText = "Moves: " + moves;
        render();
        checkWin();
    }
}

function checkWin() {
    if (tiles.join("") === "12345678") {
        message.innerText = "🎉 Puzzle Completed!";
    }
}

shuffleBtn.addEventListener("click", shuffle);

createPuzzle();
