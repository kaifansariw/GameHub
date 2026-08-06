import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);
            setIsVisible(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const size = 56;
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-8 z-50 group cursor-pointer"
                    aria-label="Back to top"
                >
                    {/* Outer glow */}
                    <div
                        className="absolute inset-0 rounded-full blur-lg transition-opacity duration-500 opacity-40 group-hover:opacity-80"
                        style={{
                            background: `conic-gradient(rgba(124, 58, 237, 0.9) ${scrollProgress * 3.6}deg, transparent 0deg)`
                        }}
                    />

                    {/* SVG Progress Ring */}
                    <svg
                        width={size}
                        height={size}
                        className="rotate-[-90deg] relative z-10"
                    >
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="rgba(10, 10, 20, 0.9)"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth={strokeWidth}
                        />
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="transparent"
                            stroke="url(#progressGradient)"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            style={{ transition: 'stroke-dashoffset 0.15s ease' }}
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#7c3aed" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-all duration-300" style={{ color: '#ec4899' }} />
                    </div>

                    {/* Percent tooltip on hover */}
                    <div
                        className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#0d0d14] border border-[#7c3aed]/40 text-[10px] font-orbitron px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg"
                        style={{ color: '#ec4899' }}>
                        {Math.round(scrollProgress)}%
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
