import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../api/axios';
import SEO from '../components/SEO/SEO';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');
    const [devLink, setDevLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await api.post('auth/password-reset/', { email });
            setStatus('success');
            setMessage(response.data.message);
            if (response.data.dev_reset_url) {
                setDevLink(response.data.dev_reset_url);
            }
        } catch (err) {
            setStatus('error');
            setMessage(err.response?.data?.error || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            <SEO
                title="Forgot Password"
                description="Reset your GameHub account password. Enter your email to receive a secure restoration link."
                keywords="forgot password, account recovery, gamehub reset, password restoration"
            />
            {/* Background Effects */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-700" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full relative"
            >
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20"
                        >
                            <Mail className="text-4xl text-white" />
                        </motion.div>
                        <h2 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Account Recovery
                        </h2>
                        <p className="text-gray-400 mt-2 font-inter text-sm">
                            Enter your email to receive a restoration link.
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
                                <h3 className="text-xl font-orbitron text-white mb-2">Email Sent!</h3>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    {message || "If an account exists with this email, a reset link has been sent. Please check your inbox and spam folder."}
                                </p>

                                {devLink && (
                                    <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-left">
                                        <p className="text-[10px] font-orbitron text-blue-400 uppercase tracking-widest mb-2">Developer Test Link:</p>
                                        <a
                                            href={devLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-300 break-all hover:underline font-mono"
                                        >
                                            {devLink}
                                        </a>
                                        <p className="text-[9px] text-gray-500 mt-2 italic">* Click this link to go directly to password reset (Dev Only).</p>
                                    </div>
                                )}
                                <Link
                                    to="/login"
                                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors gap-2 text-sm font-medium"
                                >
                                    <ArrowLeft /> Back to Login
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
                                <div className="space-y-2">
                                    <label className="text-xs font-orbitron text-blue-400/80 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-inter"
                                            placeholder="Enter your registered email"
                                        />
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
                                    className="w-full relative py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-orbitron font-bold overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        {status === 'loading' ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Send Reset Link <Send />
                                            </>
                                        )}
                                    </span>
                                </button>

                                <div className="text-center mt-6">
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back to Login
                                    </Link>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
