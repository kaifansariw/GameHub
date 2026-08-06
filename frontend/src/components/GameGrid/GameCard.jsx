import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const GameCard = ({ game, onClick }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group cursor-pointer relative"
            onClick={() => onClick(game)}
        >
            <div className="relative overflow-hidden rounded-2xl glass-panel border-white/5 bg-black/40">
                <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.6)]">
                        <Play className="text-white fill-current w-6 h-6 ml-1" />
                    </div>
                </div>

                <div className="absolute top-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md text-purple-400 text-[10px] px-2 py-1 rounded-md uppercase tracking-widest border border-white/10">
                        {game.category}
                    </span>
                </div>
            </div>

            <div className="mt-4 px-1">
                <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-purple-400 transition-colors">
                    {game.title}
                </h3>
                <p className="text-gray-400 text-sm font-medium line-clamp-1 mt-1">
                    {game.description}
                </p>
            </div>
        </motion.div>
    );
};

export default GameCard;
