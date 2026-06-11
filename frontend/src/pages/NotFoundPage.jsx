import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO/SEO';

const NotFoundPage = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-[#050508] pt-32 pb-20 px-6 relative overflow-hidden">
            <SEO
                title="Page Not Found"
                description="The route you tried to open does not exist in GameHub."
                keywords="GameHub 404, page not found, unknown route"
            />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-24 left-1/4 w-[32rem] h-[32rem] rounded-full bg-purple-600/10 blur-[120px]" />
                <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] rounded-full bg-blue-600/10 blur-[120px]" />
            </div>

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-[10px] font-orbitron uppercase tracking-[0.3em] mb-8">
                        404
                    </div>

                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white uppercase tracking-tighter mb-4">
                            Page <span className="text-purple-500">Not Found</span>
                        </h1>

                        <p className="text-gray-400 text-lg md:text-xl font-rajdhani leading-relaxed mb-8">
                            The route <span className="text-white font-semibold break-all">{location.pathname}</span> does not exist in this build.
                            Let’s get you back to a valid surface.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-orbitron font-black text-[10px] uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-colors"
                            >
                                Return Home
                            </Link>
                            <Link
                                to="/games"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-orbitron font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors"
                            >
                                Browse Games
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
