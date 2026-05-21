import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Lock, CheckCircle, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import api from '../api/axios';
import SEO from '../components/SEO/SEO';

const ResetPassword = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setStatus('error');
            setMessage('Passwords do not match.');
            return;
        }

        setStatus('loading');

        try {
            await api.post('auth/password-reset-confirm/', {
                uid,
                token,
                password
            });
            setStatus('success');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.error || 'Invalid or expired reset link. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            <SEO
                title="Reset Password"
                description="Set a new password for your GameHub account using your secure reset link."
                keywords="reset password, new password, gamehub security, account update"
            />
            {/* Background Effects */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse delay-700" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full relative"
            >
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ rotate: -10, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            className="w-20 h-20 bg-gradient-to-tr from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20"
                        >
                            <Shield className="text-4xl text-white" />
                        </motion.div>
                        <h2 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            New Password
                        </h2>
                        <p className="text-gray-400 mt-2 font-inter text-sm">
                            Configure your new security credentials.
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-6"
                            >
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                    <CheckCircle className="text-3xl text-green-500" />
                                </div>
                                <h3 className="text-xl font-orbitron text-white mb-2">Success!</h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    Your password has been updated. Redirecting to login...
                                </p>
                                <Link
                                    to="/login"
                                    className="bg-white/5 hover:bg-white/10 px-6 py-2 rounded-full text-white text-sm transition-colors border border-white/10"
                                >
                                    Login Now
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-orbitron text-purple-400/80 uppercase tracking-widest ml-1">New Password</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="text-gray-500 w-5 h-5 transition-colors group-focus-within:text-purple-400" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-inter"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-orbitron text-purple-400/80 uppercase tracking-widest ml-1">Confirm Password</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="text-gray-500 w-5 h-5 transition-colors group-focus-within:text-purple-400" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-inter"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm flex items-center gap-3"
                                    >
                                        <AlertCircle className="shrink-0" />
                                        <span>{message}</span>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full relative py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-orbitron font-bold overflow-hidden group disabled:opacity-50 transition-all active:scale-[0.98] shadow-lg shadow-purple-600/20"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        {status === 'loading' ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Update Credentials <ArrowRight />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
