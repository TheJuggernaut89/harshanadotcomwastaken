import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coffee, Zap, Code, TrendingUp } from 'lucide-react';

const MalaysianIntro = ({ onComplete }) => {
    const [currentScene, setCurrentScene] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [displayedText, setDisplayedText] = useState('');

    const scenes = [
        {
            text: "Eh hello! Welcome lah. You're looking for a social media manager, is it?",
            icon: <Coffee size={40} />,
            color: 'from-amber-500 to-orange-600',
            delay: 60
        },
        {
            text: "Wait wait, don't scroll yet. I'm not your typical SMM who only knows how to post nice-nice pictures and write \"Monday Blues 😴\" captions.",
            icon: <Zap size={40} />,
            color: 'from-purple-500 to-pink-600',
            delay: 50
        },
        {
            text: "I'm the guy who built AI tools, coded automation systems, AND delivered 429% Facebook growth. Ya lah, that 4-2-9 number, not typo.",
            icon: <TrendingUp size={40} />,
            color: 'from-teal to-blue-600',
            delay: 50
        },
        {
            text: "Most marketers can't code. Most coders dunno marketing. I bridge that gap lah... like how roti canai bridges breakfast and lunch.",
            icon: <Code size={40} />,
            color: 'from-primary to-red-600',
            delay: 55
        },
        {
            text: "Okay okay, enough talking cock. Let me show you what I actually built. If after that you still want someone who just knows Canva and \"engagement pods\", wrong website bro.",
            icon: <Coffee size={40} />,
            color: 'from-blue-500 to-purple-600',
            delay: 50
        }
    ];

    const currentSceneData = scenes[currentScene];

    // Typing effect
    useEffect(() => {
        if (!currentSceneData) return;

        setIsTyping(true);
        setDisplayedText('');
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex <= currentSceneData.text.length) {
                setDisplayedText(currentSceneData.text.slice(0, currentIndex));
                currentIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);
                
                // Auto-advance after typing completes
                if (currentScene < scenes.length - 1) {
                    setTimeout(() => {
                        setCurrentScene(prev => prev + 1);
                    }, 2000);
                } else {
                    // End of scenes
                    setTimeout(() => {
                        onComplete();
                    }, 2500);
                }
            }
        }, currentSceneData.delay);

        return () => clearInterval(typingInterval);
    }, [currentScene, currentSceneData, onComplete, scenes.length]);

    const handleSkip = () => {
        onComplete();
    };

    const handleNext = () => {
        if (currentScene < scenes.length - 1) {
            setCurrentScene(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-navy-dark via-navy to-navy-dark"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, #E63946 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                {/* Skip Button */}
                <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleSkip}
                    className="absolute top-8 right-8 flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white font-bold transition-all group z-50"
                >
                    <span className="text-sm">Skip lah</span>
                    <X size={18} className="group-hover:rotate-90 transition-transform" />
                </motion.button>

                {/* Progress Dots */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                    {scenes.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all ${
                                idx === currentScene
                                    ? 'w-12 bg-primary'
                                    : idx < currentScene
                                    ? 'w-6 bg-teal'
                                    : 'w-6 bg-white/20'
                            }`}
                        />
                    ))}
                </div>

                {/* Main Content */}
                <motion.div
                    key={currentScene}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="max-w-4xl mx-auto px-6 text-center relative z-10"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className={`w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br ${currentSceneData.color} flex items-center justify-center text-white shadow-2xl`}
                    >
                        {currentSceneData.icon}
                    </motion.div>

                    {/* Text */}
                    <div className="relative min-h-[200px] flex items-center justify-center">
                        <motion.p
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-relaxed"
                        >
                            {displayedText}
                            {isTyping && (
                                <motion.span
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-1 h-10 bg-primary ml-2 align-middle"
                                />
                            )}
                        </motion.p>
                    </div>

                    {/* Next Button (appears when typing done) */}
                    {!isTyping && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={handleNext}
                            className="mt-12 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                        >
                            {currentScene < scenes.length - 1 ? 'Okay, continue...' : 'Show me what you got 🚀'}
                        </motion.button>
                    )}
                </motion.div>

                {/* Bottom Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm"
                >
                    Scene {currentScene + 1} of {scenes.length}
                </motion.div>

                {/* Particle Effects */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                            animate={{
                                y: [0, Math.random() * 200 - 100],
                                opacity: [0, 0.8, 0]
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MalaysianIntro;
