import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { games } from '../data/games';
import { ArrowLeft, RotateCcw, Keyboard, Contrast, Sparkles, X } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const STORAGE_KEYS = {
    reducedMotion: 'gamehubReducedMotion',
    highContrast: 'gamehubHighContrast',
};

const GamePlayPage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const iframeRef = useRef(null);
    const frameKeyHandlerRef = useRef(null);

    const game = useMemo(() => games.find(g => g.id === gameId), [gameId]);

    const [shortcutOpen, setShortcutOpen] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem(STORAGE_KEYS.reducedMotion) === 'true');
    const [highContrast, setHighContrast] = useState(() => localStorage.getItem(STORAGE_KEYS.highContrast) === 'true');

    const reloadGame = useCallback(() => {
        const frame = iframeRef.current;
        if (frame) {
            frame.src = frame.src;
        }
    }, []);

    const applyFrameAccessibility = useCallback((frameDoc) => {
        if (!frameDoc?.head || !frameDoc.documentElement) return;

        let style = frameDoc.getElementById('gamehub-accessibility-styles');
        if (!style) {
            style = frameDoc.createElement('style');
            style.id = 'gamehub-accessibility-styles';
            frameDoc.head.appendChild(style);
        }

        const reducedMotionCss = reducedMotion
            ? `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `
            : '';

        const highContrastCss = highContrast
            ? `
                html, body {
                    background: #000 !important;
                    color: #fff !important;
                }

                * {
                    text-shadow: none !important;
                }

                a, button, input, textarea, select, [role="button"] {
                    outline: 2px solid rgba(255, 255, 255, 0.75) !important;
                    outline-offset: 2px !important;
                }
            `
            : '';

        style.textContent = `${reducedMotionCss}\n${highContrastCss}`;
        frameDoc.documentElement.style.scrollBehavior = 'auto';
        frameDoc.documentElement.dataset.reducedMotion = String(reducedMotion);
        frameDoc.documentElement.dataset.highContrast = String(highContrast);
    }, [highContrast, reducedMotion]);

    const handleShortcutKey = useCallback((event) => {
        const key = event.key;

        if (key === '?' || (event.ctrlKey && key === '/')) {
            event.preventDefault();
            setShortcutOpen(prev => !prev);
            return;
        }

        if (key === 'Escape') {
            event.preventDefault();
            setShortcutOpen(false);
            return;
        }

        if (!event.metaKey && !event.ctrlKey && !event.altKey) {
            if (key.toLowerCase() === 'h') {
                event.preventDefault();
                setHighContrast(prev => !prev);
                return;
            }

            if (key.toLowerCase() === 'm') {
                event.preventDefault();
                setReducedMotion(prev => !prev);
                return;
            }

            if (key.toLowerCase() === 'r') {
                event.preventDefault();
                reloadGame();
            }
        }
    }, [reloadGame]);

    const bindFrameShortcuts = useCallback(() => {
        const frame = iframeRef.current;
        const frameDoc = frame?.contentDocument;
        if (!frameDoc) return;

        if (frameKeyHandlerRef.current) {
            frameDoc.removeEventListener('keydown', frameKeyHandlerRef.current, true);
        }

        frameKeyHandlerRef.current = handleShortcutKey;
        frameDoc.addEventListener('keydown', handleShortcutKey, true);
        applyFrameAccessibility(frameDoc);
    }, [applyFrameAccessibility, handleShortcutKey]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.reducedMotion, String(reducedMotion));
        localStorage.setItem(STORAGE_KEYS.highContrast, String(highContrast));
        applyFrameAccessibility(iframeRef.current?.contentDocument);
    }, [applyFrameAccessibility, highContrast, reducedMotion]);

    useEffect(() => {
        window.addEventListener('keydown', handleShortcutKey);
        return () => window.removeEventListener('keydown', handleShortcutKey);
    }, [handleShortcutKey]);

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
        <div className={`min-h-screen flex flex-col bg-[#050508] ${highContrast ? 'contrast-125' : ''}`}>
            <SEO
                title={`Play ${game.title}`}
                description={`Play ${game.title} instantly in your browser on GameHub. ${game.description || 'No downloads needed.'}`}
                keywords={`${game.title}, browser game, free online game, instant play`}
            />

            <header className="h-16 px-6 flex justify-between items-center bg-[#0a0a0f] border-b border-white/5 relative z-20 shadow-2xl">
                <div className="flex items-center gap-6 min-w-0">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 rounded-xl glass-panel bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all flex items-center gap-2 text-[10px] font-orbitron uppercase tracking-[0.2em] border border-white/10 group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        Main Hub
                    </button>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <div className="flex flex-col min-w-0">
                        <span className="text-[10px] text-gray-400/50 font-orbitron font-bold uppercase tracking-[0.3em] leading-none mb-1">Active Mission</span>
                        <span className="text-purple-400 font-orbitron font-black text-xs tracking-[0.2em] uppercase leading-none truncate">{game.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShortcutOpen(true)}
                        className="p-2.5 rounded-xl glass-panel bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all border border-white/10"
                        title="Keyboard shortcuts"
                        aria-label="Open keyboard shortcuts"
                    >
                        <Keyboard className="w-3.5 h-3.5" />
                    </button>

                    <button
                        onClick={() => setHighContrast(prev => !prev)}
                        className={`p-2.5 rounded-xl glass-panel border transition-all ${highContrast ? 'bg-white text-black border-white/20' : 'bg-white/5 hover:bg-white/20 text-white/50 hover:text-white border-white/10'}`}
                        title="Toggle high contrast"
                        aria-label="Toggle high contrast"
                    >
                        <Contrast className="w-3.5 h-3.5" />
                    </button>

                    <button
                        onClick={() => setReducedMotion(prev => !prev)}
                        className={`p-2.5 rounded-xl glass-panel border transition-all ${reducedMotion ? 'bg-purple-500 text-white border-purple-400/50' : 'bg-white/5 hover:bg-white/20 text-white/50 hover:text-white border-white/10'}`}
                        title="Toggle reduced motion"
                        aria-label="Toggle reduced motion"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                    </button>

                    <button
                        onClick={reloadGame}
                        className="p-2.5 rounded-xl glass-panel bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all border border-white/10"
                        title="Reload interface"
                        aria-label="Reload interface"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center py-6 px-4 md:px-8 mb-20 relative">
                <div
                    className={`w-full max-w-7xl aspect-video md:h-[80vh] bg-black rounded-[2rem] overflow-hidden border shadow-[0_0_100px_rgba(124,58,237,0.05)] relative group ${highContrast ? 'border-white/40' : 'border-white/5'}`}
                >
                    <iframe
                        id="game-iframe"
                        ref={iframeRef}
                        src={game.file}
                        className={`w-full h-full border-none ${reducedMotion ? 'motion-safe:animate-none' : ''}`}
                        title={game.title}
                        allow="autoplay; fullscreen; keyboard"
                        onLoad={bindFrameShortcuts}
                    />
                </div>

                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mt-12 mb-4" />
                <p className="text-[10px] font-orbitron text-gray-600 uppercase tracking-[0.5em]">End of Mission Interface</p>

                {shortcutOpen && (
                    <div className="absolute inset-x-4 top-6 md:inset-x-auto md:right-8 md:top-6 z-30 w-full max-w-xl">
                        <div className="rounded-[1.5rem] border border-white/10 bg-[#0b0b10]/95 backdrop-blur-xl shadow-2xl p-6">
                            <div className="flex items-center justify-between gap-4 mb-6">
                                <div>
                                    <div className="text-[10px] font-orbitron uppercase tracking-[0.3em] text-gray-500 mb-2">Controls</div>
                                    <h2 className="text-xl font-orbitron font-black uppercase tracking-tight text-white">Keyboard Shortcuts</h2>
                                </div>
                                <button
                                    onClick={() => setShortcutOpen(false)}
                                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                    aria-label="Close shortcuts overlay"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                {[
                                    ['?', 'Open or close this overlay'],
                                    ['Esc', 'Close the overlay'],
                                    ['H', 'Toggle high contrast'],
                                    ['M', 'Toggle reduced motion'],
                                    ['R', 'Reload the game frame'],
                                    ['Ctrl + /', 'Open or close this overlay'],
                                ].map(([key, label]) => (
                                    <div key={key} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                                        <span className="font-orbitron text-[10px] uppercase tracking-[0.3em] text-purple-300">{key}</span>
                                        <span className="text-gray-300 text-right">{label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <button
                                    onClick={() => setHighContrast(prev => !prev)}
                                    className={`px-4 py-2 rounded-xl border text-[10px] font-orbitron uppercase tracking-[0.25em] transition-all ${highContrast ? 'bg-white text-black border-white/20' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                                >
                                    High Contrast
                                </button>
                                <button
                                    onClick={() => setReducedMotion(prev => !prev)}
                                    className={`px-4 py-2 rounded-xl border text-[10px] font-orbitron uppercase tracking-[0.25em] transition-all ${reducedMotion ? 'bg-purple-500 text-white border-purple-400/50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                                >
                                    Reduced Motion
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GamePlayPage;
