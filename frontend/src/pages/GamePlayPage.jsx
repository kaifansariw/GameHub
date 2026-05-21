import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { games } from '../data/games';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const GamePlayPage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const game = games.find(g => g.id === gameId);

    if (!game) {
        return (
            <div className="h-screen flex items-center justify-center text-center bg-[#050508]">
                <div className="glass-panel p-12">
                    <h1 className="text-4xl font-orbitron text-red-500 mb-6 uppercase tracking-widest">GAME NOT FOUND</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="neon-btn neon-btn-primary px-8 py-3"
                    >
                        Return to Hub
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#050508]">
            <SEO
                title={`Play ${game.title}`}
                description={`Play ${game.title} instantly in your browser on GameHub. ${game.description || 'No downloads needed.'}`}
                keywords={`${game.title}, browser game, free online game, instant play`}
            />
            {/* Top Minimal Controller Header - Always Visible */}
            <header className="h-16 px-6 flex justify-between items-center bg-[#0a0a0f] border-b border-white/5 relative z-10 shadow-2xl">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 rounded-xl glass-panel bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all flex items-center gap-2 text-[10px] font-orbitron uppercase tracking-[0.2em] border border-white/10 group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        Main Hub
                    </button>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400/50 font-orbitron font-bold uppercase tracking-[0.3em] leading-none mb-1">Active Mission</span>
                        <span className="text-purple-400 font-orbitron font-black text-xs tracking-[0.2em] uppercase leading-none">{game.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { const f = document.getElementById('game-iframe'); if (f) { const currentSrc = f.src; f.src = currentSrc; } }}
                        className="p-2.5 rounded-xl glass-panel bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all border border-white/10"
                        title="Reload Interface"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>
            </header>

            {/* Game Frame Container - Optimized for better separation */}
            <div className="flex-1 flex flex-col items-center py-6 px-4 md:px-8 mb-20">
                <div className="w-full max-w-7xl aspect-video md:h-[80vh] bg-black rounded-[2rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(124,58,237,0.05)] relative group">
                    <iframe
                        id="game-iframe"
                        src={game.file}
                        className="w-full h-full border-none"
                        title={game.title}
                        allow="autoplay; fullscreen; keyboard"
                    />
                </div>

                {/* Visual Separator */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mt-12 mb-4" />
                <p className="text-[10px] font-orbitron text-gray-600 uppercase tracking-[0.5em]">End of Mission Interface</p>
            </div>
        </div>
    );
};

export default GamePlayPage;
