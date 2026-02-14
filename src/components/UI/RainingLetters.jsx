import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// PHASE 1 & 2: FALLOUT CONSOLE (Unified)
// ==========================================
const TypewriterConsole = React.memo(({ onComplete }) => {
    // Internal Phase: 'LOG' -> 'SECURITY'
    const [internalPhase, setInternalPhase] = useState('LOG');

    // Log State
    const [lines, setLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isLoadingBar, setIsLoadingBar] = useState(false);
    const scrollRef = useRef(null);

    // Security State
    const [securityStatus, setSecurityStatus] = useState('INITIALIZING');
    const [decodedPass, setDecodedPass] = useState('');
    const [securityProgress, setSecurityProgress] = useState(0);

    // Calculate key ONCE on mount using lazy state for stability
    const [targetKey] = useState(() => {
        const passwordList = [
            'MAKKAUHIJAU',
            'BOJIO',
            'ABUDEN',
            'POTONGSTIM',
            'SYOKSENDIRI',
            'KAUTIM',
            'MANTAP'
        ];
        const randomPass = passwordList[Math.floor(Math.random() * passwordList.length)];
        return `ACCESS_KEY: ${randomPass}`;
    });

    // Auto-scroll for Log
    useEffect(() => {
        if (internalPhase === 'LOG' && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines, currentText, internalPhase]);

    const consoleLines = [
        '┌─────────────────────────────────────────────┐',
        '│  RESUME LOADER v2.0 - HARSHANA JOTHI       │',
        '│  Marketing Technologist Interactive CV     │',
        '└─────────────────────────────────────────────┘',
        '',
        '> Loading candidate profile...',
        '> Parsing 7 years of experience...',
        '> Extracting key achievements...',
        '',
        '[!] NOTICE: Traditional PDF format rejected',
        '[!] Reason: Too boring for this skillset',
        '',
        '> Converting to interactive experience...',
        'LOADING_BAR',
        '',
        '╔═══════════════════════════════════════════╗',
        '║  CANDIDATE: HARSHANA JOTHI                ║',
        '║  POSITION: MARKETING TECHNOLOGIST         ║',
        '║  LOCATION: DAMANSARA PERDANA, MALAYSIA    ║',
        '╚═══════════════════════════════════════════╝',
        '',
        '  📈 PROVEN TRACK RECORD:',
        '',
        '  Facebook Growth ─────── 429% increase',
        '  Instagram Growth ────── 178% increase',
        '  AI Tools Developed ──── 6 custom systems',
        '  Agency Costs Saved ──── RM 10-45K/year',
        '  Roles Combined ──────── 3-in-1 value',
        '  Platforms Managed ───── 5+ simultaneous',
        '  Work Ethic ──────────── Caffeine-fueled',
        '',
        '┌─────────────────────────────────────────────┐',
        '│ 💼 CORE COMPETENCIES                        │',
        '├─────────────────────────────────────────────┤',
        '│ Marketing Strategy    [■■■■■■■■■■] Expert  │',
        '│ Technical Execution   [■■■■■■■■■■] Expert  │',
        '│ Creative Production   [■■■■■■■■■■] Expert  │',
        '│ Problem Solving       [■■■■■■■■■■] Expert  │',
        '│ System Building       [■■■■■■■■■■] Expert  │',
        '└─────────────────────────────────────────────┘',
        '',
        '┌─────────────────────────────────────────────┐',
        '│ 💵 COST-BENEFIT ANALYSIS                    │',
        '├─────────────────────────────────────────────┤',
        '│ Typical Approach:                          │',
        '│  • Social Media Manager:  RM 5-6K         │',
        '│  • Technical Developer:   RM 4-5K         │',
        '│  • Creative Designer:     RM 3-4K         │',
        '│  • TOTAL:                 RM 12-15K       │',
        '│                                            │',
        '│ Harshana Approach:                         │',
        '│  • All Three Roles:       RM 10-12K       │',
        '│  • Your Monthly Savings:  RM 2-5K         │',
        '│  • Management Overhead:   RM 0            │',
        '└─────────────────────────────────────────────┘',
        '',
        '════════════════════════════════════════════',
        '',
        '> Profile loaded successfully',
        '> Initiating Security Handshake...',
        ''
    ];

    // --- LOGIC: LOGGING PHASE ---
    useEffect(() => {
        if (internalPhase !== 'LOG') return;

        // Loading Bar Logic
        if (consoleLines[currentLineIndex] === 'LOADING_BAR') {
            setIsLoadingBar(true);
            setTimeout(() => {
                setLines(prev => [...prev, '> [░░░░░░░░░░░░░░░░░░░░░░░░] 0%']);
                let progress = 0;
                const fillInterval = setInterval(() => {
                    progress += 4;
                    if (progress <= 100) {
                        const filled = Math.floor((progress / 100) * 24);
                        const empty = 24 - filled;
                        const bar = '█'.repeat(filled) + '░'.repeat(empty);
                        setLines(prev => {
                            const newLines = [...prev];
                            newLines[newLines.length - 1] = `> [${bar}] ${progress}%`;
                            return newLines;
                        });
                    } else {
                        clearInterval(fillInterval);
                        setIsLoadingBar(false);
                        setCurrentLineIndex(prev => prev + 1);
                    }
                }, 30); // Faster loading bar
                return () => clearInterval(fillInterval);
            }, 300);
            return;
        }

        // Completion Check
        if (currentLineIndex >= consoleLines.length) {
            setTimeout(() => setInternalPhase('SECURITY'), 800);
            return;
        }

        // Typing Logic
        const currentLine = consoleLines[currentLineIndex];
        let charIndex = 0;
        const isFastLine = currentLine.includes('─') || currentLine.includes('│');
        const typeSpeed = isFastLine ? 1 : 10; // Fast typing

        const typeInterval = setInterval(() => {
            if (charIndex < currentLine.length) {
                setCurrentText(currentLine.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setLines(prev => [...prev, currentLine]);
                setCurrentText('');
                setCurrentLineIndex(prev => prev + 1);
            }
        }, typeSpeed);

        return () => clearInterval(typeInterval);
    }, [currentLineIndex, internalPhase, isLoadingBar]);


    // --- LOGIC: SECURITY PHASE ---
    useEffect(() => {
        if (internalPhase !== 'SECURITY') return;

        let mounted = true;

        // 1. Set text IMMEDIATELY (No waiting for animation start)
        setDecodedPass(targetKey);
        setSecurityStatus('DECRYPTING');

        const runSecurity = () => {
            if (!mounted) return;

            let iterations = 0;
            const maxIterations = 25;

            const interval = setInterval(() => {
                if (!mounted) return clearInterval(interval);
                iterations++;
                const prog = Math.floor((iterations / maxIterations) * 100);
                setSecurityProgress(prog);

                // Only animate the progress bar, text is already set
                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    setSecurityStatus('ACCESSED');
                    // Stays for 3 seconds for people to remember
                    setTimeout(() => mounted && onComplete(), 3000);
                }
            }, 60);
        };

        // Run animation immediately (removed the 500ms delay)
        runSecurity();

        return () => { mounted = false; };
    }, [internalPhase, onComplete, targetKey]); // targetKey is now stable state


    const getLineStyle = (line) => {
        if (line.includes('HARSHANA') || line.includes('WARNING') || line.includes('SECURITY')) return 'text-[#00ff41] font-bold';
        if (line.includes('ERROR') || line.includes('[!]')) return 'text-red-500 font-bold';
        return 'text-[#00ff41]/90';
    };

    return (
        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 min-h-[100dvh]">
            <div className="relative w-full max-w-3xl">
                {/* CRT Scanlines */}
                <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,255,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                {/* Unified Terminal Container */}
                <div className="relative bg-black/95 border-2 border-green-700/50 rounded-lg p-6 shadow-[0_0_30px_rgba(0,255,65,0.15)] flex flex-col justify-center min-h-[500px]">

                    {/* VIEW 1: LOGGING (Scrolling Text) */}
                    {internalPhase === 'LOG' && (
                        <div
                            ref={scrollRef}
                            className="overflow-y-auto h-[60vh] md:h-[500px] scrollbar-hide font-mono text-sm md:text-base leading-relaxed"
                            style={{ fontFamily: '"VT323", "Courier New", monospace' }}
                        >
                            <div className="space-y-1 pb-4">
                                {lines.map((line, index) => (
                                    <div key={index} className={getLineStyle(line)}>{line}</div>
                                ))}
                                <div className="text-[#00ff41] flex">
                                    <span>{currentText}</span>
                                    <span className="animate-pulse ml-1">_</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW 2: SECURITY (Centered Password Cracker) */}
                    {internalPhase === 'SECURITY' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-full w-full py-12"
                        >
                            <div className="text-[#00ff41]/60 text-sm tracking-[0.3em] mb-8 border-b border-[#00ff41]/30 pb-4">
                                SECURE HANDSHAKE PROTOCOL
                            </div>

                            <div className="h-20 flex items-center justify-center mb-8">
                                <span className={`text-2xl md:text-3xl font-bold tracking-wider font-mono ${securityStatus === 'ACCESSED' ? 'text-[#00ff41] drop-shadow-[0_0_15px_rgba(0,255,65,1)]' : 'text-[#00ff41]'}`}>
                                    {decodedPass}
                                </span>
                            </div>

                            <div className="w-full max-w-md h-2 bg-[#00ff41]/20 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    className="h-full bg-[#00ff41]"
                                    animate={{ width: `${securityProgress}%` }}
                                />
                            </div>
                            <div className="flex justify-between w-full max-w-md text-xs text-[#00ff41]/60 font-mono">
                                <span>ENCRYPTION: AES-256</span>
                                <span>{securityStatus === 'ACCESSED' ? 'ACCESS GRANTED' : 'VERIFYING KEY...'}</span>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
});

// ==========================================
// PHASE 3: FINAL LOADING (The Entry)
// ==========================================
const LoadingSequence = ({ onComplete }) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let mounted = true;
        const interval = setInterval(() => {
            if (!mounted) return;
            setPercent(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 30);
        return () => { mounted = false; clearInterval(interval); };
    }, [onComplete]);

    const filled = Math.floor((percent / 100) * 40);
    const bar = '█'.repeat(filled) + '░'.repeat(40 - filled);

    return (
        <div className="flex flex-col items-center justify-center h-screen font-mono text-[#00ff41]">
            <div className="text-4xl font-bold mb-4 animate-pulse">ACCESS GRANTED</div>
            <div className="text-xl mb-8">Welcome, User.</div>
            <div className="text-sm opacity-80 mb-2">
                {`> [${bar}] ${percent}%`}
            </div>
            <div className="text-xs opacity-50">INITIALIZING INTERACTIVE PORTFOLIO ENGINE...</div>
        </div>
    );
};

// ==========================================
// MAIN PARENT
// ==========================================
const RainingLetters = ({ onComplete }) => {
    const [phase, setPhase] = useState(0); // 0:Intro(Log+Security), 2:Load
    const [particles, setParticles] = useState([]);

    // Memoize the handler to prevent re-renders of children
    const handlePhase1Complete = useCallback(() => {
        setPhase(2);
    }, []);

    // Passive BG Rain
    useEffect(() => {
        // Simple distinct chars
        const cols = Math.floor(window.innerWidth / 20);
        setParticles(Array.from({ length: cols }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            speed: 0.2 + Math.random() * 0.5,
            char: Math.random() > 0.5 ? '1' : '0'
        })));

        const interval = setInterval(() => {
            setParticles(prev => prev.map(p => ({
                ...p,
                y: p.y > 100 ? -20 : p.y + p.speed,
                char: Math.random() > 0.95 ? (p.char === '1' ? '0' : '1') : p.char
            })));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-black z-[9999] overflow-hidden">
            {/* Background Rain */}
            {particles.map((p, i) => (
                <div key={i} className="absolute text-[#003B00] text-xs pointer-events-none select-none" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                    {p.char}
                </div>
            ))}

            <AnimatePresence mode="wait">
                {phase === 0 && (
                    <motion.div key="phase1" exit={{ opacity: 0 }} className="relative z-10 w-full h-full">
                        {/* TypewriterConsole Now Handles Log + Security internally */}
                        <TypewriterConsole onComplete={handlePhase1Complete} />
                    </motion.div>
                )}

                {/* Phase 1 (SecurityTerminal) is now removed/merged into Phase 0 */}

                {phase === 2 && (
                    <motion.div key="phase3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full h-full">
                        <LoadingSequence onComplete={onComplete} />
                    </motion.div>
                )}
            </AnimatePresence>

            <button onClick={onComplete} className="absolute top-6 right-6 text-[#00ff41]/40 hover:text-[#00ff41] text-xs uppercase border border-[#00ff41]/20 px-3 py-1 rounded transition-colors z-50 bg-black/50">
                Skip Intro
            </button>
        </div>
    );
};

export default RainingLetters;
