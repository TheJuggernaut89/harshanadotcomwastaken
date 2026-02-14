import { useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Custom hook for parallax scrolling effects
 * @param {number} offset - Parallax offset multiplier (default: 50)
 * @param {boolean} smooth - Enable spring animation (default: true)
 * @returns {object} - { ref, y } - Attach ref to element, use y for motion.div
 */
export function useParallax(offset = 50, smooth = true) {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

    // Add spring for smoother motion
    const smoothY = useSpring(y, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return {
        ref,
        y: smooth ? smoothY : y
    };
}

/**
 * Hook for fade-in parallax effect
 * @param {number} offset - Parallax offset
 * @returns {object} - { ref, y, opacity }
 */
export function useParallaxFade(offset = 30) {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return { ref, y, opacity };
}

/**
 * Hook for scale parallax effect
 * @param {number} scaleRange - Scale range [min, max]
 * @returns {object} - { ref, scale }
 */
export function useParallaxScale(scaleRange = [0.8, 1.2]) {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]]);

    return { ref, scale };
}
