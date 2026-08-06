import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Scale, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const ProtocolTerms = () => {
    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-[#050508] relative overflow-hidden font-rajdhani">
            <SEO
                title="Terms of Service"
                description="Read GameHub's Terms of Operation. Understand the rules governing your access to the GameHub platform and mainframe."
                keywords="gamehub terms, terms of service, gaming rules, platform agreement"
            />
            {/* Background Effects */}
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-orbitron uppercase tracking-widest mb-6">
                        <Terminal className="w-3 h-3" />
                        Access Protocol: v1.0
                    </div>
                    <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 tracking-tighter uppercase leading-tight">
                        Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Operation</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        These are the systemic rules governing your access to the GameHub mainframe. Disregard leads to de-sync.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-12">
                    {/* Clause 1: Acceptance */}
                    <div className="relative pl-12">
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                            <Zap className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-orbitron font-bold text-white mb-4 uppercase tracking-widest">01. Initialization Agreement</h3>
                        <p className="text-gray-400 leading-relaxed">
                            By initializing a session with GameHub, you agree to be bound by these Terms of Operation. If you do not accept the protocol, you must terminate your connection immediately. Any continued link is considered explicit acceptance of these conditions.
                        </p>
                    </div>

                    {/* Clause 2: User Conduct */}
                    <div className="relative pl-12 py-8 bg-white/2 border border-white/5 rounded-3xl backdrop-blur-sm px-8">
                        <div className="absolute left-8 top-10 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-orbitron font-bold text-white mb-4 uppercase tracking-widest">02. Operational Integrity</h3>
                        <ul className="space-y-4 text-gray-500">
                            {[
                                "No unauthorized terminal access or system injection.",
                                "Do not attempt to disrupt node synchronization or leaderboard metrics.",
                                "Respect the neural network latency of other pilots (players).",
                                "Abuse of system glitches is grounds for permanent neural block (ban)."
                            ].map((text, i) => (
                                <li key={i} className="flex gap-3 items-start group">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-2 transition-all group-hover:scale-150" />
                                    <span className="group-hover:text-gray-300 transition-colors">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Clause 3: Liability */}
                    <div className="relative pl-12 border-l-2 border-red-500/20 py-4">
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                            <AlertTriangle className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-orbitron font-bold text-white mb-4 uppercase tracking-widest">03. Liability Shields</h3>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            GameHub provides a simulated gaming experience "AS-IS" and "AS-AVAILABLE". We are not responsible for:
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-600 uppercase tracking-tighter">
                            <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">SYSTEM_LATENCY_ERROR</div>
                            <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">DATA_SYNC_LOSS</div>
                            <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">NEURAL_SHOCK_FAIL</div>
                            <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/10">TIMELINE_DIVERGENCE</div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="mt-8 p-8 border border-white/10 rounded-2xl bg-gradient-to-r from-purple-900/10 to-transparent flex items-center gap-6 group">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Scale className="w-8 h-8 text-purple-400" />
                        </div>
                        <div>
                            <h4 className="text-white font-orbitron font-black uppercase text-sm mb-1 tracking-widest">Governing Framework</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                These protocols are governed by the decentralized digital standards of the High-Fidelity Gaming Collective. Any disputes will be settled via algorithmic arbitration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProtocolTerms;
