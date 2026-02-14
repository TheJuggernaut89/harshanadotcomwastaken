import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Terminal, Lock, Unlock } from 'lucide-react';
import { useTruthMode } from '../../context/TruthModeContext';

const SimpleTerminal = ({ onClose }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', text: '🚀 PORTFOLIO TERMINAL v2.0' },
        { type: 'system', text: 'Welcome to Harshana\'s Interactive Terminal' },
        { type: 'system', text: '' },
        { type: 'system', text: 'Type "help" for available commands.' },
    ]);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);
    const { isTruthMode, activateTruthMode, deactivateTruthMode, toggleTruthMode } = useTruthMode();

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 100);
    }, []);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'user', text: `> ${input}` }];

            if (cmd === 'help') {
                newHistory.push({ type: 'system', text: '' });
                newHistory.push({ type: 'system', text: 'Available Commands:' });
                newHistory.push({ type: 'system', text: '  help      - Show this help message' });
                newHistory.push({ type: 'system', text: '  about     - About Harshana' });
                newHistory.push({ type: 'system', text: '  skills    - List technical skills' });
                newHistory.push({ type: 'system', text: '  status    - Check current mode' });
                newHistory.push({ type: 'system', text: '  toggle    - Toggle truth/professional mode' });
                newHistory.push({ type: 'system', text: '  clear     - Clear terminal' });
                newHistory.push({ type: 'system', text: '  exit      - Close terminal' });
                newHistory.push({ type: 'system', text: '' });
                newHistory.push({ type: 'info', text: '💡 Hint: Try entering the password...' });
                newHistory.push({ type: 'system', text: '' });
            } else if (cmd === 'about') {
                newHistory.push({ type: 'success', text: '' });
                newHistory.push({ type: 'success', text: '👋 Harshana Jothi' });
                newHistory.push({ type: 'system', text: 'Marketing Technologist | Revenue Systems Builder' });
                newHistory.push({ type: 'system', text: '' });
                newHistory.push({ type: 'system', text: 'Combining technical skills (n8n, APIs, coding) with marketing' });
                newHistory.push({ type: 'system', text: 'expertise to build revenue-focused systems.' });
                newHistory.push({ type: 'system', text: '' });
            } else if (cmd === 'skills') {
                newHistory.push({ type: 'success', text: '' });
                newHistory.push({ type: 'success', text: '⚡ Technical Skills:' });
                newHistory.push({ type: 'system', text: '  • n8n Automation & API Integration' });
                newHistory.push({ type: 'system', text: '  • React, JavaScript, HTML/CSS' });
                newHistory.push({ type: 'system', text: '  • Google Analytics 4 & Marketing Automation' });
                newHistory.push({ type: 'system', text: '  • Adobe Creative Suite (Certified)' });
                newHistory.push({ type: 'system', text: '  • Social Media Growth Engineering' });
                newHistory.push({ type: 'system', text: '' });
            } else if (cmd === 'status') {
                newHistory.push({ type: 'system', text: '' });
                if (isTruthMode) {
                    newHistory.push({ type: 'success', text: '🔓 TRUTH MODE: ACTIVE' });
                    newHistory.push({ type: 'system', text: 'Showing honest, unfiltered content.' });
                } else {
                    newHistory.push({ type: 'info', text: '🔒 PROFESSIONAL MODE: ACTIVE' });
                    newHistory.push({ type: 'system', text: 'Showing employer-friendly content.' });
                }
                newHistory.push({ type: 'system', text: '' });
            } else if (cmd === 'toggle') {
                toggleTruthMode();
                newHistory.push({ type: 'system', text: '' });
                if (!isTruthMode) { // Will be true after toggle
                    newHistory.push({ type: 'success', text: '🔓 Switched to TRUTH MODE' });
                    newHistory.push({ type: 'system', text: 'Now showing honest content throughout the site.' });
                } else { // Will be false after toggle
                    newHistory.push({ type: 'info', text: '🔒 Switched to PROFESSIONAL MODE' });
                    newHistory.push({ type: 'system', text: 'Now showing employer-friendly content.' });
                }
                newHistory.push({ type: 'system', text: '' });
            } else if (['react', 'makkauhijau', 'bojio', 'abuden', 'potongstim', 'syoksendiri', 'kautim', 'mantap'].includes(cmd)) {
                // PASSWORD ACTIVATED!
                activateTruthMode();
                newHistory.push({ type: 'success', text: '' });
                newHistory.push({ type: 'success', text: '✅ PASSWORD ACCEPTED!' });
                newHistory.push({ type: 'success', text: '🔓 TRUTH MODE ACTIVATED' });
                newHistory.push({ type: 'system', text: '' });
                newHistory.push({ type: 'system', text: 'All content has switched to truth mode.' });
                newHistory.push({ type: 'system', text: 'Use "toggle" to switch back to professional mode.' });
                newHistory.push({ type: 'system', text: '' });
            } else if (cmd === 'professional') {
                // Quick command to go back to professional mode
                deactivateTruthMode();
                newHistory.push({ type: 'info', text: '' });
                newHistory.push({ type: 'info', text: '🔒 Switched to PROFESSIONAL MODE' });
                newHistory.push({ type: 'system', text: 'Now showing employer-friendly content.' });
                newHistory.push({ type: 'system', text: '' });
            } else if (cmd === 'exit') {
                newHistory.push({ type: 'system', text: '👋 Goodbye! Closing terminal...' });
                setHistory(newHistory);
                setTimeout(onClose, 1000);
                setInput('');
                return;
            } else if (cmd === 'clear') {
                setHistory([
                    { type: 'system', text: '🚀 PORTFOLIO TERMINAL v2.0' },
                    { type: 'system', text: 'Terminal cleared. Type "help" for commands.' },
                ]);
                setInput('');
                return;
            } else if (cmd === '') {
                // Do nothing for empty input
                setHistory(newHistory.slice(0, -1));
                setInput('');
                return;
            } else {
                newHistory.push({ type: 'error', text: `Command not found: "${cmd}"` });
                newHistory.push({ type: 'system', text: 'Type "help" for available commands.' });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full h-full md:max-w-2xl md:h-[500px] bg-black md:border border-green-500/50 md:rounded-lg shadow-[0_0_40px_rgba(0,255,0,0.2)] flex flex-col relative overflow-hidden"
                onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.focus();
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 hover:bg-green-500/20 rounded text-green-500/50 hover:text-green-500 transition-colors z-50"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* CRT Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20" />

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/30 bg-green-900/10">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                        <div className="flex items-center gap-2 ml-2 text-green-500/70">
                            <Terminal size={14} />
                            <span className="text-[10px] tracking-[0.2em] font-bold">PORTFOLIO_TERMINAL</span>
                        </div>
                    </div>

                    {/* Mode Indicator */}
                    <div className="flex items-center gap-2">
                        {isTruthMode ? (
                            <>
                                <Unlock size={14} className="text-green-400" />
                                <span className="text-[10px] tracking-wider font-bold text-green-400">TRUTH MODE</span>
                            </>
                        ) : (
                            <>
                                <Lock size={14} className="text-blue-400" />
                                <span className="text-[10px] tracking-wider font-bold text-blue-400">PROFESSIONAL</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar font-mono text-sm md:text-base">
                    {history.map((line, i) => (
                        <div key={i} className={`${line.type === 'error' ? 'text-red-500' :
                            line.type === 'success' ? 'text-green-400 font-bold' :
                                line.type === 'info' ? 'text-blue-400 font-bold' :
                                    line.type === 'user' ? 'text-white' :
                                        'text-green-500/80'
                            }`}>
                            {line.text}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-green-900/10 border-t border-green-500/30 flex items-center gap-3 relative z-20">
                    <span className="text-green-500 font-bold animate-pulse">{`>`}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        className="flex-1 bg-transparent border-none outline-none text-white font-mono text-base placeholder-green-500/30 caret-green-500"
                        placeholder="Type 'help' for commands..."
                        autoFocus
                        spellCheck="false"
                        autoComplete="off"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SimpleTerminal;
