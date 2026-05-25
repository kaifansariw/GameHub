import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Gamepad2, LogOut, User, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Browse Games', path: '/games' },
        { name: 'Leaderboard', path: '/leaderboard' },
        { name: 'Our Story', path: '/about' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-8 md:px-12 lg:px-16 py-4 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent'
            }`}>
            <div className="container mx-auto flex items-center justify-between">
                {/* Left: Brand & Links */}
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-all duration-300">
                            <Gamepad2 className="text-white w-6 h-6" />
                        </div>
                        <span className="font-orbitron font-black text-2xl tracking-tighter text-white uppercase group-hover:text-purple-400 transition-colors">
                            Game<span className="text-purple-500 text-3xl leading-none">Hub</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-orbitron text-[10px] uppercase tracking-[0.2em] transition-all relative group ${location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-[2px] bg-purple-500 transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right: Search & Auth */}
                <div className="flex items-center gap-6">
                    <div className="relative hidden xl:block group">
                        <input
                            type="text"
                            placeholder="Explore games..."
                            className="bg-white/5 border border-white/10 rounded-xl px-5 py-2 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64 transition-all group-hover:bg-white/10 group-hover:border-white/20 font-rajdhani"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-purple-400 transition-colors" />
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-5">
                            <Link to="/profile" className="flex items-center gap-3 group">
                                <span className="text-gray-300 font-rajdhani font-semibold text-sm hidden lg:block group-hover:text-purple-400 transition-colors">
                                    {user?.username}
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300">
                                    <User className="w-5 h-5 text-purple-400" />
                                </div>
                            </Link>
                            <button onClick={handleLogout} className="p-2.5 rounded-xl border border-white/5 hover:border-red-500/30 hover:bg-red-500/5 text-gray-400 hover:text-red-400 transition-all duration-300 group" title="Logout">
                                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link to="/login" className="text-gray-400 hover:text-white font-orbitron text-[10px] uppercase tracking-[0.2em] transition-colors px-4 py-2">Login</Link>
                            <Link to="/register" className="neon-btn neon-btn-primary text-[10px] px-6 py-2.5 shadow-[0_0_20px_rgba(124,58,237,0.3)]">Join Now</Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-gray-400 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Backdrop & Content */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 lg:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="font-orbitron text-sm uppercase tracking-widest text-gray-400 hover:text-purple-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {isAuthenticated ? (
                                <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-center py-3 text-purple-400 font-orbitron text-xs uppercase tracking-widest border border-purple-500/20 rounded-xl">My Identity</Link>
                                    <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-center py-3 text-red-500 font-orbitron text-xs uppercase tracking-widest border border-red-500/20 rounded-xl">Terminate Session</button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-3 text-gray-400 font-orbitron text-xs uppercase tracking-widest">Login</Link>
                                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="neon-btn neon-btn-primary text-center py-4">Join Now</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
