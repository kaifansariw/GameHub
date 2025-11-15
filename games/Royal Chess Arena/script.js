const boardElement = document.getElementById("chessboard");
const turnLabel = document.getElementById("turn");

let board = [];
let selected = null;
let currentTurn = "white";

// Unicode chess characters
const pieces = {
  white: {
    king: "♔",
    queen: "♕",
    rook: "♖",
    bishop: "♗",
    knight: "♘",
    pawn: "♙",
  },
  black: {
    king: "♚",
    queen: "♛",
    rook: "♜",
    bishop: "♝",
    knight: "♞",
    pawn: "♟︎",
  },
};

// Initialize board matrix
function initBoard() {
  board = [
    ["black_rook", "black_knight", "black_bishop", "black_queen", "black_king", "black_bishop", "black_knight", "black_rook"],
    Array(8).fill("black_pawn"),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill(""),
    Array(8).fill("white_pawn"),
    ["white_rook", "white_knight", "white_bishop", "white_queen", "white_king", "white_bishop", "white_knight", "white_rook"]
  ];
  drawBoard();
}

function drawBoard() {
  boardElement.innerHTML = "";
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const tile = document.createElement("div");
      tile.className =
        "tile " + ((r + c) % 2 === 0 ? "white-tile" : "black-tile");
      tile.dataset.row = r;
      tile.dataset.col = c;

      if (board[r][c]) {
        const [color, type] = board[r][c].split("_");
        tile.textContent = pieces[color][type];
      }

      tile.onclick = () => selectTile(r, c);

      boardElement.appendChild(tile);
    }
  }
}

function selectTile(r, c) {
  const piece = board[r][c];

  if (selected === null) {
    if (!piece || !piece.startsWith(currentTurn)) return;

    selected = { r, c };
    highlightMoves(r, c);
  } else {
    movePiece(selected.r, selected.c, r, c);
    selected = null;
    drawBoard();
  }
}

function highlightMoves(r, c) {
  drawBoard();
  document
    .querySelector(`[data-row="${r}"][data-col="${c}"]`)
    .classList.add("selected");
}

// Valid move check is simplified for smooth gameplay
function isValidMove(sr, sc, tr, tc) {
  const piece = board[sr][sc];
  if (!piece) return false;

  const [color, type] = piece.split("_");

  // Prevent capturing own piece
  if (board[tr][tc] && board[tr][tc].startsWith(color)) return false;

  const dr = tr - sr;
  const dc = tc - sc;

  switch (type) {
    case "pawn":
      if (color === "white") {
        if (dr === -1 && dc === 0 && board[tr][tc] === "") return true;
        if (dr === -1 && Math.abs(dc) === 1 && board[tr][tc].startsWith("black")) return true;
      } else {
        if (dr === 1 && dc === 0 && board[tr][tc] === "") return true;
        if (dr === 1 && Math.abs(dc) === 1 && board[tr][tc].startsWith("white")) return true;
      }
      return false;

    case "rook":
      return dr === 0 || dc === 0;

    case "bishop":
      return Math.abs(dr) === Math.abs(dc);

    case "queen":
      return dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);

    case "knight":
      return (
        (Math.abs(dr) === 2 && Math.abs(dc) === 1) ||
        (Math.abs(dr) === 1 && Math.abs(dc) === 2)
      );

    case "king":
      return Math.abs(dr) <= 1 && Math.abs(dc) <= 1;
  }
}

function movePiece(sr, sc, tr, tc) {
  if (!isValidMove(sr, sc, tr, tc)) return;

  const piece = board[sr][sc];
  board[sr][sc] = "";
  board[tr][tc] = piece;

  currentTurn = currentTurn === "white" ? "black" : "white";
  turnLabel.textContent = currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1);
}

document.getElementById("restartBtn").onclick = initBoard;

initBoard();
