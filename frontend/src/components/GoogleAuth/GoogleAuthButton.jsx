import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../api/axios';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuthButton = ({ mode = 'login' }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setAuth } = useAuthStore();
    const navigate = useNavigate();

    // This handler receives the credential (id_token) from Google One Tap / button click
    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setError('');

        try {
            // credentialResponse.credential is a Google id_token (JWT)
            // Send it directly to our Django backend for verification
            const response = await api.post('auth/google/', {
                credential: credentialResponse.credential,
            });

            const { user, access, refresh } = response.data;
            setAuth(user, access, refresh);
            navigate('/');
        } catch (err) {
            console.error('Google Auth Error:', err);
            const msg = err.response?.data?.error || 'Google authentication failed. Please try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleError = () => {
        setError('Google sign-in was cancelled or failed. Please try again.');
        setLoading(false);
    };

    return (
        <div className="w-full">
            {/* OR Divider */}
            <div className="relative my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] font-orbitron text-gray-600 uppercase tracking-[0.3em]">or</span>
                <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Error Message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs text-center mb-3 font-rajdhani"
                >
                    {error}
                </motion.p>
            )}

            {/* Google Sign-In Button — uses iframe-based flow, no popup, no COOP issues */}
            <div className={`w-full flex justify-center transition-opacity duration-300 ${loading ? 'opacity-60 pointer-events-none' : ''}`}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap={false}
                    theme="filled_black"
                    shape="rectangular"
                    size="large"
                    text={mode === 'login' ? 'signin_with' : 'signup_with'}
                    width="100%"
                    logo_alignment="left"
                />
            </div>

            {loading && (
                <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-blue-400 rounded-full animate-spin" />
                    <span className="text-gray-400 font-rajdhani text-xs">
                        {mode === 'login' ? 'Authenticating...' : 'Creating account...'}
                    </span>
                </div>
            )}

            <p className="text-center text-gray-600 text-[10px] font-rajdhani mt-3">
                {mode === 'login'
                    ? 'New here? Your account will be created automatically.'
                    : 'Already have an account? Google will link it by email.'}
            </p>
        </div>
    );
};

export default GoogleAuthButton;
