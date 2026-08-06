import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Globe, Github, Twitter, Headset } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const ContactPage = () => {
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('success'), 2000);
    };

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-[#050508] relative overflow-hidden font-rajdhani">
            <SEO
                title="Contact"
                description="Get in touch with the GameHub development team. Report bugs, submit feedback, or enquire about partnerships."
                keywords="contact gamehub, support, feedback, bug report, gaming help"
            />
            {/* Cosmic Background Elements */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-orbitron uppercase tracking-widest mb-6"
                    >
                        <Headset className="w-3 h-3" />
                        Neural Support Link
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6 uppercase tracking-[-0.05em]">
                        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 font-black">CORE</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                        Need assistance with your terminal? Have a feedback loop to submit? Reach out to the GameHub development node.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl group hover:border-pink-500/50 transition-all"
                            >
                                <Mail className="w-8 h-8 text-pink-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-orbitron font-bold text-sm uppercase tracking-widest mb-2">Direct Comms</h3>
                                <p className="text-gray-500 text-sm">support@gamehub.io</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl group hover:border-blue-500/50 transition-all"
                            >
                                <MessageSquare className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-orbitron font-bold text-sm uppercase tracking-widest mb-2">Neural Discord</h3>
                                <p className="text-gray-500 text-sm">Join our pilot lounge</p>
                            </motion.div>
                        </div>

                        <div className="p-10 bg-gradient-to-br from-purple-900/20 to-transparent border border-white/5 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Globe className="w-32 h-32 text-white" />
                            </div>
                            <h3 className="text-2xl font-orbitron font-black text-white mb-4 uppercase tracking-tighter">System Status</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Our global clusters are currently operating at <span className="text-green-400">99.9% uptime</span>. If you're experiencing latency, please verify your local terminal's ISP link.
                            </p>
                            <div className="flex gap-4">
                                <Github className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                                <Twitter className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-3xl shadow-2xl relative"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-orbitron uppercase text-gray-500 tracking-[0.2em] ml-1">Identity</label>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all placeholder:text-gray-700 font-rajdhani"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-orbitron uppercase text-gray-500 tracking-[0.2em] ml-1">Frequency</label>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all placeholder:text-gray-700 font-rajdhani"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-orbitron uppercase text-gray-500 tracking-[0.2em] ml-1">Protocol Type</label>
                                <select className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-pink-500/50 transition-all font-rajdhani appearance-none">
                                    <option>General Feedback</option>
                                    <option>Technical Issue</option>
                                    <option>Bug Report</option>
                                    <option>Business Node Expansion</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-orbitron uppercase text-gray-500 tracking-[0.2em] ml-1">Transmission</label>
                                <textarea
                                    rows="5"
                                    placeholder="Your message encrypted here..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all placeholder:text-gray-700 font-rajdhani resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className={`w-full py-5 rounded-2xl font-orbitron font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 transition-all relative overflow-hidden group ${status === 'success' ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-pink-500 hover:text-white'
                                    }`}
                            >
                                {status === 'sending' ? (
                                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : status === 'success' ? (
                                    <>
                                        <span>Packet Sent</span>
                                        <CheckCircle className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        <span>Broadcast Transmission</span>
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const CheckCircle = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);

export default ContactPage;
