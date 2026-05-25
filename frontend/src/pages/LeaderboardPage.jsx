import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, User, Activity } from 'lucide-react';
import api from '../api/axios';
import SEO from '../components/SEO/SEO';

const LeaderboardPage = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await api.get('leaderboard/');
                setLeaders(response.data);
            } catch (error) {
                console.error('Failed to fetch leaderboard:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const getRankStats = (rank) => {
        switch (rank) {
            case 1: return { icon: <Trophy className="text-yellow-400 w-6 h-6" />, color: 'from-yellow-500/20 to-transparent', border: 'border-yellow-500/50' };
            case 2: return { icon: <Medal className="text-gray-300 w-6 h-6" />, color: 'from-gray-400/20 to-transparent', border: 'border-gray-400/50' };
            case 3: return { icon: <Medal className="text-amber-600 w-6 h-6" />, color: 'from-amber-700/20 to-transparent', border: 'border-amber-700/50' };
            default: return { icon: <span className="text-gray-500 font-orbitron">{rank}</span>, color: 'from-white/5 to-transparent', border: 'border-white/5' };
        }
    };

    return (
        <div className="pt-32 pb-24 container mx-auto px-8 md:px-12 lg:px-16 min-h-screen">
            <SEO
                title="Leaderboard"
                description="View the top-ranked players and global champions on GameHub. See who leads the cosmic rankings."
                keywords="gaming leaderboard, high scores, gamehub champions, top players"
            />
            <div className="text-center mb-16">
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-orbitron font-black text-white mb-4"
                >
                    HALL OF <span className="text-purple-500">FAME</span>
                </motion.h1>
                <p className="text-gray-400 font-rajdhani text-xl">The world's most elite gamers ranked by engagement and skill.</p>
            </div>

            <div className="max-w-4xl mx-auto glass-panel border-white/5 bg-black/40 overflow-hidden shadow-2xl">
                {loading ? (
                    <div className="py-20 text-center animate-pulse flex flex-col items-center gap-4">
                        <Activity className="w-8 h-8 text-purple-500 animate-spin" />
                        <span className="font-orbitron text-gray-500 lowercase tracking-widest">Gathering Stats...</span>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5 font-orbitron text-[10px] uppercase tracking-[3px] text-gray-500">
                                    <th className="px-8 py-6">Rank</th>
                                    <th className="px-8 py-6">Player</th>
                                    <th className="px-8 py-6 text-right">Engagement Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaders.map((player) => {
                                    const stats = getRankStats(player.rank);
                                    return (
                                        <motion.tr
                                            key={player.username}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: player.rank * 0.05 }}
                                            className={`border-b border-white/5 hover:bg-white/5 transition-all group`}
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${stats.border} bg-gradient-to-br ${stats.color}`}>
                                                        {stats.icon}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                                        <User className="w-4 h-4 text-purple-400" />
                                                    </div>
                                                    <span className="font-orbitron font-bold text-white group-hover:text-purple-400 transition-colors">
                                                        {player.username}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="font-orbitron text-2xl font-black text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                                                        {player.score}
                                                    </span>
                                                    <span className="text-[9px] text-gray-600 uppercase tracking-widest mt-1">
                                                        {player.visits} visits • {player.plays} plays
                                                    </span>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;
