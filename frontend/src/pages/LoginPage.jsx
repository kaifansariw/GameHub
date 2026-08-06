import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogIn, User, Lock, ArrowRight, Gamepad2, AlertCircle, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import SEO from '../components/SEO/SEO';
import GoogleAuthButton from '../components/GoogleAuth/GoogleAuthButton';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('auth/login/', formData);
            const { user, access, refresh } = response.data;
            setAuth(user, access, refresh);
            navigate('/');
        } catch (err) {
            console.error('Login Error:', err);
            const errorMsg = err.response?.data?.error || err.response?.data?.detail || 'Invalid credentials or server error';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-[#050508] relative overflow-x-hidden overflow-y-auto">
            <SEO
                title="Login"
                description="Login to your GameHub account to access your profile, track scores and compete on the global leaderboard."
                keywords="gamehub login, sign in, gaming account, player portal"
            />
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_50%)]" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full animate-pulse-slow pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full animate-pulse-slow pointer-events-none delay-1000" />
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />
            </div>

            {/* Back to Home Button */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="absolute top-8 left-8 z-20"
            >
                <Link
                    to="/"
                    className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-purple-500/50 px-5 py-2.5 rounded-xl text-gray-400 hover:text-white transition-all duration-500 font-orbitron text-[10px] uppercase tracking-widest backdrop-blur-md group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Terminal
                </Link>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-md glass-panel p-10 border-white/5 bg-black/40 relative z-10 shadow-2xl"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center mb-8 mx-auto shadow-xl group-hover:border-purple-500/40 transform -rotate-6 transition-all duration-700">
                        <Gamepad2 className="text-purple-500 w-10 h-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    </div>
                    <h1 className="text-4xl font-orbitron font-black text-white mb-3 tracking-tighter uppercase leading-none">
                        AUTH <span className="text-purple-500">REQUIRED</span>
                    </h1>
                    <p className="text-gray-500 font-rajdhani text-lg">Initialize neural link to access your profile</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm mb-8"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-orbitron font-bold text-gray-400 uppercase tracking-widest pl-1">Username</label>
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-white/20"
                                placeholder="vishwa_gamer"
                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-purple-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-orbitron font-bold text-gray-400 uppercase tracking-widest pl-1">Password</label>
                            <Link to="/forgot-password" name="forgot_password_link" className="text-[10px] font-orbitron text-purple-400 hover:text-purple-300 transition-colors">Forgot Password?</Link>
                        </div>
                        <div className="relative group">
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-white/20"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-purple-400" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full relative group/btn overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                        <div className="relative neon-btn neon-btn-primary py-4 mt-6 flex items-center justify-center gap-3 text-lg font-orbitron uppercase tracking-widest">
                            {loading ? 'SYCHRONIZING...' : (
                                <>
                                    <LogIn className="w-5 h-5" /> Execute Login
                                </>
                            )}
                        </div>
                    </button>
                </form>

                {/* Google OAuth — Issue #348 */}
                <GoogleAuthButton mode="login" />

                <div className="mt-6 pt-6 border-t border-white/5 text-center text-gray-400 text-sm">
                    Don't have an account? {' '}
                    <Link to="/register" className="text-purple-400 font-bold hover:text-purple-300 transition-colors inline-flex items-center gap-1 group">
                        Register Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
