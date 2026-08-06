import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { UserPlus, User, Mail, Lock, Gamepad2, AlertCircle, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import SEO from '../components/SEO/SEO';
import GoogleAuthButton from '../components/GoogleAuth/GoogleAuthButton';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            // Mapping frontend confirmPassword to password2 for backend compatibility
            const apiData = {
                ...formData,
                password1: formData.password,
                password2: formData.confirmPassword
            };
            const response = await api.post('auth/register/', apiData);

            // Auto login after registration if backend returns tokens, 
            // otherwise redirect to login
            if (response.data.access) {
                const { user, access, refresh } = response.data;
                setAuth(user, access, refresh);
                navigate('/');
            } else {
                navigate('/login', { state: { message: 'Registration successful! Please login.' } });
            }
        } catch (err) {
            console.error('Registration Error:', err);
            const errorMsg = err.response?.data?.error || err.response?.data?.detail || 'Registration failed. Try a different username/email.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-[#050508] relative overflow-x-hidden overflow-y-auto">
            <SEO
                title="Register"
                description="Join the GameHub network and create your operative profile. Get access to 50+ browser games and the global leaderboard."
                keywords="gamehub register, create account, join gaming platform, sign up"
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
                className="w-full max-w-2xl glass-panel p-10 border-white/5 bg-black/40 relative z-10 shadow-2xl"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center mb-8 mx-auto shadow-xl group-hover:border-purple-500/40 transform rotate-3 transition-all duration-700">
                        <UserPlus className="text-purple-500 w-10 h-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    </div>
                    <h1 className="text-4xl font-orbitron font-black text-white mb-3 tracking-tighter uppercase leading-none">
                        JOIN <span className="text-purple-500">NETWORK</span>
                    </h1>
                    <p className="text-gray-500 font-rajdhani text-lg">Create your professional gaming profile</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm mb-8"
                    >
                        <AlertCircle className="w-5 h-5" /> {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Full Name Section */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest pl-1">First Name</label>
                        <input
                            type="text"
                            required
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="Vishwa"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest pl-1">Last Name</label>
                        <input
                            type="text"
                            required
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="Gamer"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest pl-1">Username</label>
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border-white/10"
                                placeholder="vishwa_pro"
                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-purple-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                        <div className="relative group">
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border-white/10"
                                placeholder="gamer@example.com"
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-purple-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest pl-1">Password</label>
                        <div className="relative group">
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border-white/10"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-purple-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-orbitron font-bold text-gray-400 uppercase tracking-widest pl-1">Confirm Password</label>
                        <div className="relative group">
                            <input
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 pl-12 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all border-white/10"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-purple-400" />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group/btn overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                            <div className="relative neon-btn neon-btn-primary py-4 mt-4 flex items-center justify-center gap-3 text-lg font-orbitron uppercase tracking-widest">
                                {loading ? 'INITIALIZING...' : (
                                    <>
                                        <Gamepad2 className="w-5 h-5" /> Let's GO!
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </form>

                {/* Google OAuth — Issue #348 */}
                <GoogleAuthButton mode="register" />

                <div className="mt-6 pt-6 border-t border-white/5 text-center text-gray-400 text-sm">
                    Already have an account? {' '}
                    <Link to="/login" className="text-purple-400 font-bold hover:text-purple-300 transition-colors inline-flex items-center gap-1 group">
                        Login Now
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
