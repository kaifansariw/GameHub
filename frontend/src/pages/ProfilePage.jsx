import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';
import {
    User,
    Mail,
    Calendar,
    Shield,
    LogOut,
    Settings,
    ChevronRight,
    AlertCircle,
    Activity,
    Lock
} from 'lucide-react';
import SEO from '../components/SEO/SEO';

const ProfilePage = () => {
    const { user, logout, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await api.get('profile/');
                setProfileData(response.data);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError("Could not establish neural link with profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050508]">
                <div className="relative">
                    <div className="w-24 h-24 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center font-orbitron text-[10px] text-purple-500 animate-pulse">
                        SYNCING
                    </div>
                </div>
            </div>
        );
    }

    const userData = profileData?.user || user;

    return (
        <div className="min-h-screen bg-[#050508] pt-32 pb-20 px-6 relative overflow-hidden">
            <SEO
                title={`${userData?.username || 'My'} Profile`}
                description="Manage your GameHub operative profile, credentials, and security settings."
                keywords="gamer profile, account settings, gamehub identity"
            />
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow delay-1000" />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Left Column: Identity Card */}
                    <div className="lg:col-span-1">
                        <div className="glass-panel p-8 border-white/5 bg-black/40 relative overflow-hidden group">
                            {/* Animated Background Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10 text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-purple-600 to-blue-600 p-[2px] shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                        <div className="w-full h-full rounded-[22px] bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
                                            <User className="w-16 h-16 text-purple-500" />
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-2xl border-4 border-[#0a0a0f] flex items-center justify-center shadow-lg">
                                        <Activity className="w-5 h-5 text-white animate-pulse" />
                                    </div>
                                </div>

                                <h2 className="text-3xl font-orbitron font-black text-white tracking-tighter uppercase mb-1">
                                    {userData?.username}
                                </h2>
                                <p className="text-purple-400 font-rajdhani font-bold tracking-widest text-sm uppercase mb-8">
                                    Elite Operative
                                </p>

                                <div className="space-y-3">
                                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-between px-6 transition-all group/btn">
                                        <div className="flex items-center gap-4">
                                            <Settings className="w-5 h-5 text-gray-400 group-hover/btn:text-purple-400 transition-colors" />
                                            <span className="font-orbitron text-[11px] text-gray-400 uppercase tracking-widest group-hover/btn:text-white transition-colors">Configuration</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-between px-6 transition-all group/logout"
                                    >
                                        <div className="flex items-center gap-4">
                                            <LogOut className="w-5 h-5 text-red-500/60 group-hover/logout:text-red-500 transition-colors" />
                                            <span className="font-orbitron text-[11px] text-red-500/60 uppercase tracking-widest group-hover/logout:text-red-500 transition-colors">Terminate Session</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-red-900 group-hover/logout:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Security Notice Card */}
                        <div className="mt-8 glass-panel p-6 border-white/5 bg-blue-600/5 relative overflow-hidden">
                            <div className="flex items-start gap-4">
                                <Shield className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-blue-400 font-orbitron text-xs uppercase tracking-widest font-bold mb-2">Neural Link Secure</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed font-inter">Your account is encrypted with quantum-grade protocols. Keep your private keys confidential.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Profile Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-center gap-4 text-red-400"
                            >
                                <AlertCircle className="w-6 h-6 shrink-0" />
                                <span className="font-rajdhani text-lg font-medium">{error}</span>
                            </motion.div>
                        )}

                        <div className="glass-panel p-10 border-white/5 bg-black/40 relative">
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-tighter">Account <span className="text-purple-500">Identity</span></h3>
                                    <p className="text-gray-500 font-rajdhani text-lg">Central hub for your operative credentials</p>
                                </div>
                                <div className="hidden sm:block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 font-orbitron text-[9px] uppercase tracking-[0.2em]">
                                    Level 1 Citizen
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Info Block: Full Name */}
                                <div className="space-y-3 group/item">
                                    <label className="flex items-center gap-2 text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-widest group-hover/item:text-purple-400 transition-colors">
                                        <User className="w-3.5 h-3.5" /> Full Identification
                                    </label>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 group-hover/item:border-white/20 transition-all">
                                        <div className="text-xl font-rajdhani font-bold text-white tracking-wide">
                                            {userData?.first_name} {userData?.last_name || '—'}
                                        </div>
                                    </div>
                                </div>

                                {/* Info Block: Email */}
                                <div className="space-y-3 group/item">
                                    <label className="flex items-center gap-2 text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-widest group-hover/item:text-purple-400 transition-colors">
                                        <Mail className="w-3.5 h-3.5" /> Direct Frequency (Email)
                                    </label>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 group-hover/item:border-white/20 transition-all">
                                        <div className="text-xl font-rajdhani font-bold text-white tracking-wide truncate">
                                            {userData?.email}
                                        </div>
                                    </div>
                                </div>

                                {/* Info Block: Username */}
                                <div className="space-y-3 group/item">
                                    <label className="flex items-center gap-2 text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-widest group-hover/item:text-purple-400 transition-colors">
                                        <Shield className="w-3.5 h-3.5" /> Neural ID (Username)
                                    </label>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 group-hover/item:border-white/20 transition-all">
                                        <div className="text-xl font-rajdhani font-bold text-white tracking-wide">
                                            {userData?.username}
                                        </div>
                                    </div>
                                </div>

                                {/* Info Block: Placeholder for Password */}
                                <div className="space-y-3 group/item">
                                    <label className="flex items-center gap-2 text-[10px] font-orbitron font-bold text-gray-500 uppercase tracking-widest group-hover/item:text-purple-400 transition-colors">
                                        <Lock className="w-3.5 h-3.5" /> Security Protocol
                                    </label>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 group-hover/item:border-white/20 transition-all flex items-center justify-between">
                                        <div className="text-xl font-rajdhani font-bold text-white tracking-[0.5em] pt-1">
                                            ••••••••
                                        </div>
                                        <button
                                            onClick={() => navigate('/forgot-password')}
                                            className="text-[10px] font-orbitron text-purple-400 hover:text-purple-300 transition-colors uppercase"
                                        >
                                            Modify
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap items-center gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-orbitron text-gray-500 uppercase tracking-widest">Enlisted On</p>
                                        <p className="text-sm font-rajdhani font-bold text-gray-300">Phase 1 Operative</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-orbitron text-gray-500 uppercase tracking-widest">Status</p>
                                        <p className="text-sm font-rajdhani font-bold text-gray-300">Active Duty</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProfilePage;
