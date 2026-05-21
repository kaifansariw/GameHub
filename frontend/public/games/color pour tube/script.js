let currentDifficulty = null;
let tubes = [];
let selectedTube = null;
let moves = 0;
let isWon = false;


const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'];


const difficultySettings = {
    easy: { numColors: 3, tubesPerColor: 3, emptyTubes: 2 },
    medium: { numColors: 4, tubesPerColor: 4, emptyTubes: 2 },
    hard: { numColors: 5, tubesPerColor: 4, emptyTubes: 2 }
};


function startGame(difficulty) {
    currentDifficulty = difficulty;
    selectedTube = null;
    moves = 0;
    isWon = false;
    
   
    document.getElementById('menu-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    document.getElementById('win-screen').classList.add('hidden');
    
    
    const emoji = difficulty === 'easy' ? '🟢' : difficulty === 'medium' ? '🟡' : '🔴';
    const title = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    document.getElementById('difficulty-display').textContent = `${emoji} ${title} Mode`;
    document.getElementById('moves-count').textContent = moves;
    
   
    initGame();
}


function initGame() {
    const settings = difficultySettings[currentDifficulty];
    const { numColors, tubesPerColor, emptyTubes } = settings;
    
    tubes = [];
    const gameColors = colors.slice(0, numColors);
    
   
    for (let i = 0; i < numColors; i++) {
        tubes.push(Array(tubesPerColor).fill(gameColors[i]));
    }
    
 
    const allColors = tubes.flat();
    for (let i = allColors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allColors[i], allColors[j]] = [allColors[j], allColors[i]];
    }
    

    tubes = [];
    for (let i = 0; i < numColors; i++) {
        tubes.push(allColors.slice(i * tubesPerColor, (i + 1) * tubesPerColor));
    }
    
  
    for (let i = 0; i < emptyTubes; i++) {
        tubes.push([]);
    }
    
    renderTubes();
}


function renderTubes() {
    const container = document.getElementById('tubes-container');
    container.innerHTML = '';
    
    const tubeHeight = currentDifficulty === 'easy' ? 3 : 4;
    const tubeHeightPx = tubeHeight * 48 + 24;
    
    tubes.forEach((tube, index) => {
        const tubeWrapper = document.createElement('div');
        tubeWrapper.className = 'tube-wrapper';
        tubeWrapper.onclick = () => handleTubeClick(index);
        
        const tubeContainer = document.createElement('div');
        tubeContainer.className = 'tube-container';
        
        const tubeGlass = document.createElement('div');
        tubeGlass.className = 'tube-glass';
        tubeGlass.style.height = tubeHeightPx + 'px';
        
        const tubeInner = document.createElement('div');
        tubeInner.className = 'tube-inner';
        tubeInner.style.height = '100%';
        
   
        for (let i = 0; i < tubeHeight; i++) {
            const segment = document.createElement('div');
            segment.className = 'tube-segment';
            
            const colorIndex = i;
            const hasColor = tube[colorIndex];
            const isBottom = i === 0;
            
            if (hasColor) {
                segment.classList.add('filled');
                segment.style.backgroundColor = hasColor;
                
                const shine = document.createElement('div');
                shine.className = 'segment-shine';
                segment.appendChild(shine);
            }
            
            if (isBottom) {
                segment.classList.add('bottom');
            }
            
            tubeInner.appendChild(segment);
        }
        
     
        const shineLeft = document.createElement('div');
        shineLeft.className = 'glass-shine-left';
        
        const shineRight = document.createElement('div');
        shineRight.className = 'glass-shine-right';
        
        tubeGlass.appendChild(tubeInner);
        tubeGlass.appendChild(shineLeft);
        tubeGlass.appendChild(shineRight);
        tubeContainer.appendChild(tubeGlass);
        tubeWrapper.appendChild(tubeContainer);
        container.appendChild(tubeWrapper);
    });
}


function handleTubeClick(index) {
    if (isWon) return;
    
    if (selectedTube === null) {
        if (tubes[index].length > 0) {
            selectedTube = index;
            updateSelectedTube();
        }
    } else {
        if (selectedTube === index) {
            selectedTube = null;
            updateSelectedTube();
        } else if (canPour(tubes[selectedTube], tubes[index])) {
            // Pour
            const color = tubes[selectedTube].pop();
            tubes[index].push(color);
            selectedTube = null;
            moves++;
            document.getElementById('moves-count').textContent = moves;
            renderTubes();
            checkWin();
        } else {
            selectedTube = index;
            updateSelectedTube();
        }
    }
}


function updateSelectedTube() {
    const tubeWrappers = document.querySelectorAll('.tube-wrapper');
    tubeWrappers.forEach((wrapper, index) => {
        if (index === selectedTube) {
            wrapper.classList.add('selected');
        } else {
            wrapper.classList.remove('selected');
        }
    });
}


function canPour(fromTube, toTube) {
    const tubeSize = currentDifficulty === 'easy' ? 3 : 4;
    
    if (fromTube.length === 0) return false;
    if (toTube.length >= tubeSize) return false;
    if (toTube.length === 0) return true;
    return fromTube[fromTube.length - 1] === toTube[toTube.length - 1];
}


function checkWin() {
    const tubeSize = currentDifficulty === 'easy' ? 3 : 4;
    
    const allSorted = tubes.every(tube => {
        if (tube.length === 0) return true;
        if (tube.length !== tubeSize) return false;
        return tube.every(color => color === tube[0]);
    });
    
    if (allSorted) {
        isWon = true;
        showWinScreen();
    }
}


function showWinScreen() {
    document.getElementById('win-screen').classList.remove('hidden');
    document.getElementById('final-moves').textContent = moves;
}


function restartGame() {
    initGame();
    selectedTube = null;
    moves = 0;
    isWon = false;
    document.getElementById('moves-count').textContent = moves;
    document.getElementById('win-screen').classList.add('hidden');
}


function backToMenu() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('menu-screen').classList.add('active');
    currentDifficulty = null;
    tubes = [];
    selectedTube = null;
    moves = 0;
    isWon = false;
}

window.startGame = startGame;
window.restartGame = restartGame;
window.backToMenu = backToMenu;