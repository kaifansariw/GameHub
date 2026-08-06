import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, HardDrive, Info, Layers } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const CookiePolicy = () => {
    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-[#050508] relative overflow-hidden font-rajdhani">
            <SEO
                title="Cookie Policy"
                description="Understand how GameHub uses cookies and local cache to maintain your session and personalize your gaming experience."
                keywords="gamehub cookies, cookie policy, terminal cache, browser storage"
            />
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent)] pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-orbitron uppercase tracking-widest mb-6">
                        <Cpu className="w-3 h-3" />
                        Memory Allocation
                    </div>
                    <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 tracking-tighter uppercase leading-tight">
                        Terminal <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Cache</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Understanding how GameHub utilizes local system memory (cookies) to maintain your neural link.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {/* Intro Block */}
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl relative flex items-start gap-6 border-l-4 border-l-green-500/50">
                        <Info className="w-10 h-10 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                            <h2 className="text-xl font-orbitron font-bold text-white mb-3 uppercase tracking-wider">What are Terminal Cookies?</h2>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Cookies are small data packets stored in your local terminal. They act as a persistence layer, allowing the GameHub engine to recognize your system signature across multiple sessions. Without these packets, your high-score metrics and profile sync would be reset.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        {/* Type 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all"
                        >
                            <Database className="w-8 h-8 text-blue-400 mb-4" />
                            <h3 className="text-lg font-orbitron font-bold text-white mb-2 uppercase tracking-tight">Essential Packets</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Critical for system login and security protocols. These cannot be disabled as they form the core of your session stability.
                            </p>
                        </motion.div>

                        {/* Type 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all"
                        >
                            <Layers className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-lg font-orbitron font-bold text-white mb-2 uppercase tracking-tight">Preference Nodes</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Used to remember your custom themes, volume settings, and game preferences. Stored locally to minimize network calls.
                            </p>
                        </motion.div>

                        {/* Type 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all"
                        >
                            <Zap className="w-8 h-8 text-orange-400 mb-4" />
                            <h3 className="text-lg font-orbitron font-bold text-white mb-2 uppercase tracking-tight">Telemetry Sync</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Anonymous performance tracking to identify system bottlenecks and latency spikes across different terminal hardware.
                            </p>
                        </motion.div>

                        {/* Type 4 */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="p-6 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all"
                        >
                            <HardDrive className="w-8 h-8 text-green-400 mb-4" />
                            <h3 className="text-lg font-orbitron font-bold text-white mb-2 uppercase tracking-tight">Game State Cache</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Temporary local storage for game assets to reduce load times on your next initialization sequence.
                            </p>
                        </motion.div>
                    </div>

                    {/* How to disable */}
                    <div className="mt-12 text-center py-12 border-t border-white/5">
                        <h2 className="text-2xl font-orbitron font-black text-white mb-4 uppercase tracking-[0.2em]">De-allocation</h2>
                        <p className="text-gray-600 text-sm max-w-lg mx-auto leading-relaxed">
                            You can purge these memory packets through your browser terminal settings. Be advised: clearing cache will disconnect your current session and require re-initialization of profile protocols.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Zap = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
);

export default CookiePolicy;
