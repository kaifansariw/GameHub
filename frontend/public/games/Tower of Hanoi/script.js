let pegs = document.querySelectorAll(".peg");
let movesText = document.getElementById("moves");
let message = document.getElementById("message");
let resetBtn = document.getElementById("resetBtn");

let moves = 0;

// Initial disk setup
let towers = [
    [3, 2, 1], // Peg 0 (largest → smallest)
    [],
    []
];

function render() {
    pegs.forEach((peg, index) => {
        peg.innerHTML = "";
        towers[index].forEach((disk, i) => {
            let d = document.createElement("div");
            d.classList.add("disk", "disk" + disk);
            d.style.bottom = `${i * 30}px`;
            d.setAttribute("draggable", true);
            d.dataset.disk = disk;
            peg.appendChild(d);
        });
    });
}

function getTopDisk(pegIndex) {
    let peg = towers[pegIndex];
    return peg[peg.length - 1];
}

function canMove(from, to) {
    let fromDisk = getTopDisk(from);
    let toDisk = getTopDisk(to);

    if (!fromDisk) return false;
    if (!toDisk) return true;

    return fromDisk < toDisk; // Smaller disk only
}

pegs.forEach((peg, index) => {
    peg.addEventListener("dragstart", (e) => {
        let pegIndex = index;
        if (e.target.dataset.disk != getTopDisk(pegIndex)) {
            e.preventDefault(); // Only top disk is draggable
        } else {
            e.dataTransfer.setData("fromPeg", pegIndex);
        }
    });

    peg.addEventListener("dragover", (e) => e.preventDefault());

    peg.addEventListener("drop", (e) => {
        let from = parseInt(e.dataTransfer.getData("fromPeg"));
        let to = index;

        if (canMove(from, to)) {
            let disk = towers[from].pop();
            towers[to].push(disk);
            moves++;
            movesText.textContent = "Moves: " + moves;
            message.innerText = "";
            render();
            checkWin();
        } else {
            message.innerText = "❌ Invalid Move!";
            setTimeout(() => (message.innerText = ""), 1000);
        }
    });
});

function checkWin() {
    if (towers[2].length === 3) {
        message.innerText = "🎉 Congratulations! Puzzle Solved!";
    }
}

resetBtn.addEventListener("click", () => {
    towers = [
        [3, 2, 1],
        [],
        []
    ];
    moves = 0;
    movesText.innerText = "Moves: 0";
    message.innerText = "";
    render();
});

render();
