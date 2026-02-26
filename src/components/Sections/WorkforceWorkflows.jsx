import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Terminal, ArrowRight, Clock, Users, Zap, TrendingUp, 
    AlertCircle, CheckCircle2, HelpCircle, Sparkles, 
    ChevronRight, Play, RotateCcw, Lightbulb, Brain,
    Target, Rocket, Award
} from 'lucide-react';

// Evolution stages data - simplified and user-friendly
const evolutionStages = {
    'content-creation': [
        { stage: 0, name: 'Manual Process', icon: '👥', time: '4-6 hrs', team: '3 people', color: 'red' },
        { stage: 1, name: 'AI Assistance', icon: '🤖', time: '2 hrs', team: '2 people', color: 'orange' },
        { stage: 2, name: 'Smart Automation', icon: '⚡', time: '45 min', team: '1 person', color: 'yellow' },
        { stage: 3, name: 'Self-Improving', icon: '🧠', time: '15 min', team: '0.5 person', color: 'green' }
    ],
    'lead-generation': [
        { stage: 0, name: 'Manual Prospecting', icon: '🔍', time: '8-10 hrs', team: '2 people', color: 'red' },
        { stage: 1, name: 'AI Scoring', icon: '📊', time: '4 hrs', team: '2 people', color: 'orange' },
        { stage: 2, name: 'Auto Outreach', icon: '📧', time: '1.5 hrs', team: '1 person', color: 'yellow' },
        { stage: 3, name: 'Autonomous System', icon: '🎯', time: '15 min', team: '0.3 person', color: 'green' }
    ],
    'customer-service': [
        { stage: 0, name: 'Human Only', icon: '👤', time: '2-24 hrs', team: '3 agents', color: 'red' },
        { stage: 1, name: 'AI Triage', icon: '📋', time: '30 min', team: '2 agents', color: 'orange' },
        { stage: 2, name: 'Smart Responses', icon: '💬', time: '2 min', team: '1 agent', color: 'yellow' },
        { stage: 3, name: 'Anticipatory AI', icon: '🔮', time: '<1 min', team: '0.3 agent', color: 'green' }
    ]
};

// Stage details
const stageDetails = {
    'content-creation': {
        0: { title: 'The Old Way', desc: 'Manual brainstorming, design in Photoshop, copywriting by hand', insight: 'Teams spent 80% of time on repetitive tasks' },
        1: { title: 'AI Enters', desc: 'AI suggests topics, generates basic copy, automates resizing', insight: 'First 40% time savings with minimal effort' },
        2: { title: 'Full Automation', desc: 'AI creates complete campaigns across all platforms automatically', insight: 'One person now does the work of three' },
        3: { title: 'Living System', desc: 'AI learns from performance, self-optimizes, predicts trends', insight: 'System improves itself while you sleep' }
    },
    'lead-generation': {
        0: { title: 'Manual Prospecting', desc: 'LinkedIn searching, spreadsheet data entry, manual emails', insight: 'Sales reps spent 8+ hours weekly on repetitive outreach' },
        1: { title: 'Smart Scoring', desc: 'AI identifies high-potential prospects, prioritizes leads', insight: 'Focus on the 20% of leads that convert 80%' },
        2: { title: 'Auto Personalization', desc: 'AI writes unique emails for each prospect automatically', insight: '10x volume with 3x better response rates' },
        3: { title: 'Revenue Intelligence', desc: 'AI predicts intent, orchestrates multi-channel, self-improves', insight: '65% win rate vs 15% industry average' }
    },
    'customer-service': {
        0: { title: 'Human Bottleneck', desc: 'Wait for tickets, manual categorization, human responses only', insight: 'Customers waited hours for simple answers' },
        1: { title: 'AI Triage', desc: 'AI categorizes and routes tickets, suggests responses', insight: 'Immediate routing to right department' },
        2: { title: 'Instant Responses', desc: 'AI handles 80% of queries automatically in under 2 minutes', insight: 'Most issues resolved before human sees them' },
        3: { title: 'Predictive Support', desc: 'AI anticipates issues, reaches out before customers complain', insight: 'Zero-minute response time' }
    }
};

