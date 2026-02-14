import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Observer = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isBlinking, setIsBlinking] = useState(false);
    const [currentSection, setCurrentSection] = useState('hero');
    const observerRef = useRef(null);
    const blinkIntervalRef = useRef(null);

    // Expression configurations for each section
    const expressions = {
        hero: {
            eyeScale: 1.2,
            mouthCurve: 'M 30 55 Q 50 65 70 55',
            particles: 8,
            glowColor: '#E63946',
            sparkles: true
        },
        about: {
            eyeScale: 1,
            mouthCurve: 'M 35 55 Q 50 62 65 55',
            particles: 5,
            glowColor: '#14B8A6',
            sparkles: false
        },
        skills: {
            eyeScale: 1.3,
            mouthCurve: 'M 30 52 Q 50 68 70 52',
            particles: 10,
            glowColor: '#8B5CF6',
            sparkles: true,
            stars: true
        },
        experience: {
            eyeScale: 1.1,
            mouthCurve: 'M 32 55 Q 50 64 68 55',
            particles: 6,
            glowColor: '#F59E0B',
            sparkles: true
        },
        projects: {
            eyeScale: 1.15,
            mouthCurve: 'M 28 53 Q 50 66 72 53',
            particles: 12,
            glowColor: '#EC4899',
            sparkles: false,
            colorful: true
        },
        contact: {
            eyeScale: 1,
            mouthCurve: 'M 33 56 Q 50 63 67 56',
            particles: 7,
            glowColor: '#10B981',
            sparkles: false
        }
    };

    const currentExpression = expressions[currentSection] || expressions.hero;

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (observerRef.current) {
                const rect = observerRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                setMousePos({
                    x: e.clientX - centerX,
                    y: e.clientY - centerY
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Random blink system
    useEffect(() => {
        const scheduleBlink = () => {
            const delay = Math.random() * 4000 + 3000; // 3-7 seconds
            blinkIntervalRef.current = setTimeout(() => {
                setIsBlinking(true);
                setTimeout(() => {
                    setIsBlinking(false);
                    scheduleBlink();
                }, 150);
            }, delay);
        };

        scheduleBlink();
        return () => {
            if (blinkIntervalRef.current) {
                clearTimeout(blinkIntervalRef.current);
            }
        };
    }, []);

    // Section detection
    useEffect(() => {
        const sections = [
            { id: 'hero', element: document.querySelector('section:first-of-type') },
            { id: 'about', element: document.getElementById('about') },
            { id: 'skills', element: document.getElementById('skills') },
            { id: 'experience', element: document.getElementById('experience') },
            { id: 'projects', element: document.getElementById('projects') },
            { id: 'contact', element: document.getElementById('contact') }
        ].filter(s => s.element);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        const section = sections.find(s => s.element === entry.target);
                        if (section) {
                            setCurrentSection(section.id);
                        }
                    }
                });
            },
            { threshold: [0.5] }
        );

        sections.forEach(section => {
            if (section.element) observer.observe(section.element);
        });

        return () => observer.disconnect();
    }, []);

    // Calculate eye rotation
    const angle = Math.atan2(mousePos.y, mousePos.x);
    const distance = Math.min(Math.sqrt(mousePos.x ** 2 + mousePos.y ** 2) / 100, 1);
    const eyeOffsetX = Math.cos(angle) * distance * 8;
    const eyeOffsetY = Math.sin(angle) * distance * 8;

    return (
        <div
            ref={observerRef}
            className="fixed top-5 right-5 z-[9999] hidden lg:block pointer-events-none"
        >
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 1
                }}
            >
                <svg
                    width="140"
                    height="140"
                    viewBox="0 0 100 100"
                    className="drop-shadow-2xl"
                >
                    {/* Glow effect */}
                    <defs>
                        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor={currentExpression.glowColor} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={currentExpression.glowColor} stopOpacity="0" />
                        </radialGradient>

                        <filter id="blur">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                        </filter>
                    </defs>

                    {/* Animated particles */}
                    <AnimatePresence>
                        {[...Array(currentExpression.particles)].map((_, i) => {
                            const angle = (i / currentExpression.particles) * Math.PI * 2;
                            const radius = 45;
                            return (
                                <motion.circle
                                    key={`particle-${i}-${currentSection}`}
                                    cx={50 + Math.cos(angle) * radius}
                                    cy={50 + Math.sin(angle) * radius}
                                    r="2"
                                    fill={currentExpression.colorful
                                        ? `hsl(${(i / currentExpression.particles) * 360}, 70%, 60%)`
                                        : currentExpression.glowColor
                                    }
                                    opacity="0.6"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 0.6, 0],
                                        x: [0, Math.cos(angle) * 10, 0],
                                        y: [0, Math.sin(angle) * 10, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                        ease: "easeInOut"
                                    }}
                                />
                            );
                        })}
                    </AnimatePresence>

                    {/* Glow circle */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="url(#glow)"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Face base */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="url(#faceGradient)"
                        stroke={currentExpression.glowColor}
                        strokeWidth="2"
                        animate={{
                            scale: currentExpression.eyeScale > 1.2 ? [1, 1.05, 1] : 1
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: currentExpression.eyeScale > 1.2 ? Infinity : 0
                        }}
                    />

                    <defs>
                        <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1a1a2e" />
                            <stop offset="100%" stopColor="#16213e" />
                        </linearGradient>
                    </defs>

                    {/* Left Eye */}
                    <g>
                        <motion.ellipse
                            cx={35}
                            cy={40}
                            rx={isBlinking ? 6 : 6}
                            ry={isBlinking ? 1 : 8}
                            fill="#ffffff"
                            animate={{
                                scaleY: isBlinking ? 0.1 : currentExpression.eyeScale
                            }}
                            transition={{ duration: 0.15 }}
                        />
                        {!isBlinking && (
                            <motion.circle
                                cx={35 + eyeOffsetX}
                                cy={40 + eyeOffsetY}
                                r="3"
                                fill={currentExpression.glowColor}
                                animate={{
                                    x: eyeOffsetX,
                                    y: eyeOffsetY
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        )}
                        {currentExpression.stars && !isBlinking && (
                            <motion.text
                                x="35"
                                y="38"
                                fontSize="8"
                                textAnchor="middle"
                                fill="#FFD700"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, 0]
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity
                                }}
                            >
                                ★
                            </motion.text>
                        )}
                    </g>

                    {/* Right Eye */}
                    <g>
                        <motion.ellipse
                            cx={65}
                            cy={40}
                            rx={isBlinking ? 6 : 6}
                            ry={isBlinking ? 1 : 8}
                            fill="#ffffff"
                            animate={{
                                scaleY: isBlinking ? 0.1 : currentExpression.eyeScale
                            }}
                            transition={{ duration: 0.15 }}
                        />
                        {!isBlinking && (
                            <motion.circle
                                cx={65 + eyeOffsetX}
                                cy={40 + eyeOffsetY}
                                r="3"
                                fill={currentExpression.glowColor}
                                animate={{
                                    x: eyeOffsetX,
                                    y: eyeOffsetY
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                        )}
                        {currentExpression.stars && !isBlinking && (
                            <motion.text
                                x="65"
                                y="38"
                                fontSize="8"
                                textAnchor="middle"
                                fill="#FFD700"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, -10, 0]
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity
                                }}
                            >
                                ★
                            </motion.text>
                        )}
                    </g>

                    {/* Mouth */}
                    <motion.path
                        d={currentExpression.mouthCurve}
                        stroke={currentExpression.glowColor}
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />

                    {/* Sparkles */}
                    {currentExpression.sparkles && (
                        <>
                            {[...Array(4)].map((_, i) => (
                                <motion.circle
                                    key={`sparkle-${i}`}
                                    cx={20 + i * 20}
                                    cy={20}
                                    r="1.5"
                                    fill="#ffffff"
                                    animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.3
                                    }}
                                />
                            ))}
                        </>
                    )}
                </svg>
            </motion.div>
        </div>
    );
};

export default Observer;
