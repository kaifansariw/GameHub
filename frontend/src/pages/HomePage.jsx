import React, { useEffect, useRef } from 'react';
import { useSpring, useTransform, useInView } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { games } from '../data/games';
import GameCard from '../components/GameGrid/GameCard';
import { Rocket, Info, Sparkles, ArrowRight } from 'lucide-react';
import GridScan from '../components/Backgrounds/GridScan';
import SEO from '../components/SEO/SEO';

const HomePage = () => {
    const navigate = useNavigate();

    const handleGameClick = (game) => {
        navigate(`/play/${game.id}`);
    };

    const Counter = ({ value, decimals = 0 }) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });
        const spring = useSpring(0, { duration: 2000, bounce: 0 });
        const display = useTransform(spring, (current) => current.toFixed(decimals));

        useEffect(() => {
            if (isInView) {
                spring.set(value);
            }
        }, [isInView, value, spring]);

        return <motion.span ref={ref}>{display}</motion.span>;
    };

    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title="Home"
                description="The ultimate hub for high-performance browser gaming with a cosmic neon aesthetic."
                keywords="browser games, cosmic gaming, neon arcade, free online games"
            />
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#050508]">
                    <GridScan
                        sensitivity={0.4}
                        lineThickness={1}
                        linesColor="#4f46e5"
                        scanColor="#a855f7"
                        scanOpacity={0.4}
                        gridScale={0.12}
                        enablePost={true}
                        bloomIntensity={0.6}
                        chromaticAberration={0.0008}
                        noiseIntensity={0.02}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent z-[1]" />
                </div>

                <div className="container mx-auto px-8 md:px-12 lg:px-16 relative z-10 text-center pt-12">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="flex justify-center mb-8">
                            <span className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-5 py-2 rounded-full text-[10px] font-orbitron text-purple-400 uppercase tracking-[0.3em] backdrop-blur-md">
                                <Sparkles className="w-3.5 h-3.5" /> High-Performance Gaming Platform
                            </span>
                        </div>

                        <h1 className="text-7xl md:text-9xl font-orbitron font-black mb-6 tracking-[-0.03em] leading-tight">
                            <span className="bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                GAMEHUB
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 font-rajdhani mb-10 max-w-2xl mx-auto leading-relaxed">
                            Experience zero-lag gaming in your browser. <span className="text-white font-medium">Play instant classics</span> and compete for high scores on a platform built for speed.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                onClick={() => document.getElementById('games-grid').scrollIntoView({ behavior: 'smooth' })}
                                className="neon-btn neon-btn-primary flex items-center justify-center gap-3 py-4 px-8"
                            >
                                <Rocket className="w-5 h-5" /> Start Playing
                            </button>
                            <button className="neon-btn neon-btn-secondary flex items-center justify-center gap-3 py-4 px-8">
                                <Info className="w-5 h-5" /> Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Platform Metrics Section (Premium Themed Refinement) */}
            <section className="py-28 relative overflow-hidden">
                {/* Base Layer */}
                <div className="absolute inset-0 bg-[#050508]" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

                {/* Dynamic Lighting Protocols */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 blur-[130px] rounded-full animate-pulse-slow pointer-events-none" />
                <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[130px] rounded-full animate-pulse-slow pointer-events-none" />

                {/* Tech Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:48px_48px]" />

                <div className="container mx-auto px-8 md:px-12 lg:px-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 shadow-2xl relative group/metrics"
                    >
                        {/* Industrial Detail Borders */}
                        <div className="absolute top-8 left-8 w-16 h-16 border-t-[3px] border-l-[3px] border-purple-500/20 rounded-tl-3xl group-hover/metrics:border-purple-500/50 transition-all duration-1000" />
                        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-[3px] border-r-[3px] border-blue-500/20 rounded-br-3xl group-hover/metrics:border-blue-500/50 transition-all duration-1000" />

                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none rounded-[4rem]" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24 items-center">
                            {[
                                { label: "Active Nodes", value: 24, suffix: "/7", color: "text-purple-500", glow: "from-purple-500/20", decimals: 0 },
                                { label: "Neural Sync", value: 99.9, suffix: "%", color: "text-blue-500", glow: "from-blue-500/20", decimals: 1 },
                                { label: "Active Players", value: 12.4, suffix: "K", color: "text-pink-500", glow: "from-pink-500/20", decimals: 1 },
                                { label: "Global Latency", value: 15, prefix: "<", suffix: "ms", color: "text-emerald-500", glow: "from-emerald-500/20", decimals: 0 }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.8 }}
                                    className="text-center group/stat relative"
                                >
                                    <div className="relative inline-block mb-3">
                                        {/* Dynamic Glow Aura */}
                                        <div className={`absolute inset-0 blur-3xl opacity-0 group-hover/stat:opacity-40 transition-opacity duration-700 bg-gradient-to-r ${stat.glow} to-transparent`} />

                                        <div className={`relative text-5xl md:text-6xl lg:text-7xl font-orbitron font-black ${stat.color} transition-all duration-500 group-hover/stat:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
                                            <span className="flex items-center justify-center tracking-tighter">
                                                {stat.prefix && <span className="text-2xl lg:text-3xl opacity-30 mr-1 translate-y-[-4px]">{stat.prefix}</span>}
                                                <Counter value={stat.value} decimals={stat.decimals} />
                                                <span className="text-xl md:text-2xl text-white/20 ml-1.5 font-bold tracking-normal">{stat.suffix}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-[10px] md:text-[11px] font-orbitron font-black text-white/30 uppercase tracking-[0.5em] mt-3 group-hover/stat:text-white/60 transition-colors">
                                        {stat.label}
                                    </div>

                                    {/* Intelligence Progress Bar */}
                                    <div className="w-12 h-[2px] bg-white/5 mx-auto mt-6 rounded-full overflow-hidden relative">
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            whileInView={{ x: "0%" }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.8 + (i * 0.1), duration: 1.5, ease: "easeOut" }}
                                            className={`absolute inset-0 bg-gradient-to-r from-transparent ${stat.glow.replace('from-', 'via-')} to-transparent`}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Games Grid Section */}
            <section id="games-grid" className="py-16 container mx-auto px-8 md:px-12 lg:px-16">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <h2 className="text-5xl font-orbitron font-black text-white mb-3 tracking-tighter">FEATURED <span className="text-purple-500">GAMES</span></h2>
                        <p className="text-gray-500 font-medium font-rajdhani text-lg">Curated premium titles for instant play</p>
                    </div>

                    <Link
                        to="/games"
                        className="group flex items-center gap-3 bg-purple-500/5 border border-purple-500/10 hover:border-purple-500/50 px-8 py-3.5 rounded-2xl text-purple-400/80 hover:text-white transition-all duration-500 font-orbitron text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-purple-500/0 hover:shadow-purple-500/10 backdrop-blur-md"
                    >
                        <span>Explore All Realms</span>
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-500">
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {games.slice(0, 11).map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <GameCard game={game} onClick={handleGameClick} />
                        </motion.div>
                    ))}

                    {/* The "View All" Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (Math.min(games.length, 11)) * 0.05 }}
                    >
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer relative"
                        >
                            <Link to="/games">
                                <div className="relative overflow-hidden rounded-2xl glass-panel border-white/5 bg-black/40 h-52 flex items-center justify-center hover:border-purple-500/30 transition-all duration-700 shadow-2xl hover:shadow-purple-500/10">
                                    {/* Animated Background Gradients */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-transparent to-blue-600/10 opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-purple-500/5 blur-[60px] group-hover:bg-purple-500/15 transition-all duration-700 rounded-full" />
                                    <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-500/5 blur-[60px] group-hover:bg-blue-500/15 transition-all duration-700 rounded-full" />

                                    {/* Glass Overlay Effect */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-purple-500/[0.03] to-transparent pointer-events-none" />

                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-10" />

                                    {/* Content */}
                                    <div className="relative z-10 w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center group-hover:border-purple-500/40 group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-purple-500/20">
                                        <ArrowRight className="w-8 h-8 text-white/40 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-500" />
                                    </div>

                                    {/* Professional Corner Borders */}
                                    <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/10 group-hover:border-purple-500/50 transition-all duration-500" />
                                    <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/10 group-hover:border-blue-500/50 transition-all duration-500" />
                                </div>

                                <div className="mt-4 px-1">
                                    <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-purple-400 transition-colors uppercase">
                                        View All Games
                                    </h3>
                                    <p className="text-gray-400 text-sm font-medium line-clamp-1 mt-1 uppercase tracking-wider">
                                        Discover 50+ Titles
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>



            {/* Testimonials Section */}
            <section className="py-24 bg-[#020205]/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                <div className="container mx-auto px-8 md:px-12 lg:px-16 mb-16">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-3 italic tracking-tighter uppercase">NEURAL FEEDBACK</h2>
                        <p className="text-gray-500 font-rajdhani text-lg max-w-xl mx-auto">Real-time transmissions from our global gaming community</p>
                    </div>
                </div>

                <div className="relative">
                    {/* Faded edges for premium marquee look */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex gap-8 py-4 px-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 40
                            }}
                        >
                            {[
                                {
                                    name: "Alex Rivers",
                                    role: "Elite Tier",
                                    text: "The zero-lag experience on GameHub is actually insane. I forgot I was playing in a browser. The design protocol is just the icing on the cake.",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=alex"
                                },
                                {
                                    name: "Sarah Chen",
                                    role: "Pro Streamer",
                                    text: "Finally a platform that treats browser games with respect. The leaderboard system keeps the competitive spirit alive every day!",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=sarah"
                                },
                                {
                                    name: "Marcus Thorne",
                                    role: "Speed Runner",
                                    text: "Perfect for quick sessions between work. No downloads, no hassle, just pure high-performance gaming. The new UI is stunning.",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=marcus"
                                },
                                {
                                    name: "Elena Vance",
                                    role: "Indie Dev",
                                    text: "As a developer, I'm impressed by the seamless integration and performance GameHub offers. It's the future of web gaming.",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=elena"
                                },
                                {
                                    name: "Jaxson Storm",
                                    role: "Beta Tester",
                                    text: "The Cosmic theme is a vibe. Everything feels fast, responsive and premium. Definitely my go-to hub for quick fun.",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=jax"
                                },
                                {
                                    name: "Ria Gupta",
                                    role: "Casual Gamer",
                                    text: "I love the variety of games. Whether it's Tetris or Minesweeper, the experience is always smooth and visually pleasing.",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=ria"
                                },
                                // Duplicating for seamless loop
                                {
                                    name: "Alex Rivers",
                                    role: "Elite Tier",
                                    text: "The zero-lag experience on GameHub is actually insane. I forgot I was playing in a browser. The design protocol is just the icing on the cake.",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=alex"
                                },
                                {
                                    name: "Sarah Chen",
                                    role: "Pro Streamer",
                                    text: "Finally a platform that treats browser games with respect. The leaderboard system keeps the competitive spirit alive every day!",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=sarah"
                                },
                                {
                                    name: "Marcus Thorne",
                                    role: "Speed Runner",
                                    text: "Perfect for quick sessions between work. No downloads, no hassle, just pure high-performance gaming. The new UI is stunning.",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=marcus"
                                },
                                {
                                    name: "Elena Vance",
                                    role: "Indie Dev",
                                    text: "As a developer, I'm impressed by the seamless integration and performance GameHub offers. It's the future of web gaming.",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=elena"
                                },
                                {
                                    name: "Jaxson Storm",
                                    role: "Beta Tester",
                                    text: "The Cosmic theme is a vibe. Everything feels fast, responsive and premium. Definitely my go-to hub for quick fun.",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=jax"
                                },
                                {
                                    name: "Ria Gupta",
                                    role: "Casual Gamer",
                                    text: "I love the variety of games. Whether it's Tetris or Minesweeper, the experience is always smooth and visually pleasing.",
                                    rating: 5,
                                    avatar: "https://i.pravatar.cc/150?u=ria"
                                }
                            ].map((t, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 w-[400px] bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm relative group hover:border-purple-500/30 transition-all duration-500"
                                >
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Sparkles key={i} className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
                                        ))}
                                    </div>
                                    <p className="text-gray-400 font-rajdhani text-lg mb-8 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-purple-500 blur-md opacity-0 group-hover:opacity-20 transition-opacity rounded-full" />
                                            <img src={t.avatar} alt={t.name} className="relative w-12 h-12 rounded-full border border-white/10 group-hover:border-purple-500 transition-all duration-500 object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-orbitron font-bold text-xs uppercase tracking-widest">{t.name}</h4>
                                            <p className="text-gray-600 text-[10px] font-orbitron uppercase tracking-widest mt-1">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
