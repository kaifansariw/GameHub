const GAME_CONFIG = {
    DISK_COUNT: 3,
    PEGS: 3,
    SUCCESS_MESSAGE: "🎉 Congratulations! Puzzle Solved!",
    INVALID_MOVE_MESSAGE: "❌ Invalid Move!",
    ERROR_TIMEOUT_MS: 1000
};

// State Machine (Reducer Pattern)
const initialState = {
    towers: [
        Array.from({ length: GAME_CONFIG.DISK_COUNT }, (_, i) => GAME_CONFIG.DISK_COUNT - i),
        ...Array.from({ length: GAME_CONFIG.PEGS - 1 }, () => [])
    ],
    moves: 0,
    message: "",
    isWon: false
};

let state = JSON.parse(JSON.stringify(initialState));

function reducer(currentState, action) {
    switch (action.type) {
        case 'MOVE_DISK': {
            const { from, to } = action.payload;
            const fromDisk = currentState.towers[from][currentState.towers[from].length - 1];
            const toDisk = currentState.towers[to][currentState.towers[to].length - 1];

            if (!fromDisk || (toDisk && fromDisk >= toDisk)) {
                return { ...currentState, message: GAME_CONFIG.INVALID_MOVE_MESSAGE };
            }

            const newTowers = currentState.towers.map(peg => [...peg]);
            const disk = newTowers[from].pop();
            newTowers[to].push(disk);

            // Win validation: Check exact sequential order, not just disk count
            const isWon = newTowers[GAME_CONFIG.PEGS - 1].length === GAME_CONFIG.DISK_COUNT && 
                          newTowers[GAME_CONFIG.PEGS - 1].every((d, i) => d === GAME_CONFIG.DISK_COUNT - i);

            return {
                ...currentState,
                towers: newTowers,
                moves: currentState.moves + 1,
                message: isWon ? GAME_CONFIG.SUCCESS_MESSAGE : "",
                isWon
            };
        }
        case 'CLEAR_MESSAGE':
            return { ...currentState, message: "" };
        case 'RESET':
            return JSON.parse(JSON.stringify(initialState));
        default:
            return currentState;
    }
}

function dispatch(action) {
    state = reducer(state, action);
    updateDOM();
}

// DOM Elements
const pegs = document.querySelectorAll(".peg");
const movesText = document.getElementById("moves");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

// Efficient DOM Update Pipeline
function updateDOM() {
    movesText.innerText = "Moves: " + state.moves;
    message.innerText = state.message;
    
    pegs.forEach((peg, index) => {
        const currentDisks = Array.from(peg.children).map(d => parseInt(d.dataset.disk));
        const stateDisks = state.towers[index];
        
        // Skip DOM manipulation if state matches perfectly
        if (currentDisks.length === stateDisks.length && currentDisks.every((val, i) => val === stateDisks[i])) {
            return;
        }
        
        peg.innerHTML = "";
        stateDisks.forEach((disk, i) => {
            const d = document.createElement("div");
            d.classList.add("disk", "disk" + disk);
            d.style.bottom = `${i * 30}px`;
            d.setAttribute("draggable", !state.isWon);
            d.dataset.disk = disk;
            peg.appendChild(d);
        });
    });
}

// Event Listeners
pegs.forEach((peg, index) => {
    peg.addEventListener("dragstart", (e) => {
        if (state.isWon) {
            e.preventDefault();
            return;
        }
        const topDisk = state.towers[index][state.towers[index].length - 1];
        if (parseInt(e.target.dataset.disk) !== topDisk) {
            e.preventDefault();
        } else {
            e.dataTransfer.setData("fromPeg", index);
        }
    });

    peg.addEventListener("dragover", (e) => e.preventDefault());

    peg.addEventListener("drop", (e) => {
        const from = parseInt(e.dataTransfer.getData("fromPeg"));
        const to = index;
        
        dispatch({ type: 'MOVE_DISK', payload: { from, to } });
        
        if (state.message === GAME_CONFIG.INVALID_MOVE_MESSAGE) {
            setTimeout(() => dispatch({ type: 'CLEAR_MESSAGE' }), GAME_CONFIG.ERROR_TIMEOUT_MS);
        }
    });
});

resetBtn.addEventListener("click", () => {
    dispatch({ type: 'RESET' });
});

// Initial Render Bootstrap
updateDOM();
