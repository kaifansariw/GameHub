import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Cpu, Shield, Zap, Globe, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO/SEO';

const FAQItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-6 rounded-2xl border transition-all duration-500 flex items-center justify-between text-left group backdrop-blur-xl ${isOpen
                    ? 'bg-purple-500/10 border-purple-500/30'
                    : 'bg-white/5 border-white/10 hover:border-purple-500/20'
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-colors ${isOpen ? 'bg-purple-500 text-white' : 'bg-white/5 text-purple-400 group-hover:text-purple-300'}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-orbitron font-bold text-sm md:text-base text-white uppercase tracking-tight">
                        {question}
                    </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-500 ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-8 pb-10 text-gray-400 font-rajdhani text-lg leading-relaxed border-x border-b border-purple-500/10 rounded-b-2xl mx-1 bg-purple-500/5">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQPage = () => {
    const faqs = [
        {
            icon: Zap,
            question: "How do I initialize the neural link (login)?",
            answer: "To initialize your session, navigate to the LOGIN terminal. Enter your pilot credentials or register a new identity node. Once verified, you'll receive a JWT token that maintains your link across the GameHub cluster."
        },
        {
            icon: Shield,
            question: "Is my gameplay data secure within the core?",
            answer: "Absolutely. All telemetry data, high scores, and profile configurations are shielded behind our multi-layer encryption array. We use decentralized authentication protocols to ensure your digital identity remains anonymous and uncompromised."
        },
        {
            icon: Cpu,
            question: "What hardware terminal is recommended?",
            answer: "GameHub is optimized for high-performance browser engines (Chrome, Firefox, Brave). We recommend a terminal with at least 4GB RAM and a hardware-accelerated GPU for full cosmic fidelity. Low-latency fiber links are preferred."
        },
        {
            icon: Globe,
            question: "Are individual games stored locally or streamed?",
            answer: "Our engine uses a hybrid caching system. Core assets are initialised on your first load and stored in the 'Terminal Cache'. Subsequent deployments are near-instant as the framework pulls from your local system memory."
        },
        {
            icon: MessageSquare,
            question: "How do I report a glitch in the mainframe?",
            answer: "If you encounter a systemic anomaly (bug), please report it via the 'Contact Core' terminal or open a diagnostic ticket on our GitHub repository. Our maintenance droids are dispatched 24/7."
        }
    ];

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-[#050508] relative overflow-hidden font-rajdhani">
            <SEO
                title="FAQ"
                description="Find answers to frequently asked questions about GameHub - from account setup to gameplay tips and platform performance."
                keywords="gamehub faq, help, how to play, gaming questions, browser game support"
            />
            {/* Cosmic Background Elements */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-3xl relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-orbitron uppercase tracking-widest mb-6"
                    >
                        <HelpCircle className="w-3 h-3" />
                        Intelligence Matrix
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6 uppercase tracking-[-0.05em]">
                        Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-black">QUEST</span>
                    </h1>
                    <p className="text-gray-400 text-xl max-w-xl mx-auto leading-relaxed">
                        Frequently asked transmissions for pilots exploring the GameHub cluster.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} {...faq} index={i} />
                    ))}
                </div>

                {/* Closing Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 p-10 text-center rounded-3xl border border-white/5 bg-gradient-to-b from-transparent to-purple-900/10"
                >
                    <h2 className="text-xl font-orbitron font-black text-white/50 mb-4 uppercase tracking-[0.3em]">Still Confused?</h2>
                    <p className="text-gray-500 text-sm max-w-md mx-auto italic leading-relaxed mb-8">
                        Our intelligence nodes are always open for direct transmissions. Reach out via the secure contact frequency.
                    </p>
                    <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-orbitron font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        Initialize Contact Node
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQPage;
