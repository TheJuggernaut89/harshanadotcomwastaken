import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useMode } from '../../context/ThemeContext';

/**
 * MagneticText Component
 * 
 * A smooth cursor-following text reveal effect with circular mask.
 * Uses black/white for maximum readability.
 * 
 * @param {string} text - The base text to display
 * @param {string} hoverText - The text revealed on hover
 * @param {string} className - Additional CSS classes
 */
export const MagneticText = ({
    text = "CREATIVE",
    hoverText = "EXPLORE",
    className = ""
}) => {
    const { mode } = useMode();
    const isUpsideMode = mode === 'dark';

    const containerRef = useRef(null);
    const circleRef = useRef(null);
    const innerTextRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    const mousePos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef();

    // Update container size on mount and resize
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Smooth cursor tracking animation
    useEffect(() => {
        const lerp = (start, end, factor) => start + (end - start) * factor;

        const animate = () => {
            // Smooth interpolation for buttery movement
            currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.15);
            currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.15);

            if (circleRef.current) {
                circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
            }

            if (innerTextRef.current) {
                // Counter-transform to keep text stationary
                innerTextRef.current.style.transform = `translate(${-currentPos.current.x}px, ${-currentPos.current.y}px)`;
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mousePos.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }, []);

    const handleMouseEnter = useCallback((e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mousePos.current = { x, y };
        currentPos.current = { x, y };
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    // Mode-specific styling with BLACK/WHITE for readability
    const styles = isUpsideMode ? {
        // Upside Down Mode: White text on dark, black reveal
        baseTextColor: '#FFFFFF',
        revealBg: '#FFFFFF',
        revealTextColor: '#000000',
        glow: isHovered ? '0 0 40px rgba(255, 255, 255, 0.4)' : 'none',
    } : {
        // Light Mode: Black text on light, white reveal
        baseTextColor: '#000000',
        revealBg: '#000000',
        revealTextColor: '#FFFFFF',
        glow: 'none',
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative inline-flex items-center justify-center cursor-none select-none ${className}`}
            style={{
                boxShadow: styles.glow,
                padding: 'var(--spacing-2) 0'
            }}
        >
            {/* Base text layer */}
            <span
                style={{
                    fontSize: 'var(--font-5xl)',
                    fontWeight: 'var(--font-bold)',
                    letterSpacing: 'var(--tracking-tight)',
                    color: styles.baseTextColor,
                    lineHeight: 'var(--leading-tight)'
                }}
                className="md:text-7xl lg:text-8xl"
            >
                {text}
            </span>

            {/* Circular reveal mask */}
            <div
                ref={circleRef}
                className="absolute top-0 left-0 pointer-events-none rounded-full overflow-hidden"
                style={{
                    width: isHovered ? 180 : 0,
                    height: isHovered ? 180 : 0,
                    backgroundColor: styles.revealBg,
                    transition: 'width 0.5s cubic-bezier(0.33, 1, 0.68, 1), height 0.5s cubic-bezier(0.33, 1, 0.68, 1)',
                    willChange: 'transform, width, height',
                    boxShadow: isUpsideMode && isHovered ? '0 0 50px rgba(255, 255, 255, 0.6)' : 'none',
                }}
            >
                {/* Revealed text (counter-transformed to stay in place) */}
                <div
                    ref={innerTextRef}
                    className="absolute flex items-center justify-center"
                    style={{
                        width: containerSize.width,
                        height: containerSize.height,
                        top: '50%',
                        left: '50%',
                        willChange: 'transform',
                    }}
                >
                    <span
                        style={{
                            fontSize: 'var(--font-5xl)',
                            fontWeight: 'var(--font-bold)',
                            letterSpacing: 'var(--tracking-tight)',
                            color: styles.revealTextColor,
                            lineHeight: 'var(--leading-tight)',
                            whiteSpace: 'nowrap'
                        }}
                        className="md:text-7xl lg:text-8xl"
                    >
                        {hoverText}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MagneticText;
