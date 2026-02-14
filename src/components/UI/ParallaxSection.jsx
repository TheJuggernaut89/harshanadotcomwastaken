import React from 'react';
import { motion } from 'framer-motion';
import { useParallax, useParallaxFade, useParallaxScale } from '../../hooks/useParallax';

/**
 * Reusable parallax section wrapper
 * @param {string} effect - Type of parallax effect: 'translate', 'fade', 'scale'
 * @param {number} offset - Parallax intensity
 * @param {ReactNode} children - Child elements
 * @param {string} className - Additional CSS classes
 */
export function ParallaxSection({
    effect = 'translate',
    offset = 50,
    children,
    className = '',
    ...props
}) {
    let parallaxProps;

    switch (effect) {
        case 'fade':
            parallaxProps = useParallaxFade(offset);
            return (
                <motion.div
                    ref={parallaxProps.ref}
                    style={{ y: parallaxProps.y, opacity: parallaxProps.opacity }}
                    className={className}
                    {...props}
                >
                    {children}
                </motion.div>
            );

        case 'scale':
            parallaxProps = useParallaxScale([0.9, 1.1]);
            return (
                <motion.div
                    ref={parallaxProps.ref}
                    style={{ scale: parallaxProps.scale }}
                    className={className}
                    {...props}
                >
                    {children}
                </motion.div>
            );

        case 'translate':
        default:
            parallaxProps = useParallax(offset);
            return (
                <motion.div
                    ref={parallaxProps.ref}
                    style={{ y: parallaxProps.y }}
                    className={className}
                    {...props}
                >
                    {children}
                </motion.div>
            );
    }
}
