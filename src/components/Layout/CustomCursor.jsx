import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useMode } from '../../context/ThemeContext';

const CustomCursor = () => {
    const { mode } = useMode();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [cursorState, setCursorState] = useState('default');
    const [isVisible, setIsVisible] = useState(true);

    // For smooth following in non-upside modes
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        // Check if touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            setIsVisible(false);
            return;
        }

        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            setMousePos({ x, y });

            // In dark mode, update position INSTANTLY (no delay)
            if (mode === 'dark') {
                cursorX.set(x);
                cursorY.set(y);
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target;

            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('clickable')
            ) {
                setCursorState('hover');
            }
            else if (
                target.tagName === 'P' ||
                target.tagName === 'SPAN' ||
                target.tagName === 'H1' ||
                target.tagName === 'H2' ||
                target.tagName === 'H3' ||
                target.tagName === 'H4' ||
                target.tagName === 'H5' ||
                target.tagName === 'H6'
            ) {
                setCursorState('text');
            } else {
                setCursorState('default');
            }
        };

        const handleMouseDown = () => setCursorState('click');
        const handleMouseUp = () => setCursorState('default');
        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [mode, cursorX, cursorY]);

    // Smooth following for non-upside modes
    useEffect(() => {
        if (mode !== 'upside') {
            const animate = () => {
                const currentX = cursorX.get();
                const currentY = cursorY.get();

                const newX = currentX + (mousePos.x - currentX) * 0.15;
                const newY = currentY + (mousePos.y - currentY) * 0.15;

                cursorX.set(newX);
                cursorY.set(newY);

                requestAnimationFrame(animate);
            };

            const animationId = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationId);
        }
    }, [mode, mousePos, cursorX, cursorY]);

    if (!isVisible) return null;

    // Mode-specific styling
    const modeStyles = {
        light: {
            outer: 'rgba(245, 222, 179, 0.6)',
            inner: '#F5DEB3',
            border: '#36454F',
            glow: '0 0 15px rgba(245, 222, 179, 0.4)'
        },
        dark: {
            outer: 'rgba(255, 7, 0, 0.6)',
            inner: '#FF0700',
            border: '#353839',
            glow: '0 0 15px rgba(255, 7, 0, 0.4)'
        },
        upside: {
            outer: 'rgba(254, 84, 25, 0.3)',
            inner: '#FE5419',
            border: '#FE5419',
            glow: '0 0 15px rgba(254, 84, 25, 0.6), inset 0 0 10px rgba(254, 84, 25, 0.3)'
        }
    };

    const currentStyle = modeStyles[mode];

    // Dark mode uses different cursor
    if (mode === 'dark') {
        return (
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[2147483647] hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 40,
                    height: 40,
                    border: `2px solid ${currentStyle.border}`,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${currentStyle.outer} 0%, rgba(188, 52, 14, 0.1) 50%, transparent 70%)`,
                    boxShadow: currentStyle.glow
                }}
                animate={{
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />
        );
    }

    // Normal cursor for light/dark modes
    return (
        <>
            {/* Outer Circle */}
            <motion.div
                className="fixed top-0 left-0 rounded-full z-[9998] pointer-events-none hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 32,
                    height: 32,
                    backgroundColor: currentStyle.outer,
                    border: `2px solid ${currentStyle.border}`,
                    boxShadow: currentStyle.glow,
                    mixBlendMode: 'difference'
                }}
                animate={{
                    scale: cursorState === 'hover' ? 1.5 : cursorState === 'click' ? 0.8 : 1,
                    rotate: cursorState === 'text' ? [0, 5, -5, 0] : 0,
                    opacity: cursorState === 'text' ? 0.4 : 1
                }}
                transition={{
                    scale: { duration: 0.2 },
                    rotate: { duration: 0.8, repeat: cursorState === 'text' ? Infinity : 0 },
                    opacity: { duration: 0.3 }
                }}
            />

            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    width: 8,
                    height: 8,
                    backgroundColor: currentStyle.inner
                }}
                animate={{
                    scale: cursorState === 'click' ? 0.5 : 1
                }}
                transition={{ duration: 0.1 }}
            />

            {/* Ripple on click */}
            {cursorState === 'click' && (
                <motion.div
                    className="fixed top-0 left-0 rounded-full z-[9997] pointer-events-none hidden md:block"
                    style={{
                        x: cursorX,
                        y: cursorY,
                        translateX: '-50%',
                        translateY: '-50%',
                        width: 32,
                        height: 32,
                        border: `2px solid ${currentStyle.inner}`,
                        backgroundColor: 'transparent'
                    }}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                />
            )}

            {/* Pulsing ring on hover */}
            {cursorState === 'hover' && (
                <motion.div
                    className="fixed top-0 left-0 rounded-full z-[9997] pointer-events-none hidden md:block"
                    style={{
                        x: cursorX,
                        y: cursorY,
                        translateX: '-50%',
                        translateY: '-50%',
                        width: 20,
                        height: 20,
                        border: `1px solid ${currentStyle.inner}`,
                        backgroundColor: 'transparent'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            )}
        </>
    );
};

export default CustomCursor;
