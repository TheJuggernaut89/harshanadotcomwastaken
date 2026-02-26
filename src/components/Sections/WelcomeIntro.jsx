import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, Zap, Brain, Target, Gamepad2, Trophy } from 'lucide-react';

const facts = [
    { 
        text: "Built an AI that writes 50 social posts in 2 minutes", 
        real: true,
        emoji: "⚡",
        detail: "Saved 40 hours/week for a client"
    },
    { 
        text: "Once generated 429% ROI for a cheesecake campaign", 
        real: true,
        emoji: "🧀",
        detail: "Viral TikTok trend + AI timing"
    },
    { 
        text: "Speaks fluent Python and sarcastic JavaScript", 
        real: false,
        emoji: "🐍",
        detail: "Actually speaks Manglish better than both"
    },
    { 
        text: "Reduced client costs by 95% with custom AI agents", 
        real: true,
        emoji: "💰",
        detail: "RM50K → RM2.5K monthly spend"
    },
    { 
        text: "Has never had a meeting that couldn't be an email", 
        real: false,
        emoji: "📧",
        detail: "But mamak sessions are sacred"
    },
    { 
        text: "Trained AI to predict viral content with 89% accuracy", 
        real: true,
        emoji: "🔮",
        detail: "Better than most 'marketing gurus'"
    },
    { 
        text: "Believes AI should do boring stuff, humans do fun stuff", 
        real: true,
        emoji: "🤖",
        detail: "That's why I build AI tools"
    },
    { 
        text: "Once debugged code in a dream and it worked", 
        real: false,
        emoji: "💭",
        detail: "Okay maybe twice, but who's counting"
    },
];

