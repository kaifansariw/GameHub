import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Twitter, Github, Youtube, Mail, Rocket } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#050508] border-t border-white/5 pt-12 pb-8 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-[10%] w-[300px] h-[300px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-8 md:px-12 lg:px-16">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-12">
                    {/* Brand Meta - Corrected Left Alignment */}
                    <div className="max-w-xs space-y-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] group-hover:scale-105 transition-all duration-500">
                                <Gamepad2 className="text-white w-6 h-6" />
                            </div>
                            <span className="font-orbitron font-black text-2xl tracking-tighter text-white">
                                GAMEHUB
                            </span>
                        </Link>
                        <p className="text-gray-400 font-rajdhani text-base leading-relaxed opacity-70">
                            The next dimension of browser gaming. High-performance protocols meet a high-fidelity community experience.
                        </p>
                        <div className="flex gap-5">
                            <a href="#" className="text-gray-500 hover:text-white transition-all hover:-translate-y-1">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/kaifansariw/GameHub" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-all hover:-translate-y-1">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-white transition-all hover:-translate-y-1">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Grid - Corrected Right Alignment/Spacing */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 lg:gap-x-16 flex-1 w-full lg:w-auto">
                        <div>
                            <h4 className="text-white font-orbitron text-[10px] uppercase tracking-[0.3em] mb-6 font-black text-white/20">Intelligence</h4>
                            <ul className="space-y-3 font-rajdhani text-base text-gray-500">
                                <li><Link to="/games" className="hover:text-purple-400 transition-colors">Games Library</Link></li>
                                <li><Link to="/leaderboard" className="hover:text-purple-400 transition-colors">Leaderboard</Link></li>
                                <li><Link to="/faq" className="hover:text-purple-400 transition-colors">Intelligence FAQ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-orbitron text-[10px] uppercase tracking-[0.3em] mb-6 font-black text-white/20">Protocol</h4>
                            <ul className="space-y-3 font-rajdhani text-base text-gray-500">
                                <li><Link to="/about" className="hover:text-purple-400 transition-colors">Core Vision</Link></li>
                                <li><Link to="/devlogs" className="hover:text-purple-400 transition-colors">Dev Logs</Link></li>
                                <li><Link to="/privacy" className="hover:text-purple-400 transition-colors">Security manifesto</Link></li>
                                <li><Link to="/contact" className="hover:text-purple-400 transition-colors">contact core</Link></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-white font-orbitron text-[10px] uppercase tracking-[0.3em] mb-6 font-black text-white/20">Newsletter</h4>
                            <div className="flex flex-col gap-3">
                                <div className="relative group">
                                    <input
                                        type="email"
                                        placeholder="Secure Email..."
                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50 w-full font-rajdhani transition-all placeholder:text-gray-700"
                                    />
                                </div>
                                <button className="bg-white text-black py-3 px-5 rounded-xl font-orbitron font-black text-[9px] uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-2 group">
                                    <span>Deploy Sync</span>
                                    <Rocket className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
                    <p className="font-orbitron text-[9px] uppercase tracking-[0.4em] text-gray-600">
                        © {currentYear} GAMEHUB CORE. INTEGRITY & ZERO_LATENCY.
                    </p>
                    <div className="flex gap-8 font-orbitron text-[9px] uppercase tracking-[0.3em] text-gray-700">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Protocol</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Terminals</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
