import React, { useState, useEffect, useRef } from 'react';
import { useMode } from '../../context/ThemeContext';

const LensReveal = ({ normal, reveal, className = '' }) => {
    const { mode } = useMode();
    const isDarkMode = mode === 'dark';
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
    const [isInSection, setIsInSection] = useState(false);
    const textRef = useRef(null);
    const rafRef = useRef(null);
    const targetPosRef = useRef({ x: 0, y: 0 }); // Target position for interpolation
    const currentPosRef = useRef({ x: 0, y: 0 }); // Current interpolated position

    useEffect(() => {
        if (!isDarkMode) return;

        const element = textRef.current;
        if (!element) return;

        let animationFrameId = null;

        // Smooth interpolation function (lerp)
        const lerp = (start, end, factor) => start + (end - start) * factor;

        // Animation loop for buttery smooth tracking
        const animate = () => {
            // Interpolate towards target position (0.35 = smooth but responsive)
            currentPosRef.current.x = lerp(currentPosRef.current.x, targetPosRef.current.x, 0.35);
            currentPosRef.current.y = lerp(currentPosRef.current.y, targetPosRef.current.y, 0.35);

            setMousePos({
                x: currentPosRef.current.x,
                y: currentPosRef.current.y
            });

            setLensPos({
                x: currentPosRef.current.x + textRef.current.getBoundingClientRect().left - 100,
                y: currentPosRef.current.y + textRef.current.getBoundingClientRect().top - 100
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            if (textRef.current) {
                const rect = textRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Check if mouse is DIRECTLY over this specific text element
                const isDirectlyOver =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;

                setIsInSection(isDirectlyOver);

                // Update target position for interpolation
                targetPosRef.current = { x, y };

                // Initialize current position on first hover
                if (!animationFrameId) {
                    currentPosRef.current = { x, y };
                    animationFrameId = requestAnimationFrame(animate);
                }
            }
        };

        const handleMouseLeave = () => {
            // Immediately hide lens when mouse leaves the element
            setIsInSection(false);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            setIsInSection(false);
        };
    }, [isDarkMode]);

    if (!isDarkMode) {
        return <span className={className}>{normal}</span>;
    }

    return (
        <span ref={textRef} className={`relative inline-block ${className}`}>
            {/* Hidden truth text (always rendered but invisible) */}
            <span className="opacity-0 pointer-events-none">
                {reveal}
            </span>

            {/* Normal text layer */}
            <span
                className="absolute inset-0"
                style={{
                    clipPath: isInSection
                        ? `circle(100px at ${mousePos.x}px ${mousePos.y}px)`
                        : 'none',
                    opacity: isInSection ? 0 : 1,
                    transition: 'opacity 0.15s ease-out',
                    willChange: 'clip-path, opacity'
                }}
            >
                {normal}
            </span>

            {/* Reveal text layer - High contrast white with cyan-purple glow */}
            <span
                className="absolute inset-0 font-bold"
                style={{
                    color: '#FFFFFF',
                    clipPath: isInSection
                        ? `circle(100px at ${mousePos.x}px ${mousePos.y}px)`
                        : 'circle(0px)',
                    willChange: 'clip-path',
                    textShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9), 0 0 40px rgba(139, 92, 246, 0.6)'
                }}
            >
                {reveal}
            </span>

            {/* Lens indicator - Single instance with futuristic gradient styling */}
            {isInSection && (
                <div
                    className="fixed rounded-full pointer-events-none"
                    style={{
                        left: `${lensPos.x}px`,
                        top: `${lensPos.y}px`,
                        width: '200px',
                        height: '200px',
                        border: '3px solid transparent',
                        borderImage: 'linear-gradient(135deg, #06b6d4, #8b5cf6) 1',
                        boxShadow: '0 0 40px rgba(6, 182, 212, 0.6), 0 0 80px rgba(139, 92, 246, 0.4), inset 0 0 40px rgba(6, 182, 212, 0.15)',
                        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
                        zIndex: 9998,
                        willChange: 'transform',
                        transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
                    }}
                />
            )}
        </span>
    );
};

export default LensReveal;
