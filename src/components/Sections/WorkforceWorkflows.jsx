import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Clock, Users, Zap, TrendingUp, 
    AlertCircle, CheckCircle2, Sparkles, 
    Play, RotateCcw, Target, Terminal
} from 'lucide-react';
import { StepByStepTerminal } from '../UI/KineticLogStream';

// Evolution stages with terminal logs
const evolutionStages = {
    'content-creation': [
        { stage: 0, name: 'Manual', time: '4-6 hrs', team: '3 people', efficiency: '20%' },
        { stage: 1, name: 'AI Help', time: '2 hrs', team: '2 people', efficiency: '50%' },
        { stage: 2, name: 'Auto', time: '45 min', team: '1 person', efficiency: '80%' },
        { stage: 3, name: 'Smart', time: '15 min', team: '0.5 person', efficiency: '95%' }
    ],
    'lead-generation': [
        { stage: 0, name: 'Manual', time: '8-10 hrs', team: '2 people', efficiency: '15%' },
        { stage: 1, name: 'AI Help', time: '4 hrs', team: '2 people', efficiency: '40%' },
        { stage: 2, name: 'Auto', time: '1.5 hrs', team: '1 person', efficiency: '70%' },
        { stage: 3, name: 'Smart', time: '15 min', team: '0.3 person', efficiency: '95%' }
    ],
    'customer-service': [
        { stage: 0, name: 'Manual', time: '2-24 hrs', team: '3 agents', efficiency: '25%' },
        { stage: 1, name: 'AI Help', time: '30 min', team: '2 agents', efficiency: '55%' },
        { stage: 2, name: 'Auto', time: '2 min', team: '1 agent', efficiency: '85%' },
        { stage: 3, name: 'Smart', time: '<1 min', team: '0.3 agent', efficiency: '98%' }
    ]
};

// Terminal step logs for each workflow
const workflowLogs = {
    'content-creation': [
        { message: 'Initializing content pipeline...', type: 'INFO', delay: 500 },
        { message: 'Analyzing brand guidelines...', type: 'PROCESS', delay: 1500 },
        { message: 'Generating Manglish variants...', type: 'PROCESS', delay: 3000 },
        { message: 'Running viral prediction model...', type: 'PROCESS', delay: 4500 },
        { message: 'Content package ready for publishing', type: 'SUCCESS', delay: 6000 },
    ],
    'lead-generation': [
        { message: 'Initializing lead scraper...', type: 'INFO', delay: 500 },
        { message: 'Scanning social media for prospects...', type: 'PROCESS', delay: 1500 },
        { message: 'Scoring leads with AI model...', type: 'PROCESS', delay: 3000 },
        { message: 'Enriching contact data...', type: 'PROCESS', delay: 4500 },
        { message: 'High-quality leads exported to CRM', type: 'SUCCESS', delay: 6000 },
    ],
    'customer-service': [
        { message: 'Initializing support agent...', type: 'INFO', delay: 500 },
        { message: 'Analyzing customer query...', type: 'PROCESS', delay: 1500 },
        { message: 'Searching knowledge base...', type: 'PROCESS', delay: 2500 },
        { message: 'Generating personalized response...', type: 'PROCESS', delay: 3500 },
        { message: 'Response sent - Ticket resolved', type: 'SUCCESS', delay: 4500 },
    ],
};

// Realistic typewriter hook with human-like delays
const useRealisticTypewriter = (text, isActive, baseSpeed = 40) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const indexRef = useRef(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!isActive) {
            setDisplayText('');
            setIsComplete(false);
            indexRef.current = 0;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            return;
        }

        const typeNextChar = () => {
            if (indexRef.current < text.length) {
                setDisplayText(text.slice(0, indexRef.current + 1));
                indexRef.current++;
                
                // Variable typing speed for realism
                const char = text[indexRef.current - 1];
                let delay = baseSpeed;
                
                // Pause longer after punctuation
                if ('.!?'.includes(char)) delay = baseSpeed * 8;
                else if (',;'.includes(char)) delay = baseSpeed * 4;
                // Slight variation for natural feel
                else delay = baseSpeed + (Math.random() * 30 - 15);
                
                timeoutRef.current = setTimeout(typeNextChar, delay);
            } else {
                setIsComplete(true);
            }
        };

        typeNextChar();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [text, isActive, baseSpeed]);

    return { displayText, isComplete };
};

