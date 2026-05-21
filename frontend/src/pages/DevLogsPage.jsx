import React from 'react';
import { History, Zap, Cpu, Shield, Globe, Terminal, Rocket } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const DevLogItem = ({ date, version, title, items, color, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.15 }}
        className="relative pl-12 pb-16 last:pb-0"
    >
        {/* Timeline Line */}
        <div className="absolute left-[23px] top-4 bottom-0 w-0.5 bg-gradient-to-b from-white/10 to-transparent" />

        {/* Timeline Dot */}
        <div className={`absolute left-0 top-0 w-12 h-12 rounded-xl bg-[#0a0a0f] border border-white/10 flex items-center justify-center ${color} shadow-[0_0_20px_rgba(255,255,255,0.02)] z-10 group-hover:scale-110 transition-transform`}>
            <Icon className="w-5 h-5" />
        </div>

        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <span className="font-orbitron text-[10px] text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">{date}</span>
                <span className="font-orbitron text-[10px] text-purple-400 font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/10">v{version}</span>
            </div>
            <h3 className="text-2xl font-orbitron font-black text-white uppercase tracking-tighter leading-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">{title}</h3>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-400 font-rajdhani text-lg leading-relaxed items-start group">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-2.5 flex-shrink-0 group-hover:scale-150 transition-all group-hover:bg-purple-400" />
                        <span className="group-hover:text-gray-200 transition-colors uppercase text-sm tracking-wide">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);

const DevLogsPage = () => {
    const logs = [
        {
            date: "March 2026",
            version: "2.0.0",
            title: "The Cosmic Transition",
            icon: Rocket,
            color: "text-purple-400 shadow-[0_0_15px_rgba(124,58,237,0.2)]",
            items: [
                "RESTRUCTURED CORE TO MONOREPO ARCHITECTURE",
                "MIGRATED ENTIRE FRONTEND TO REACT 19 + VITE",
                "IMPLEMENTED DJANGO REST FRAMEWORK BACKEND",
                "INTRODUCED COSMIC BLUE NEON DESIGN SYSTEM",
                "REFACTORED 20+ GAMES INTO SANDBOXED IFRAMES",
                "INTEGRATED ZUSTAND FOR NEURAL STATE MANAGEMENT"
            ]
        },
        {
            date: "February 2026",
            version: "1.5.0",
            title: "Security Shield Deployment",
            icon: Shield,
            color: "text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
            items: [
                "INITIALIZED JWT AUTHENTICATION PROTOCOLS",
                "DEPLOYED MULTI-LAYER FIREWALL FOR LEADERBOARDS",
                "ENHANCED DATA ENCRYPTION AT REST",
                "OPTIMIZED TERMINAL LOGOUT SEQUENCES"
            ]
        },
        {
            date: "January 2026",
            version: "1.2.0",
            title: "Performance Optimization Matrix",
            icon: Cpu,
            color: "text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
            items: [
                "REDUCED SYSTEM LATENCY BY 45%",
                "IMPLEMENTED ADVANCED ASSET CACHING",
                "MINIFIED ALL JS SCRIPTS ACROSS 15 TIERS",
                "OPTIMIZED CANVAS RENDERING FOR BROWSER TERMINALS"
            ]
        },
        {
            date: "December 2025",
            version: "1.0.0",
            title: "GameHub Core Initialization",
            icon: Zap,
            color: "text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
            items: [
                "INITIAL LAUNCH OF THE GAMEHUB CLUSTER",
                "INTEGRATED 10 CORE BROWSER GAMES",
                "ESTABLISHED BASIC LEADERBOARD SYNC",
                "DEPLOYED GLOBAL CDN FOR ASSETS"
            ]
        }
    ];

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-[#050508] relative overflow-hidden font-rajdhani">
            <SEO
                title="Dev Logs"
                description="Trace the evolution of GameHub through detailed development logs. See every version, update, and cosmic leap in the platform's history."
                keywords="gamehub devlogs, changelog, development history, gaming platform updates"
            />
            {/* Cosmic Background Effects */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-orbitron uppercase tracking-widest mb-6"
                    >
                        <History className="w-3 h-3" />
                        System Chronology
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6 uppercase tracking-[-0.05em]">
                        Dev <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-black">LOGS</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Trace the evolution of the GameHub mainframe. Every commit, every patch, every cosmic leap documented.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {logs.map((log, i) => (
                        <DevLogItem key={i} {...log} index={i} />
                    ))}
                </div>

                {/* Closing Terminal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 p-10 bg-white/2 border border-white/5 rounded-[4rem] flex flex-col items-center gap-8 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
                    <Terminal className="w-16 h-16 text-white/10" />
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-orbitron font-black text-white uppercase tracking-widest">End of Transmission</h2>
                        <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed italic">
                            The future is being coded as you participate. Stay connected for upcoming 2.1.0 updates including multiplayer neural links.
                        </p>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full animate-pulse" />
                </motion.div>
            </div>
        </div>
    );
};

export default DevLogsPage;
