const CONFIG = {
    pegCount: 3,
    diskCount: 3,
    diskHeight: 25,
    diskGap: 30,
    minDiskWidth: 60,
    maxDiskWidth: 120,
};

const dom = {
    pegs: Array.from(document.querySelectorAll(".peg")),
    movesText: document.getElementById("moves"),
    message: document.getElementById("message"),
    resetBtn: document.getElementById("resetBtn"),
};

const state = {
    towers: createInitialTowers(),
    moves: 0,
    selectedPeg: null,
    solved: false,
};

function createInitialTowers() {
    return [
        Array.from({ length: CONFIG.diskCount }, (_, index) => CONFIG.diskCount - index),
        [],
        [],
    ];
}

function getTopDisk(pegIndex) {
    const peg = state.towers[pegIndex];
    return peg[peg.length - 1];
}

function getDiskWidth(diskSize) {
    if (CONFIG.diskCount === 1) {
        return CONFIG.maxDiskWidth;
    }

    const ratio = (diskSize - 1) / (CONFIG.diskCount - 1);
    return Math.round(
        CONFIG.minDiskWidth + ratio * (CONFIG.maxDiskWidth - CONFIG.minDiskWidth)
    );
}

function getDiskColor(diskSize) {
    const ratio = (diskSize - 1) / Math.max(1, CONFIG.diskCount - 1);
    const hue = 210 - Math.round(ratio * 130);
    return `linear-gradient(135deg, hsl(${hue}, 78%, 60%), hsl(${hue - 8}, 70%, 42%))`;
}

function setMessage(text, tone = "info") {
    dom.message.textContent = text;
    dom.message.dataset.tone = tone;
}

function clearMessage() {
    dom.message.textContent = "";
    dom.message.dataset.tone = "info";
}

function updateHud() {
    dom.movesText.innerText = `Moves: ${state.moves}`;
}

function isTowerSorted(tower) {
    return tower.every((disk, index, arr) => index === 0 || arr[index - 1] > disk);
}

function isSolved() {
    const target = state.towers[2];
    return target.length === CONFIG.diskCount && isTowerSorted(target);
}

function updatePegAccessibility(peg, index) {
    const isSelected = state.selectedPeg === index;
    const diskCount = state.towers[index].length;

    peg.setAttribute("role", "button");
    peg.setAttribute("tabindex", "0");
    peg.setAttribute(
        "aria-label",
        `Peg ${index + 1}, ${diskCount} disk${diskCount === 1 ? "" : "s"}${isSelected ? ", selected" : ""}`
    );
    peg.setAttribute("aria-pressed", isSelected ? "true" : "false");
    peg.classList.toggle("selected", isSelected);
}

function createDiskElement(diskSize, position) {
    const disk = document.createElement("div");
    disk.classList.add("disk");
    disk.draggable = true;
    disk.dataset.disk = String(diskSize);
    disk.style.bottom = `${position * CONFIG.diskGap}px`;
    disk.style.width = `${getDiskWidth(diskSize)}px`;
    disk.style.height = `${CONFIG.diskHeight}px`;
    disk.style.background = getDiskColor(diskSize);
    disk.setAttribute("aria-hidden", "true");
    return disk;
}

function renderPeg(index) {
    const peg = dom.pegs[index];
    peg.innerHTML = "";

    updatePegAccessibility(peg, index);

    state.towers[index].forEach((diskSize, position) => {
        peg.appendChild(createDiskElement(diskSize, position));
    });
}

function renderAllPegs() {
    dom.pegs.forEach((_, index) => renderPeg(index));
}

function canMove(from, to) {
    const fromDisk = getTopDisk(from);
    const toDisk = getTopDisk(to);

    if (!fromDisk) return false;
    if (!toDisk) return true;

    return fromDisk < toDisk;
}

function selectPeg(index) {
    if (state.solved) return;

    if (!getTopDisk(index)) {
        setMessage("Choose a peg with a movable top disk.", "error");
        return;
    }

    const previous = state.selectedPeg;
    state.selectedPeg = index;

    if (previous !== null && previous !== index) {
        renderPeg(previous);
    }
    renderPeg(index);

    setMessage(`Peg ${index + 1} selected. Choose a destination peg.`, "info");
}

function clearSelection() {
    const previous = state.selectedPeg;
    state.selectedPeg = null;

    if (previous !== null) {
        renderPeg(previous);
    }
}

function attemptMove(from, to) {
    if (state.solved) return false;

    if (!canMove(from, to)) {
        setMessage("❌ Invalid move!", "error");
        return false;
    }

    const disk = state.towers[from].pop();
    state.towers[to].push(disk);
    state.moves += 1;

    updateHud();
    clearMessage();

    renderPeg(from);
    renderPeg(to);

    if (isSolved()) {
        state.solved = true;
        setMessage("🎉 Congratulations! Puzzle Solved!", "success");
    }

    return true;
}

function handlePegAction(index) {
    if (state.solved) return;

    if (state.selectedPeg === null) {
        selectPeg(index);
        return;
    }

    if (state.selectedPeg === index) {
        clearSelection();
        clearMessage();
        return;
    }

    const from = state.selectedPeg;
    const moved = attemptMove(from, index);

    if (moved) {
        clearSelection();
    }
}

dom.pegs.forEach((peg, index) => {
    peg.addEventListener("click", () => handlePegAction(index));

    peg.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handlePegAction(index);
        }
    });

    peg.addEventListener("dragstart", (event) => {
        const topDisk = getTopDisk(index);
        const targetDisk = event.target.dataset.disk;

        if (!topDisk || String(topDisk) !== String(targetDisk)) {
            event.preventDefault();
            return;
        }

        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("fromPeg", String(index));
    });

    peg.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    peg.addEventListener("drop", (event) => {
        event.preventDefault();

        const from = parseInt(event.dataTransfer.getData("fromPeg"), 10);
        const moved = attemptMove(from, index);

        if (!moved && state.selectedPeg !== null) {
            renderPeg(state.selectedPeg);
        }
    });
});

dom.resetBtn.addEventListener("click", resetGame);

function resetGame() {
    state.towers = createInitialTowers();
    state.moves = 0;
    state.selectedPeg = null;
    state.solved = false;

    updateHud();
    clearMessage();
    renderAllPegs();
}

function initGame() {
    updateHud();
    renderAllPegs();
}

initGame();
