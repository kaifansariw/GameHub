/* eslint-disable no-undef, no-unused-vars */
function getCSRFToken() {
    return document.cookie
        .split(";")
        .map(c => c.trim())
        .find(c => c.startsWith("csrftoken="))
        ?.split("=")[1] || "";
}

function saveScore(score) {
    if (typeof saveScoreToServer === 'function') {
        saveScoreToServer('tic-tac-toe', score);
    }
}

const { useState, useEffect } = React;

function TicTacToeApp() {
    const [board, setBoard] = useState(() => Array(9).fill(''));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [gameActive, setGameActive] = useState(true);
    const [winner, setWinner] = useState(null); // 'X', 'O', 'Draw', or null
    const [winningLine, setWinningLine] = useState(null); // Array of 3 numbers or null
    const [scores, setScores] = useState(() => {
        try {
            const saved = localStorage.getItem('ticTacToeScores');
            return saved ? JSON.parse(saved) : { x: 0, o: 0, draws: 0 };
        } catch (e) {
            return { x: 0, o: 0, draws: 0 };
        }
    });

    useEffect(() => {
        localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
    }, [scores]);

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const checkWinner = (newBoard) => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                return { winner: newBoard[a], line: winningConditions[i] };
            }
        }
        if (newBoard.every(cell => cell !== '')) {
            return { winner: 'Draw', line: null };
        }
        return null;
    };

    const makeMove = (index) => {
        if (board[index] !== '' || !gameActive) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const result = checkWinner(newBoard);

        if (result) {
            setGameActive(false);
            if (result.winner === 'Draw') {
                setWinner('Draw');
                setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
            } else {
                setWinner(result.winner);
                setWinningLine(result.line);
                if (result.winner === 'X') {
                    const newXWins = scores.x + 1;
                    setScores(prev => ({ ...prev, x: newXWins }));
                    saveScore(newXWins);
                } else {
                    setScores(prev => ({ ...prev, o: prev.o + 1 }));
                }
            }
        } else {
            setCurrentPlayer(prev => prev === 'X' ? 'O' : 'X');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(''));
        setCurrentPlayer('X');
        setGameActive(true);
        setWinner(null);
        setWinningLine(null);
    };

    return (
        <div className="game-wrapper flex flex-col items-center justify-center min-h-screen py-4 md:py-6 px-4 w-full select-none">
            {/* Elegant Header */}
            <div className="w-full max-w-lg mb-6 text-center animate__animated animate__fadeInDown">
                <h1 className="text-3xl md:text-4xl font-black font-orbitron tracking-tighter glow-text">
                    TIC <span className="text-purple-500">TAC</span> TOE
                </h1>
            </div>

            {/* Main Game Context */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 w-full max-w-6xl px-4">
                {/* Column 1: Left Control Panel (Immersive & Scaled) */}
                <div className="control-panel compact-glass animate__animated animate__fadeInLeft w-full max-w-sm lg:w-[290px] lg:max-w-[290px] flex flex-col gap-4">
                    <div>
                        <h2 className="font-orbitron font-black text-[13px] text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(124,58,237,0.8)]"></span>
                            Match Status
                        </h2>

                        {/* Integrated Turn / Game Result Overlay */}
                        {winner ? (
                            <div className="mb-3 animate__animated animate__pulse animate__infinite">
                                <div className={`py-3.5 px-4 rounded-lg text-center font-orbitron font-black text-[13px] uppercase tracking-widest shadow-lg ${
                                    winner === 'Draw'
                                        ? 'bg-white/10 border border-white/20 text-white shadow-white/5'
                                        : winner === 'X'
                                            ? 'bg-purple-600/30 border border-purple-500 text-purple-300 shadow-purple-500/20'
                                            : 'bg-pink-600/30 border border-pink-500 text-pink-300 shadow-pink-500/20'
                                }`}>
                                    {winner === 'Draw' ? "Stalemate 🤝" : `${winner} Wins! 🎉`}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between gap-3 mb-3">
                                <div className={`flex-1 py-3 px-3 rounded-lg border text-center transition-all duration-300 ${
                                    currentPlayer === 'X'
                                        ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.3)]'
                                        : 'bg-white/5 border-white/5 opacity-40'
                                }`}>
                                    <span className="block text-[10px] font-orbitron font-bold uppercase tracking-widest text-purple-400">PLAYER</span>
                                    <span className="block text-base font-orbitron font-black text-purple-500">X</span>
                                </div>
                                <div className={`flex-1 py-3 px-3 rounded-lg border text-center transition-all duration-300 ${
                                    currentPlayer === 'O'
                                        ? 'bg-pink-500/10 border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                                        : 'bg-white/5 border-white/5 opacity-40'
                                }`}>
                                    <span className="block text-[10px] font-orbitron font-bold uppercase tracking-widest text-pink-400">PLAYER</span>
                                    <span className="block text-base font-orbitron font-black text-pink-500">O</span>
                                </div>
                            </div>
                        )}

                        {/* Compact Score Board */}
                        <div className="grid grid-cols-3 gap-2 mb-3.5">
                            <div className="p-2 text-center bg-white/3 border-t border-purple-500/50 rounded-lg">
                                <div className="text-[9px] text-purple-400 font-orbitron font-bold uppercase tracking-widest mb-0.5">X WINS</div>
                                <div className="text-base font-orbitron font-black text-white">{scores.x}</div>
                            </div>
                            <div className="p-2 text-center bg-white/3 border-t border-blue-500/50 rounded-lg">
                                <div className="text-[9px] text-blue-400 font-orbitron font-bold uppercase tracking-widest mb-0.5">O WINS</div>
                                <div className="text-base font-orbitron font-black text-white">{scores.o}</div>
                            </div>
                            <div className="p-2 text-center bg-white/3 border-t border-pink-500/50 rounded-lg">
                                <div className="text-[9px] text-pink-400 font-orbitron font-bold uppercase tracking-widest mb-0.5">DRAWS</div>
                                <div className="text-base font-orbitron font-black text-white">{scores.draws}</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={resetGame}
                        className="w-full py-3 rounded-lg bg-purple-600/10 border border-purple-500/30 hover:border-purple-500 hover:bg-purple-600/20 text-purple-300 font-orbitron text-xs font-black uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_10px_rgba(124,58,237,0.2)]"
                    >
                        Reset Round
                    </button>
                </div>

                {/* Column 2: Tic Tac Toe Board */}
                <div className="game-container p-4 animate__animated animate__zoomIn w-full max-w-[380px] lg:w-[380px] lg:max-w-[380px] flex flex-col justify-center items-center">
                    {/* Game Board */}
                    <div className="grid grid-cols-3 gap-3">
                        {board.map((cell, index) => {
                            const isWinningCell = winningLine && winningLine.includes(index);
                            
                            let cellClasses = "cell btn font-orbitron flex items-center justify-center p-0 transition-all duration-300 ";
                            
                            if (cell === 'X') {
                                cellClasses += "btn-primary text-white animate__animated animate__bounceIn ";
                            } else if (cell === 'O') {
                                cellClasses += "btn-secondary text-white animate__animated animate__bounceIn ";
                            } else {
                                cellClasses += "text-purple-400 ";
                            }

                            if (isWinningCell) {
                                // Add neon glow highlight to winning combination
                                if (cell === 'X') {
                                    cellClasses += "bg-purple-500/30 border-purple-400 shadow-[0_0_20px_rgba(124,58,237,0.8)] scale-105 ";
                                } else {
                                    cellClasses += "bg-pink-500/30 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.8)] scale-105 ";
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    className={cellClasses}
                                    onClick={() => makeMove(index)}
                                    disabled={cell !== '' || !gameActive}
                                    style={{
                                        cursor: (cell !== '' || !gameActive) ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {cell}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Column 3: Rules Panel (Immersive & Scaled) */}
                <section className="rules-section compact-glass animate__animated animate__fadeInRight w-full max-w-sm lg:w-[315px] lg:max-w-[315px] flex flex-col gap-4">
                    <h2 className="font-orbitron font-black text-[13px] text-purple-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(124,58,237,0.8)]"></span>
                        Battle Protocols
                    </h2>
                    <ul className="space-y-3 flex-grow flex flex-col justify-center">
                        <li className="flex gap-2">
                            <span className="text-purple-500/30 font-orbitron font-black text-[12px] select-none">01</span>
                            <p className="text-[12px] text-gray-400 leading-relaxed font-rajdhani font-semibold uppercase tracking-wider">
                                Each player takes turns marking one empty cell with their symbol (X or O).
                            </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-purple-500/30 font-orbitron font-black text-[12px] select-none">02</span>
                            <p className="text-[12px] text-gray-400 leading-relaxed font-rajdhani font-semibold uppercase tracking-wider">
                                Align 3 symbols in any direction (horizontal, vertical, diagonal) to claim victory.
                            </p>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-purple-500/30 font-orbitron font-black text-[12px] select-none">03</span>
                            <p className="text-[12px] text-gray-400 leading-relaxed font-rajdhani font-semibold uppercase tracking-wider">
                                A full grid with no winner signals a tactical stalemate.
                            </p>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

// Render the application
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<TicTacToeApp />);
