import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const FALLBACK_IMAGE = '/assets/game-controller.png';

const GameCard = ({ game, onClick }) => {
    const [failedImages, setFailedImages] = useState(() => new Set());
    const [loadedSrc, setLoadedSrc] = useState('');

    const imageSrc = failedImages.has(game.image) ? FALLBACK_IMAGE : game.image;
    const isLoaded = loadedSrc === imageSrc;

    const handleImageError = () => {
        if (imageSrc !== FALLBACK_IMAGE) {
            setFailedImages((current) => {
                const next = new Set(current);
                next.add(game.image);
                return next;
            });
            return;
        }
        setLoadedSrc(FALLBACK_IMAGE);
    };

    return (
        <div
            className="group cursor-pointer relative transition-transform duration-300 hover:-translate-y-2"
            onClick={() => onClick(game)}
        >
            <div className="relative overflow-hidden rounded-2xl glass-panel border-white/5 bg-black/40">
                {!isLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
                )}
                <img
                    src={imageSrc}
                    alt={game.title}
                    loading="lazy"
                    onLoad={() => setLoadedSrc(imageSrc)}
                    onError={handleImageError}
                    className={`w-full h-52 object-cover group-hover:scale-110 transition-all duration-500 ${
                        isLoaded ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'
                    }`}
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
        </div>
    );
};

export default GameCard;