// Interactive Card Component - Mobile Optimized
const FactCard = ({ fact, index, isFlipped, onFlip, isShuffling }) => {
    return (
        <motion.div
            layout
            onClick={() => onFlip(index)}
            whileHover={{ scale: isShuffling ? 1 : 1.02 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                rotateY: isFlipped ? 180 : 0,
                x: isShuffling ? [0, -3, 3, -3, 3, 0] : 0,
            }}
            transition={{ 
                rotateY: { duration: 0.5 },
                x: { duration: 0.4, repeat: isShuffling ? Infinity : 0 }
            }}
            className="relative cursor-pointer perspective-1000 touch-manipulation"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Front of card */}
            <motion.div
                className={`p-3 sm:p-4 rounded-xl border-2 backdrop-blur-sm h-full min-h-[100px] sm:min-h-[120px] flex flex-col ${
                    isFlipped ? 'opacity-0' : 'opacity-100'
                } ${fact.real 
                    ? 'bg-green-500/10 border-green-500/30 active:border-green-500/60' 
                    : 'bg-purple-500/10 border-purple-500/30 active:border-purple-500/60'
                }`}
                style={{ backfaceVisibility: 'hidden' }}
            >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{fact.emoji}</div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-3">
                    {fact.text}
                </p>
                <div className="mt-auto pt-2 flex items-center gap-1">
                    <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-bold ${
                        fact.real 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-purple-500/20 text-purple-400'
                    }`}>
                        {fact.real ? '✓ REAL' : '? MAYBE'}
                    </span>
                </div>
            </motion.div>

            {/* Back of card */}
            <motion.div
                className={`absolute inset-0 p-3 sm:p-4 rounded-xl border-2 backdrop-blur-sm flex flex-col justify-center ${
                    fact.real 
                        ? 'bg-green-500/20 border-green-500' 
                        : 'bg-purple-500/20 border-purple-500'
                }`}
                style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                }}
            >
                <div className="text-2xl sm:text-3xl mb-1">{fact.real ? '🎉' : '😄'}</div>
                <p className="text-xs sm:text-sm text-white font-bold mb-1">
                    {fact.real ? '100% TRUE!' : 'PROBABLY NOT'}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-300">
                    {fact.detail}
                </p>
            </motion.div>
        </motion.div>
    );
};

// Mini Game: Click the Sparkles - Mobile Optimized
const SparkleGame = ({ onComplete }) => {
    const [sparkles, setSparkles] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [gameActive, setGameActive] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (gameActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setGameActive(false);
            onComplete(score);
        }
    }, [gameActive, timeLeft, score, onComplete]);

    useEffect(() => {
        if (!gameActive) return;

        const interval = setInterval(() => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const sparkleSize = window.innerWidth < 640 ? 48 : 40;
                const newSparkle = {
                    id: Date.now(),
                    x: Math.random() * Math.max(20, rect.width - sparkleSize - 20),
                    y: Math.random() * Math.max(20, rect.height - sparkleSize - 20),
                };
                setSparkles(prev => [...prev.slice(-4), newSparkle]);
            }
        }, 800);

        return () => clearInterval(interval);
    }, [gameActive]);

    const catchSparkle = (id) => {
        setSparkles(prev => prev.filter(s => s.id !== id));
        setScore(prev => prev + 10);
    };

    const startGame = () => {
        setGameActive(true);
        setScore(0);
        setTimeLeft(10);
        setSparkles([]);
    };

    if (!gameActive && score === 0) {
        return (
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={startGame}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-bold text-white shadow-lg shadow-orange-500/30 text-sm sm:text-base"
            >
                <Gamepad2 className="inline mr-2" size={window.innerWidth < 640 ? 16 : 18} />
                Play Mini Game (10 sec)
            </motion.button>
        );
    }

    if (!gameActive && score > 0) {
        return (
            <div className="text-center p-3 sm:p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                <Trophy className="mx-auto mb-2 text-yellow-400" size={window.innerWidth < 640 ? 28 : 32} />
                <p className="text-lg sm:text-xl font-bold text-white">Score: {score}</p>
                <p className="text-xs sm:text-sm text-gray-400 mb-3">{score >= 50 ? 'Legend!' : score >= 30 ? 'Not bad!' : 'Try again?'}</p>
                <button 
                    onClick={startGame}
                    className="text-xs sm:text-sm text-teal hover:underline px-3 py-1"
                >
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div 
            ref={containerRef}
            className="relative h-36 sm:h-48 bg-black/20 rounded-xl overflow-hidden cursor-crosshair touch-none select-none"
        >
            <div className="absolute top-2 left-2 right-2 flex justify-between text-xs sm:text-sm font-bold">
                <span className="text-yellow-400">Score: {score}</span>
                <span className="text-red-400">Time: {timeLeft}s</span>
            </div>
            <AnimatePresence>
                {sparkles.map(sparkle => (
                    <motion.div
                        key={sparkle.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => catchSparkle(sparkle.id)}
                        onTouchStart={(e) => {
                            e.preventDefault();
                            catchSparkle(sparkle.id);
                        }}
                        className="absolute w-10 h-10 sm:w-12 sm:h-12 cursor-pointer touch-manipulation"
                        style={{ left: sparkle.x, top: sparkle.y }}
                    >
                        <Sparkles className="w-full h-full text-yellow-400 animate-pulse" />
                    </motion.div>
                ))}
            </AnimatePresence>
            <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] sm:text-xs text-gray-500">
                Tap the sparkles!
            </p>
        </div>
    );
};

const WelcomeIntro = ({ onComplete }) => {
    const [showSkip, setShowSkip] = useState(false);
    const [canDismiss, setCanDismiss] = useState(false);
    const [flippedCards, setFlippedCards] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [stars, setStars] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSkip(true), 2000);
        const dismissTimer = setTimeout(() => setCanDismiss(true), 4000);
        return () => {
            clearTimeout(timer);
            clearTimeout(dismissTimer);
        };
    }, []);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Generate background stars - fewer on mobile
    useEffect(() => {
        const starCount = window.innerWidth < 768 ? 12 : 20;
        const newStars = Array.from({ length: starCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 3
        }));
        setStars(newStars);
    }, []);

    const flipCard = (index) => {
        if (!flippedCards.includes(index)) {
            setFlippedCards(prev => [...prev, index]);
        }
    };

    const shuffleCards = () => {
        setIsShuffling(true);
        setTimeout(() => setIsShuffling(false), 1000);
    };

    const allFlipped = flippedCards.length === facts.length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-dark flex flex-col items-center justify-center overflow-hidden"
            style={{ 
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)',
                paddingLeft: 'env(safe-area-inset-left)',
                paddingRight: 'env(safe-area-inset-right)'
            }}
        >
            {/* Animated background stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {stars.map(star => (
                    <motion.div
                        key={star.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: star.size,
                            height: star.size,
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3,
                            delay: star.delay,
                            repeat: Infinity,
                        }}
                    />
                ))}
                <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-teal/20 rounded-full blur-3xl" />
            </div>

            {/* Main Content - Scrollable on mobile */}
            <div className="relative z-10 w-full max-w-5xl px-3 sm:px-4 overflow-y-auto overflow-x-hidden max-h-screen py-4 sm:py-8">
                {/* Main Welcome Text */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-4 sm:mb-6"
                >
                    <motion.div 
                        className="flex items-center justify-center gap-2 mb-2 sm:mb-4"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Sparkles className="text-yellow-400" size={isMobile ? 18 : 24} />
                        <span className="text-teal text-xs sm:text-sm font-bold tracking-widest uppercase">Portfolio 2026</span>
                        <Sparkles className="text-yellow-400" size={isMobile ? 18 : 24} />
                    </motion.div>
                    
                    <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                        Welcome to<br />
                        <motion.span 
                            className="bg-gradient-to-r from-primary via-teal to-green-400 bg-clip-text text-transparent"
                            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ backgroundSize: '200% 200%' }}
                        >
                            My Brain
                        </motion.span>
                    </h1>
                    
                    <p className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto px-2">
                        A living resume that evolves while you watch
                    </p>
                </motion.div>

                {/* Interactive Facts Grid - Mobile: 2 cols, Desktop: 4 cols */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-4 sm:mb-6"
                >
                    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-gray-400">
                            Click cards to reveal the truth! 
                            <span className="ml-1 sm:ml-2 text-teal">({flippedCards.length}/{facts.length})</span>
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={shuffleCards}
                            className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-teal touch-manipulation"
                            title="Shuffle cards"
                        >
                            <Zap size={isMobile ? 14 : 16} />
                        </motion.button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                        {facts.map((fact, idx) => (
                            <FactCard
                                key={idx}
                                fact={fact}
                                index={idx}
                                isFlipped={flippedCards.includes(idx)}
                                onFlip={flipCard}
                                isShuffling={isShuffling}
                            />
                        ))}
                    </div>

                    {allFlipped && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-3 sm:mt-4 text-center"
                        >
                            <p className="text-green-400 font-bold flex items-center justify-center gap-2 text-sm sm:text-base">
                                <Trophy size={isMobile ? 16 : 18} />
                                All cards revealed! You know my secrets now 🎉
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                {/* Mini Game Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="max-w-xs sm:max-w-sm mx-auto mb-4 sm:mb-6"
                >
                    <SparkleGame onComplete={() => {}} />
                </motion.div>

                {/* What to expect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8"
                >
                    {[
                        { icon: Zap, text: 'Interactive demos', color: 'text-yellow-400' },
                        { icon: Brain, text: 'AI-powered chat', color: 'text-teal' },
                        { icon: Target, text: 'Real results', color: 'text-red-400' },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full touch-manipulation"
                        >
                            <item.icon size={isMobile ? 14 : 16} className={item.color} />
                            <span>{item.text}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    className="text-center pb-4"
                >
                    <motion.button
                        onClick={onComplete}
                        disabled={!canDismiss}
                        whileHover={canDismiss ? { scale: 1.03, boxShadow: '0 0 30px rgba(45, 212, 191, 0.5)' } : {}}
                        whileTap={canDismiss ? { scale: 0.97 } : {}}
                        className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-teal text-white rounded-full font-bold text-base sm:text-lg shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden touch-manipulation"
                    >
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-teal to-green-400"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                            {canDismiss ? 'Enter Portfolio' : 'Loading...'}
                            <motion.span
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <ArrowDown size={isMobile ? 18 : 20} />
                            </motion.span>
                        </span>
                    </motion.button>
                    
                    {showSkip && !canDismiss && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={onComplete}
                            className="block mx-auto mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 hover:text-white transition-colors touch-manipulation px-4 py-2"
                        >
                            Skip intro →
                        </motion.button>
                    )}

                    {/* Stats */}
                    <div className="mt-4 sm:mt-6 flex justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs text-gray-500">
                        <div className="text-center">
                            <div className="text-sm sm:text-lg font-bold text-teal">{flippedCards.length}</div>
                            <div>Facts Revealed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm sm:text-lg font-bold text-green-400">
                                {flippedCards.filter(i => facts[i].real).length}
                            </div>
                            <div>Real Facts</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm sm:text-lg font-bold text-purple-400">
                                {flippedCards.filter(i => !facts[i].real).length}
                            </div>
                            <div>Fake Facts</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Corner decorations - Hidden on very small screens */}
            <div className="absolute top-3 sm:top-6 left-3 sm:left-6 text-[9px] sm:text-xs text-gray-600 font-mono hidden sm:block">
                <p>v2026.02.26</p>
                <p>React + Vite + Tailwind</p>
            </div>
            <div className="absolute top-3 sm:top-6 right-3 sm:right-6 text-[9px] sm:text-xs text-gray-600 font-mono text-right hidden sm:block">
                <p>AI-Powered</p>
                <p>Gemini API</p>
            </div>
        </motion.div>
    );
};

export default WelcomeIntro;