// Terminal content for each stage
const getTerminalContent = (workflow, stage) => {
    const contents = {
        'content-creation': {
            0: [
                { text: '$ meeting_schedule --type=brainstorm --duration=60min', type: 'cmd' },
                { text: '👥 3 team members in conference room...', type: 'info' },
                { text: '✓ Ideas collected on whiteboard', type: 'success' },
                { text: '$ open_photoshop --template=new', type: 'cmd' },
                { text: '🎨 Designer creating assets manually...', type: 'info' },
                { text: '⏱️  90 minutes elapsed', type: 'warning' },
                { text: '$ write_copy --platform=facebook', type: 'cmd' },
                { text: '📝 Copywriter drafting text...', type: 'info' },
                { text: 'Total time: 4.5 hours | Status: Exhausted 😫', type: 'result' }
            ],
            1: [
                { text: '$ ai_trends --scan=social_media', type: 'cmd' },
                { text: '🤖 Analyzing 50,000 posts...', type: 'info' },
                { text: '✓ 3 trending topics identified', type: 'success' },
                { text: '$ ai_generate --drafts=5', type: 'cmd' },
                { text: '✓ First drafts ready in 30 seconds', type: 'success' },
                { text: '$ human_review --edits=minor', type: 'cmd' },
                { text: '👤 Copywriter polishing AI drafts...', type: 'info' },
                { text: 'Total time: 2 hours | Status: Much better! 😊', type: 'result' }
            ],
            2: [
                { text: '$ campaign_init --auto=true', type: 'cmd' },
                { text: '⚡ AI analyzing brand voice...', type: 'info' },
                { text: '$ generate_multiplatform --count=15', type: 'cmd' },
                { text: '🚀 Facebook: 3 carousels created', type: 'success' },
                { text: '🚀 Instagram: 4 reels + stories created', type: 'success' },
                { text: '🚀 TikTok: 4 videos with trending audio', type: 'success' },
                { text: '$ schedule_optimal --engagement=max', type: 'cmd' },
                { text: '✓ Posted at best times automatically', type: 'success' },
                { text: 'Total time: 45 minutes | Status: Efficient! 🚀', type: 'result' }
            ],
            3: [
                { text: '$ living_pipeline --activate', type: 'cmd' },
                { text: '🧠 Self-monitoring trends 24/7...', type: 'info' },
                { text: '📈 Detected viral pattern early!', type: 'success' },
                { text: '$ auto_create --trend=viral_pattern', type: 'cmd' },
                { text: '⚡ Generated content in 2 minutes', type: 'success' },
                { text: '🎯 Micro-tested 5 variants...', type: 'info' },
                { text: '✓ Winner identified, scaled automatically', type: 'success' },
                { text: '📊 Performance: +340% engagement', type: 'success' },
                { text: 'Total time: 15 minutes | Status: Self-running! 🎆', type: 'result' }
            ]
        },
        'lead-generation': {
            0: [
                { text: '$ linkedin_search --industry=tech', type: 'cmd' },
                { text: '🔍 Manually browsing profiles...', type: 'info' },
                { text: '$ copy_paste --to=spreadsheet', type: 'cmd' },
                { text: '📝 Data entry: Name, Title, Company...', type: 'info' },
                { text: '⏱️  2 hours for 20 prospects', type: 'warning' },
                { text: '$ write_email --template=generic', type: 'cmd' },
                { text: '📧 Sent 20 identical emails...', type: 'info' },
                { text: '📉 2% response rate', type: 'error' },
                { text: 'Total time: 8 hours | Status: Burned out 🔥', type: 'result' }
            ],
            1: [
                { text: '$ ai_scan --companies=1000', type: 'cmd' },
                { text: '🤖 Finding Malaysian tech companies...', type: 'info' },
                { text: '✓ 342 companies match criteria', type: 'success' },
                { text: '$ score_prospects --model=ai', type: 'cmd' },
                { text: '📊 Analyzing engagement signals...', type: 'info' },
                { text: '✓ 89 high-priority prospects found', type: 'success' },
                { text: '👥 Sales focuses on hot leads only', type: 'success' },
                { text: 'Total time: 4 hours | Status: Focused! 🎯', type: 'result' }
            ],
            2: [
                { text: '$ enrich_data --depth=full', type: 'cmd' },
                { text: '📈 Gathering company intel...', type: 'info' },
                { text: '$ generate_outreach --personalized', type: 'cmd' },
                { text: '✓ 89 unique emails written', type: 'success' },
                { text: '🎯 Each mentions their recent news', type: 'success' },
                { text: '$ auto_sequence --days=7', type: 'cmd' },
                { text: '📧 Day 1 sent, Day 3 queued...', type: 'info' },
                { text: '📈 18% response rate (9x better!)', type: 'success' },
                { text: 'Total time: 1.5 hours | Status: Scaled! 📈', type: 'result' }
            ],
            3: [
                { text: '$ intent_ai --monitor=signals', type: 'cmd' },
                { text: '🔮 Detected: Company raised Series B', type: 'success' },
                { text: '$ auto_orchestrate --channels=5', type: 'cmd' },
                { text: '📧 Email → LinkedIn → SMS sequence', type: 'info' },
                { text: '🎯 5 agents working in parallel...', type: 'info' },
                { text: '✓ Meeting booked automatically', type: 'success' },
                { text: '📊 Win rate: 65% | Industry avg: 15%', type: 'success' },
                { text: 'Total time: 15 minutes | Status: Unstoppable! 🏆', type: 'result' }
            ]
        },
        'customer-service': {
            0: [
                { text: '$ check_inbox --manual', type: 'cmd' },
                { text: '👤 Agent reading new ticket...', type: 'info' },
                { text: '❓ Customer asking about shipping', type: 'info' },
                { text: '$ search_knowledge --query=shipping', type: 'cmd' },
                { text: '🔍 Agent browsing help articles...', type: 'info' },
                { text: '⏱️  20 minutes searching', type: 'warning' },
                { text: '$ draft_response --approval=manager', type: 'cmd' },
                { text: '⏳ Waiting for manager approval...', type: 'warning' },
                { text: 'Total time: 4 hours | Status: Customer frustrated 😤', type: 'result' }
            ],
            1: [
                { text: '$ ai_triage --activate', type: 'cmd' },
                { text: '🤖 Categorizing incoming tickets...', type: 'info' },
                { text: '✓ Shipping: 23 tickets | Refunds: 12', type: 'success' },
                { text: '$ route_smart --priority=urgent', type: 'cmd' },
                { text: '📋 Urgent issues flagged for humans', type: 'success' },
                { text: '🤖 Routine questions routed to AI', type: 'success' },
                { text: '⚡ Right ticket → Right agent instantly', type: 'success' },
                { text: 'Total time: 30 minutes | Status: Organized! 📋', type: 'result' }
            ],
            2: [
                { text: '$ ai_respond --mode=instant', type: 'cmd' },
                { text: '💬 New ticket: "Where is my order?"', type: 'info' },
                { text: '🤖 AI analyzing sentiment...', type: 'info' },
                { text: '✓ Friendly tone detected', type: 'success' },
                { text: '$ search_kb --intent=tracking', type: 'cmd' },
                { text: '✓ Answer found in 0.3 seconds', type: 'success' },
                { text: '📤 Response sent automatically', type: 'success' },
                { text: '⏱️  Total resolution: 1.8 seconds', type: 'success' },
                { text: 'Total time: 2 minutes | Status: Instant! ⚡', type: 'result' }
            ],
            3: [
                { text: '$ proactive_ai --monitor=behavior', type: 'cmd' },
                { text: '🔮 Detected: Cart abandonment pattern', type: 'success' },
                { text: '$ auto_outreach --channel=chat', type: 'cmd' },
                { text: '💬 "Having trouble with checkout?"', type: 'info' },
                { text: '✓ Customer helped before asking!', type: 'success' },
                { text: '🌧️ Weather alert: Storm in area', type: 'info' },
                { text: '📢 Proactive: "Expect shipping delays"', type: 'success' },
                { text: '❤️  CSAT: 98% | Response: <1 min', type: 'success' },
                { text: 'Total time: <1 minute | Status: Magical! ✨', type: 'result' }
            ]
        }
    };
    
    return contents[workflow][stage];
};

