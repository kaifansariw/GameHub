import React from 'react';
import { Target, Users, Zap, Shield, Rocket, Globe } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const AboutPage = () => {
    return (
        <div className="bg-[#050508] min-h-screen pt-32 pb-20 overflow-hidden">
            <SEO
                title="Our Story"
                description="Learn about GameHub - our mission to bring zero-lag, high-performance browser gaming to everyone, everywhere."
                keywords="about gamehub, gaming company, cosmic gaming platform, browser gaming community"
            />
            {/* Background Glows */}
            <div className="fixed top-1/4 -left-20 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-8 md:px-12 lg:px-16 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-orbitron font-black text-white mb-6 uppercase tracking-[-0.04em]"
                    >
                        OUR <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">STORY</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 font-rajdhani text-xl max-w-3xl mx-auto leading-relaxed"
                    >
                        GameHub was born from a simple idea: that high-quality gaming should be accessible to everyone, instantly, right in the browser. No downloads, no waiting, just pure play.
                    </motion.p>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {[
                        {
                            icon: Zap,
                            title: "Performance First",
                            desc: "We optimize every line of code to ensure the lowest latency and highest frame rates for every game in our library.",
                            color: "text-yellow-400"
                        },
                        {
                            icon: Users,
                            title: "Community Driven",
                            desc: "Our platform is built by gamers, for gamers. We listen to our players and evolve based on what the community wants.",
                            color: "text-blue-400"
                        },
                        {
                            icon: Shield,
                            title: "Safe & Secure",
                            desc: "Your data and privacy are paramount. We use industry-standard encryption to keep your gaming profiles protected.",
                            color: "text-green-400"
                        }
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md group hover:border-purple-500/50 transition-all duration-500"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform ${value.color}`}>
                                <value.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-white font-orbitron font-bold text-xl mb-4 uppercase tracking-wider">{value.title}</h3>
                            <p className="text-gray-500 font-rajdhani text-lg leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Vision Section */}
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/5 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full" />

                    <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white leading-tight">THE FUTURE OF <br /><span className="text-purple-500">PLAY IS HERE.</span></h2>
                            <p className="text-gray-400 font-rajdhani text-xl leading-relaxed">
                                We are building more than just a games portal. We are creating a global ecosystem where developers can showcase their talent and players can find their next favorite obsession in seconds.
                            </p>
                            <div className="flex flex-wrap gap-8">
                                <div className="flex items-center gap-3">
                                    <Globe className="text-purple-400 w-5 h-5" />
                                    <span className="text-white font-orbitron text-xs uppercase tracking-widest">Global Servers</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Rocket className="text-pink-400 w-5 h-5" />
                                    <span className="text-white font-orbitron text-xs uppercase tracking-widest">Instant Launching</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full flex justify-center lg:justify-end">
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-500 blur-[80px] opacity-20" />
                                <Target className="w-64 h-64 md:w-80 md:h-80 text-white/10 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
