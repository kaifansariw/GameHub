import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { games } from '../data/games';
import GameCard from '../components/GameGrid/GameCard';
import { AnimatePresence } from 'framer-motion';
import { Search, Filter, Gamepad2 } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const GamesPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = useMemo(() => {
        const cats = ['all', ...new Set(games.map(game => game.category))];
        return cats;
    }, []);

    const filteredGames = useMemo(() => {
        return games.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    const handleGameClick = (game) => {
        navigate(`/play/${game.id}`);
    };

    return (
        <div className="bg-[#050508] min-h-screen pt-32 pb-20">
            <SEO
                title="Games Library"
                description="Browse GameHub's complete collection of 50+ instant-play browser games. Filter by category and find your next favorite title."
                keywords="browser games library, free games, arcade games, puzzle games, instant play"
            />
            {/* Page Header */}
            <div className="container mx-auto px-8 md:px-12 lg:px-16 mb-16">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-4 uppercase tracking-tight">
                            GAMES <span className="text-purple-500">LIBRARY</span>
                        </h1>
                        <p className="text-gray-500 font-rajdhani text-xl">Browse our complete collection of instant-play titles</p>
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="container mx-auto px-8 md:px-12 lg:px-16 mb-12">
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-4 backdrop-blur-md flex flex-col lg:flex-row gap-6 items-center">
                    {/* Search */}
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search games by title or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-rajdhani"
                        />
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <div className="flex items-center gap-2 mr-2 text-gray-500 font-orbitron text-[10px] uppercase tracking-widest hidden sm:flex">
                            <Filter className="w-4 h-4" /> Filters:
                        </div>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-xl font-orbitron text-[10px] uppercase tracking-widest border transition-all ${activeCategory === cat
                                    ? 'bg-purple-500 border-purple-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Games Grid */}
            <div className="container mx-auto px-8 md:px-12 lg:px-16">
                <AnimatePresence mode="popLayout">
                    {filteredGames.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {filteredGames.map(game => (
                                <motion.div
                                    key={game.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <GameCard game={game} onClick={handleGameClick} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-40 bg-[#07070a] border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:border-purple-500/30 transition-all duration-500">
                                    <Gamepad2 className="w-12 h-12 text-gray-600 group-hover:text-purple-500 transition-colors duration-500" />
                                </div>
                                <h3 className="text-3xl font-orbitron font-black text-white uppercase tracking-tighter mb-4">
                                    SIGNAL <span className="text-purple-500">LOST</span>
                                </h3>
                                <p className="text-gray-500 font-rajdhani text-lg max-w-md mx-auto">
                                    We couldn't find any games matching your current frequency. <br />
                                    <span className="text-gray-600 text-sm mt-4 block">Try adjusting your filters or search terms.</span>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GamesPage;