// Typewriter text component
const TypewriterText = ({ text, delay = 0, speed = 30, className = '' }) => {
    const [displayText, setDisplayText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayText(text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [started, text, speed]);

    return (
        <span className={className}>
            {displayText}
            {displayText.length < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="inline-block w-0.5 h-4 bg-current align-middle ml-0.5"
                />
            )}
        </span>
    );
};

// Evolution timeline component
const EvolutionTimeline = ({ workflow, currentStage, completedStage, onStageClick }) => {
    const stages = evolutionStages[workflow];
    
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                {stages.map((s, idx) => (
                    <React.Fragment key={idx}>
                        <motion.button
                            onClick={() => onStageClick(idx)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative flex flex-col items-center p-3 rounded-xl transition-all ${
                                currentStage === idx 
                                    ? 'bg-white/10 ring-2 ring-teal shadow-lg shadow-teal/20' 
                                    : completedStage >= idx
                                        ? 'bg-white/5 opacity-90'
                                        : 'bg-white/5 opacity-40'
                            }`}
                        >
                            <span className="text-2xl mb-1">{s.icon}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                s.color === 'red' ? 'text-red-400' :
                                s.color === 'orange' ? 'text-orange-400' :
                                s.color === 'yellow' ? 'text-yellow-400' :
                                'text-green-400'
                            }`}>
                                Stage {s.stage}
                            </span>
                            <span className="text-xs text-white/80 text-center leading-tight mt-1">
                                {s.name}
                            </span>
                            {completedStage >= idx && currentStage !== idx && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                    <CheckCircle2 size={12} className="text-white" />
                                </div>
                            )}
                            {currentStage === idx && (
                                <motion.div
                                    layoutId="activeStage"
                                    className="absolute -bottom-1 w-2 h-2 rounded-full bg-teal"
                                />
                            )}
                        </motion.button>
                        {idx < stages.length - 1 && (
                            <div className="flex-1 h-0.5 bg-white/10 mx-2 relative">
                                <motion.div 
                                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-teal to-green-400"
                                    initial={{ width: '0%' }}
                                    animate={{ width: completedStage > idx ? '100%' : '0%' }}
                                    transition={{ duration: 0.5 }}
                                />
                                <ChevronRight size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30" />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// Stage detail panel with typewriter effect
const StageDetail = ({ workflow, stage, isVisible, delay = 0 }) => {
    const d = stageDetails[workflow][stage];
    const colors = ['red', 'orange', 'yellow', 'green'];
    const color = colors[stage];
    
    if (!isVisible) return null;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border-l-4 ${
                color === 'red' ? 'bg-red-500/10 border-red-400' :
                color === 'orange' ? 'bg-orange-500/10 border-orange-400' :
                color === 'yellow' ? 'bg-yellow-500/10 border-yellow-400' :
                'bg-green-500/10 border-green-400'
            }`}
        >
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <Lightbulb size={16} className="text-yellow-400" />
                <TypewriterText text={d.title} delay={delay} speed={40} />
            </h4>
            <p className="text-sm text-gray-300 mb-3">
                <TypewriterText text={d.desc} delay={delay + 300} speed={25} />
            </p>
            <div className="flex items-start gap-2 text-xs">
                <Sparkles size={12} className="text-teal mt-0.5 flex-shrink-0" />
                <span className="text-teal/80 italic">
                    <TypewriterText text={d.insight} delay={delay + 800} speed={30} />
                </span>
            </div>
        </motion.div>
    );
};

// Stats panel with typewriter numbers
const StatsPanel = ({ workflow, stage, isVisible, delay = 0 }) => {
    const stages = evolutionStages[workflow];
    const current = stages[stage];
    const start = stages[0];
    
    if (!isVisible) return null;
    
    const efficiency = stage === 0 ? '0%' : stage === 1 ? '~40%' : stage === 2 ? '~85%' : '95%+';
    const aiUsage = stage === 0 ? '0%' : stage === 1 ? '30%' : stage === 2 ? '80%' : '95%';
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay / 1000 }}
            className="bg-white dark:bg-navy-dark rounded-xl p-4 border border-navy/10 dark:border-white/10"
        >
            <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Target size={14} className="text-primary" />
                <TypewriterText text="Impact Metrics" delay={delay} speed={40} />
            </h4>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Time</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 line-through">{start.time}</span>
                        <ArrowRight size={10} className="text-teal" />
                        <span className="text-sm font-bold text-teal">
                            <TypewriterText text={current.time} delay={delay + 200} speed={50} />
                        </span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Team</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{start.team}</span>
                        <ArrowRight size={10} className="text-teal" />
                        <span className="text-sm font-bold text-teal">
                            <TypewriterText text={current.team} delay={delay + 400} speed={50} />
                        </span>
                    </div>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-600">Efficiency</span>
                    <span className="text-lg font-bold text-green-500">
                        <TypewriterText text={efficiency} delay={delay + 600} speed={60} />
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

// Mode badges with typewriter
const ModeBadge = ({ stage, isVisible, delay = 0 }) => {
    if (!isVisible) return null;
    
    const modes = ['Manual', 'Assisted', 'Automated', 'Autonomous'];
    
    return (
        <div className="bg-gradient-to-br from-teal/10 to-teal/5 rounded-xl p-3 border border-teal/20">
            <Award size={16} className="text-teal mb-1" />
            <p className="text-lg font-bold text-teal">
                <TypewriterText text={modes[stage]} delay={delay} speed={50} />
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Mode</p>
        </div>
    );
};

const AIUsageBadge = ({ stage, isVisible, delay = 0 }) => {
    if (!isVisible) return null;
    
    const usage = ['0%', '30%', '80%', '95%'];
    
    return (
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-3 border border-primary/20">
            <Brain size={16} className="text-primary mb-1" />
            <p className="text-lg font-bold text-primary">
                <TypewriterText text={usage[stage]} delay={delay} speed={50} />
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">AI Usage</p>
        </div>
    );
};

const WorkforceWorkflows = () => {
    const [activeWorkflow, setActiveWorkflow] = useState('content-creation');
    const [evolutionStage, setEvolutionStage] = useState(0);
    const [completedStage, setCompletedStage] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [terminalLines, setTerminalLines] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [typingLine, setTypingLine] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const terminalRef = useRef(null);

    // Typewriter effect for terminal
    useEffect(() => {
        if (!isPlaying) return;
        
        const lines = getTerminalContent(activeWorkflow, evolutionStage);
        
        if (currentLine < lines.length) {
            const line = lines[currentLine];
            
            if (charIndex < line.text.length) {
                // Still typing current line
                const timer = setTimeout(() => {
                    setTypingLine(prev => prev + line.text[charIndex]);
                    setCharIndex(prev => prev + 1);
                }, 25);
                return () => clearTimeout(timer);
            } else {
                // Line complete, move to next
                const timer = setTimeout(() => {
                    setTerminalLines(prev => [...prev, line]);
                    setTypingLine('');
                    setCharIndex(0);
                    setCurrentLine(prev => prev + 1);
                }, line.type === 'result' ? 800 : 300);
                return () => clearTimeout(timer);
            }
        } else {
            // Stage complete
            const timer = setTimeout(() => {
                setCompletedStage(evolutionStage);
                
                if (evolutionStage < 3) {
                    // Move to next stage
                    setEvolutionStage(prev => prev + 1);
                    setCurrentLine(0);
                    setTypingLine('');
                    setCharIndex(0);
                } else {
                    // All done
                    setIsPlaying(false);
                }
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isPlaying, currentLine, charIndex, evolutionStage, activeWorkflow]);

    // Auto-scroll terminal to bottom
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [terminalLines, typingLine]);

    const handleWorkflowChange = (key) => {
        setActiveWorkflow(key);
        setEvolutionStage(0);
        setCompletedStage(-1);
        setTerminalLines([]);
        setCurrentLine(0);
        setTypingLine('');
        setCharIndex(0);
        setIsPlaying(false);
    };

    const handlePlay = () => {
        setTerminalLines([]);
        setCurrentLine(0);
        setTypingLine('');
        setCharIndex(0);
        setEvolutionStage(0);
        setCompletedStage(-1);
        setIsPlaying(true);
    };

    const handleStageClick = (stage) => {
        setEvolutionStage(stage);
        setCompletedStage(stage - 1);
        setTerminalLines(getTerminalContent(activeWorkflow, stage));
        setCurrentLine(100);
        setTypingLine('');
        setCharIndex(0);
        setIsPlaying(false);
    };

    const workflows = {
        'content-creation': {
            name: 'Content Creation',
            emoji: '🎨',
            desc: 'From manual design to self-running campaigns'
        },
        'lead-generation': {
            name: 'Lead Generation', 
            emoji: '🎯',
            desc: 'From cold calling to revenue intelligence'
        },
        'customer-service': {
            name: 'Customer Service',
            emoji: '💬',
            desc: 'From ticket queues to anticipatory support'
        }
    };

    const current = workflows[activeWorkflow];
    const stages = evolutionStages[activeWorkflow];
    const currentLines = getTerminalContent(activeWorkflow, evolutionStage);
    const currentLineData = currentLines[currentLine];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-navy/5 dark:from-navy-dark dark:to-white/5">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                        <Rocket size={16} />
                        Interactive Demo
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Workforce Transformation
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Watch how AI evolves your workflows from manual → magical in 4 stages
                    </p>
                </motion.div>

                {/* Workflow Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {Object.entries(workflows).map(([key, wf]) => (
                        <button
                            key={key}
                            onClick={() => handleWorkflowChange(key)}
                            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                                activeWorkflow === key
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                                    : 'bg-white dark:bg-navy-dark border border-navy/10 dark:border-white/10 hover:border-primary/50'
                            }`}
                        >
                            <span>{wf.emoji}</span>
                            {wf.name}
                        </button>
                    ))}
                </div>

                {/* Main Interface */}
                <div className="max-w-5xl mx-auto">
                    {/* Evolution Timeline */}
                    <EvolutionTimeline 
                        workflow={activeWorkflow}
                        currentStage={evolutionStage}
                        completedStage={completedStage}
                        onStageClick={handleStageClick}
                    />

                    <div className="grid lg:grid-cols-5 gap-6">
                        {/* Left: Terminal */}
                        <div className="lg:col-span-3">
                            <motion.div 
                                className="bg-navy-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {/* Terminal Header */}
                                <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                        </div>
                                        <Terminal size={14} className="text-white/40 ml-3" />
                                        <span className="text-xs text-white/40 font-mono">ai-workflow.exe</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-white/40">
                                            Stage {evolutionStage + 1}/4
                                        </span>
                                        <button
                                            onClick={handlePlay}
                                            disabled={isPlaying}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal text-navy-dark rounded-lg text-xs font-bold hover:bg-teal/90 transition-all disabled:opacity-50"
                                        >
                                            {isPlaying ? (
                                                <>
                                                    <div className="w-3 h-3 border-2 border-navy-dark/30 border-t-navy-dark rounded-full animate-spin" />
                                                    Running...
                                                </>
                                            ) : (
                                                <>
                                                    <Play size={12} fill="currentColor" />
                                                    Watch Evolution
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Terminal Content */}
                                <div ref={terminalRef} className="p-4 font-mono text-sm h-[320px] overflow-y-auto bg-black/20">
                                    {terminalLines.length === 0 && !isPlaying && (
                                        <div className="text-gray-500 flex items-center gap-2 h-full justify-center">
                                            <Terminal size={16} />
                                            <span>Click "Watch Evolution" to see the transformation...</span>
                                        </div>
                                    )}
                                    
                                    <AnimatePresence>
                                        {terminalLines.map((line, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="mb-2"
                                            >
                                                <span className={
                                                    line.type === 'cmd' ? 'text-primary' :
                                                    line.type === 'success' ? 'text-green-400' :
                                                    line.type === 'error' ? 'text-red-400' :
                                                    line.type === 'warning' ? 'text-yellow-400' :
                                                    line.type === 'result' ? 'text-teal font-bold' :
                                                    'text-gray-400'
                                                }>
                                                    {line.type === 'cmd' && '$ '}
                                                    {line.text}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    
                                    {/* Currently typing line */}
                                    {isPlaying && typingLine && currentLineData && (
                                        <div>
                                            <span className={
                                                currentLineData.type === 'cmd' ? 'text-primary' :
                                                currentLineData.type === 'success' ? 'text-green-400' :
                                                currentLineData.type === 'error' ? 'text-red-400' :
                                                currentLineData.type === 'warning' ? 'text-yellow-400' :
                                                currentLineData.type === 'result' ? 'text-teal font-bold' :
                                                'text-gray-400'
                                            }>
                                                {currentLineData.type === 'cmd' && '$ '}
                                                {typingLine}
                                                <motion.span
                                                    animate={{ opacity: [1, 0] }}
                                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                                    className="inline-block w-2 h-4 bg-teal align-middle ml-1"
                                                />
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Progress Bar */}
                                <div className="h-1 bg-white/5">
                                    <motion.div 
                                        className="h-full bg-gradient-to-r from-teal to-green-400"
                                        animate={{ width: `${((completedStage + 1 + (currentLine / currentLines.length)) / 4) * 100}%` }}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Stage Info - APPEARS AFTER COMPLETION */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Only show if this stage or previous is completed */}
                            <AnimatePresence mode="wait">
                                {completedStage >= evolutionStage - 1 && (
                                    <motion.div
                                        key={`stage-${evolutionStage}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        {/* Stage Detail */}
                                        <StageDetail 
                                            workflow={activeWorkflow} 
                                            stage={evolutionStage}
                                            isVisible={true}
                                            delay={completedStage >= evolutionStage ? 0 : 500}
                                        />
                                        
                                        {/* Stats Panel */}
                                        <StatsPanel 
                                            workflow={activeWorkflow}
                                            stage={evolutionStage}
                                            isVisible={true}
                                            delay={completedStage >= evolutionStage ? 300 : 800}
                                        />

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <ModeBadge 
                                                stage={evolutionStage}
                                                isVisible={true}
                                                delay={completedStage >= evolutionStage ? 600 : 1100}
                                            />
                                            <AIUsageBadge 
                                                stage={evolutionStage}
                                                isVisible={true}
                                                delay={completedStage >= evolutionStage ? 800 : 1300}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Waiting message */}
                            {completedStage < evolutionStage - 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex items-center justify-center text-gray-500"
                                >
                                    <div className="text-center">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                                            <Clock size={20} className="text-teal animate-pulse" />
                                        </div>
                                        <p className="text-sm">Watch the terminal...</p>
                                        <p className="text-xs text-gray-400 mt-1">Info appears after each stage</p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Bottom: Before/After Summary */}
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-6 border border-red-200 dark:border-red-800">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center">
                                    <span className="text-xl">😫</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-800 dark:text-red-300">Before AI</h4>
                                    <p className="text-xs text-red-600 dark:text-red-400">Manual Everything</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                                <li className="flex items-start gap-2">
                                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                                    {activeWorkflow === 'content-creation' && 'Hours of manual design work'}
                                    {activeWorkflow === 'lead-generation' && 'Cold calling, low response rates'}
                                    {activeWorkflow === 'customer-service' && 'Long wait times, frustrated customers'}
                                </li>
                                <li className="flex items-start gap-2">
                                    <Clock size={14} className="mt-0.5 flex-shrink-0" />
                                    {stages[0].time} to complete tasks
                                </li>
                                <li className="flex items-start gap-2">
                                    <Users size={14} className="mt-0.5 flex-shrink-0" />
                                    {stages[0].team} required
                                </li>
                            </ul>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                                    <span className="text-xl">🚀</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-800 dark:text-green-300">After AI</h4>
                                    <p className="text-xs text-green-600 dark:text-green-400">Fully Automated</p>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                                    {activeWorkflow === 'content-creation' && 'AI creates campaigns while you sleep'}
                                    {activeWorkflow === 'lead-generation' && '10x leads, 3x better responses'}
                                    {activeWorkflow === 'customer-service' && 'Instant responses, 98% satisfaction'}
                                </li>
                                <li className="flex items-start gap-2">
                                    <Zap size={14} className="mt-0.5 flex-shrink-0" />
                                    {stages[3].time} to complete (95% faster)
                                </li>
                                <li className="flex items-start gap-2">
                                    <TrendingUp size={14} className="mt-0.5 flex-shrink-0" />
                                    {stages[3].team} needed
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkforceWorkflows;
