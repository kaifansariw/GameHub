import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, RotateCcw } from 'lucide-react';

const GameModal = ({ isOpen, onClose, game }) => {
    if (!game) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-6xl h-full max-h-[90vh] glass-panel bg-black/60 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <div className="flex items-center gap-4">
                                <h3 className="font-orbitron font-bold text-xl text-white">{game.title}</h3>
                                <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded uppercase tracking-widest">{game.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                    title="Reload Game"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Game Content */}
                        <div className="flex-1 bg-black relative">
                            <iframe
                                src={game.file}
                                className="w-full h-full border-none"
                                title={game.title}
                                allow="autoplay; fullscreen; keyboard"
                            />
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-3 border-t border-white/10 hidden md:flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
                            <span>Press ESC to exit</span>
                            <div className="flex gap-4">
                                <span>Play. Compete. Have Fun.</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default GameModal;
