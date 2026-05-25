import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, FileText, Globe } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const PrivacyPolicy = () => {
    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-[#050508] relative overflow-hidden font-rajdhani">
            <SEO
                title="Privacy Policy"
                description="Read GameHub's privacy manifesto. Learn how we protect your data with encrypted, decentralized protocols."
                keywords="gamehub privacy, data protection, user privacy, secure gaming"
            />
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-orbitron uppercase tracking-widest mb-6">
                        <Shield className="w-3 h-3" />
                        System Integrity
                    </div>
                    <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 tracking-tighter uppercase">
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Manifesto</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Last Updated: March 2026. Your data is encrypted, decentralized, and shielded within the GameHub core.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {/* Section 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl relative group hover:border-blue-500/30 transition-all"
                    >
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#0a0a0f] border border-white/10 rounded-xl flex items-center justify-center text-blue-400">
                            <Eye className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-orbitron font-bold text-white mb-4 mt-2 uppercase tracking-wide">Data Transmission</h2>
                        <div className="space-y-4 text-gray-400 text-base leading-relaxed">
                            <p>
                                When you synchronize with the GameHub network, we collect minimal data packets required for operational stability. This includes your username, encrypted credentials, and system latency metrics.
                            </p>
                            <p className="border-l-2 border-blue-500/30 pl-4 py-1 bg-blue-500/5 italic">
                                Note: We do not store raw passwords. All authentication is handled through cryptographically secured JWT protocols.
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl relative group hover:border-purple-500/30 transition-all"
                    >
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#0a0a0f] border border-white/10 rounded-xl flex items-center justify-center text-purple-400">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-orbitron font-bold text-white mb-4 mt-2 uppercase tracking-wide">Shielding Protocols</h2>
                        <div className="space-y-4 text-gray-400 text-base leading-relaxed">
                            <p>
                                Your information is stored behind multi-layer firewall arrays. We utilize industry-standard SSL encryption for all data in transit between your terminal and our central node.
                            </p>
                            <p>
                                Third-party intelligence agencies (analytics) may receive anonymous telemetry data to improve network performance, but individual identity remains masked.
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 3 - Points */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Globe, title: "Global Scale", text: "Data is routed via decentralized nodes." },
                            { icon: Lock, title: "Total Control", text: "You can purge your identity at any time." },
                            { icon: FileText, title: "Transparency", text: "Open protocols for auditing available." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="bg-[#0f0f15] border border-white/5 rounded-2xl p-6 text-center group hover:bg-white/5 transition-all"
                            >
                                <item.icon className="w-8 h-8 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-orbitron font-bold text-sm uppercase tracking-wider mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Section 4 - Final Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="p-10 text-center rounded-3xl border border-white/5 bg-gradient-to-b from-transparent to-blue-900/10"
                    >
                        <h2 className="text-xl font-orbitron font-black text-white/50 mb-4 uppercase tracking-[0.3em]">Integrity Protocol</h2>
                        <p className="text-gray-500 text-sm max-w-xl mx-auto italic leading-relaxed">
                            By interacting with the GameHub console, you acknowledge and agree to the systemic collection of operational data as outlined in this manifesto. Any breach of protocol will lead to terminal termination.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