// Animated number with realistic counting
const AnimatedNumber = ({ value, suffix = '', isActive, delay = 0 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    
    useEffect(() => {
        if (!isActive) {
            setDisplayValue(0);
            return;
        }
        
        const timer = setTimeout(() => {
            const numericValue = parseInt(value.toString().replace(/\D/g, ''));
            const duration = 800;
            const steps = 20;
            const increment = numericValue / steps;
            let current = 0;
            let step = 0;
            
            const interval = setInterval(() => {
                step++;
                current = Math.min(Math.round(increment * step), numericValue);
                setDisplayValue(current);
                
                if (step >= steps) {
                    clearInterval(interval);
                    setDisplayValue(numericValue);
                }
            }, duration / steps);
            
            return () => clearInterval(interval);
        }, delay);
        
        return () => clearTimeout(timer);
    }, [value, isActive, delay]);
    
    return <span>{displayValue}{suffix}</span>;
};

const WorkforceWorkflows = () => {
    const [activeWorkflow, setActiveWorkflow] = useState('content-creation');
    const [currentStage, setCurrentStage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [terminalKey, setTerminalKey] = useState(0);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const workflows = {
        'content-creation': {
            name: 'Content',
            emoji: '🎨',
            desc: 'From manual posts to AI-powered campaigns'
        },
        'lead-generation': {
            name: 'Leads', 
            emoji: '🎯',
            desc: 'From cold calling to smart lead scoring'
        },
        'customer-service': {
            name: 'Support',
            emoji: '💬',
            desc: 'From ticket queues to instant AI responses'
        }
    };

    const stages = evolutionStages[activeWorkflow];
    const current = workflows[activeWorkflow];

    // Auto-play stages
    useEffect(() => {
        if (!isPlaying) return;
        
        if (currentStage < 3) {
            const timer = setTimeout(() => {
                setCurrentStage(prev => prev + 1);
            }, 2500);
            return () => clearTimeout(timer);
        } else {
            setShowResults(true);
            setIsPlaying(false);
        }
    }, [isPlaying, currentStage]);

    const handlePlay = () => {
        setCurrentStage(0);
        setShowResults(false);
        setIsPlaying(true);
        setTerminalKey(prev => prev + 1); // Reset terminal
    };

    const handleWorkflowChange = (key) => {
        setActiveWorkflow(key);
        setCurrentStage(0);
        setShowResults(false);
        setIsPlaying(false);
        setTerminalKey(prev => prev + 1);
    };

    return (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-navy/5 dark:from-navy-dark dark:to-white/5 overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-10 sm:mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold mb-4">
                        <Zap size={14} />
                        AI Transformation
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                        Work <span className="text-primary">Smarter</span>, Not Harder
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Watch how AI transforms your daily work in 4 simple stages
                    </p>
                </motion.div>

                {/* Workflow Selector */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
                    {Object.entries(workflows).map(([key, wf]) => (
                        <button
                            key={key}
                            onClick={() => handleWorkflowChange(key)}
                            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                                activeWorkflow === key
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'bg-white dark:bg-navy-dark border border-navy/10 dark:border-white/10 hover:border-primary/50'
                            }`}
                        >
                            <span>{wf.emoji}</span>
                            {wf.name}
                        </button>
                    ))}
                </div>

                {/* Main Interface */}
                <div className="max-w-3xl mx-auto">
                    {/* Stage Progress */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            {stages.map((s, idx) => (
                                <React.Fragment key={idx}>
                                    <motion.button
                                        onClick={() => {
                                            setCurrentStage(idx);
                                            setShowResults(idx === 3);
                                            setIsPlaying(false);
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative flex flex-col items-center p-2 sm:p-3 rounded-xl transition-all ${
                                            currentStage === idx 
                                                ? 'bg-primary/10 ring-2 ring-primary' 
                                                : currentStage > idx
                                                    ? 'bg-green-500/10 opacity-100'
                                                    : 'bg-gray-100 dark:bg-white/5 opacity-50'
                                        }`}
                                    >
                                        <span className={`text-xs sm:text-sm font-bold mb-1 ${
                                            currentStage >= idx ? 'text-primary' : 'text-gray-400'
                                        }`}>
                                            Stage {s.stage + 1}
                                        </span>
                                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center">
                                            {s.name}
                                        </span>
                                        {currentStage > idx && (
                                            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 flex items-center justify-center">
                                                <CheckCircle2 size={10} className="text-white" />
                                            </div>
                                        )}
                                    </motion.button>
                                    {idx < stages.length - 1 && (
                                        <div className="flex-1 h-0.5 bg-gray-200 dark:bg-white/10 mx-1 sm:mx-2 relative">
                                            <motion.div 
                                                className="absolute left-0 top-0 h-full bg-primary"
                                                initial={{ width: '0%' }}
                                                animate={{ width: currentStage > idx ? '100%' : '0%' }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Current Stage Display */}
                    <motion.div
                        key={`${activeWorkflow}-${currentStage}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-navy-dark rounded-2xl p-5 sm:p-6 shadow-lg border border-navy/10 dark:border-white/10 mb-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold">
                                    Stage {currentStage + 1}: {stages[currentStage].name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {current.desc}
                                </p>
                            </div>
                            <button
                                onClick={handlePlay}
                                disabled={isPlaying}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
                            >
                                {isPlaying ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Running...
                                    </>
                                ) : (
                                    <>
                                        <Play size={14} fill="currentColor" />
                                        Play Demo
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                                <Clock size={16} className="text-primary mx-auto mb-2" />
                                <p className="text-xs text-gray-500 mb-1">Time</p>
                                <p className="text-sm sm:text-base font-bold text-primary">
                                    {stages[currentStage].time}
                                </p>
                            </div>
                            <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                                <Users size={16} className="text-primary mx-auto mb-2" />
                                <p className="text-xs text-gray-500 mb-1">People</p>
                                <p className="text-sm sm:text-base font-bold text-primary">
                                    {stages[currentStage].team}
                                </p>
                            </div>
                            <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                                <Target size={16} className="text-green-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500 mb-1">Efficiency</p>
                                <p className="text-sm sm:text-base font-bold text-green-500">
                                    {stages[currentStage].efficiency}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile: Terminal Log Stream / Desktop: Stats Summary */}
                    {isMobile ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-6"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <Terminal size={16} className="text-teal" />
                                <h4 className="font-bold text-sm text-white">Live Process Log</h4>
                            </div>
                            <StepByStepTerminal 
                                key={terminalKey}
                                steps={workflowLogs[activeWorkflow]}
                                height="200px"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-3 gap-4 mt-6"
                        >
                            {stages.map((s, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`p-4 rounded-xl border ${
                                        idx <= currentStage 
                                            ? 'bg-primary/10 border-primary/30' 
                                            : 'bg-white/5 border-white/10'
                                    }`}
                                >
                                    <p className="text-xs text-gray-500 mb-1">Stage {idx + 1}</p>
                                    <p className="font-bold text-sm mb-2">{s.name}</p>
                                    <div className="space-y-1 text-xs">
                                        <p className="text-primary">{s.time}</p>
                                        <p className="text-gray-400">{s.team}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default WorkforceWorkflows;
